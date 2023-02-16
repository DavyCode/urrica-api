"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-octal */
const mongoose_services_1 = __importDefault(require("../../../common/services/mongoose.services"));
const debug_1 = __importDefault(require("debug"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const utils_1 = __importDefault(require("../../../common/utils/utils"));
const log = (0, debug_1.default)('app:users-dao');
class UsersDao {
    constructor() {
        this.Schema = mongoose_services_1.default.getMongoose().Schema;
        this.userSchema = new this.Schema({
            id: String,
            firstName: String,
            lastName: String,
            profileImage: {
                type: String,
                default: 'https://res.cloudinary.com/davycode/image/upload/v1590239023/avatar.png',
            },
            email: {
                type: String,
                unique: true,
                lowercase: true,
                required: true,
                trim: true,
                match: /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
            },
            resetPasswordPin: { type: String },
            passwordHash: { type: String },
            verifyEmailOtp: { type: String },
            active: { type: Boolean, default: false },
            verified: { type: Boolean, default: false },
            lock: { type: Boolean, default: false },
            role: {
                type: String,
                default: 'user',
                // enum: [...getObjectValues(rolesType)],
            },
            permissionLevel: { type: Number, default: 1 },
            googleToken: { type: String },
            googleSubUserId: { type: String },
            howDidYouHearAboutUs: { type: String },
            referral_code: { type: String },
            referredBy: {
                type: mongoose_services_1.default.getMongoose().Schema.Types.ObjectId,
                ref: 'User',
            },
            referralRecord: {
                type: mongoose_services_1.default.getMongoose().Schema.Types.ObjectId,
                ref: 'Referral',
            },
            meta: {
                createdAt: { type: Date, default: Date.now },
                updatedAt: { type: Date, default: Date.now },
            },
        });
        this.User = mongoose_services_1.default.getMongoose().model('Users', this.userSchema);
        log('Created new instance of UsersDao');
        this.userSchema.plugin(mongoose_unique_validator_1.default, {
            message: '{PATH} already exists!',
        });
        this.userSchema.virtual('password').set(function (val) {
            const salt = bcryptjs_1.default.genSaltSync(10);
            const hash = bcryptjs_1.default.hashSync(val, salt);
            this.passwordHash = hash;
        });
        this.userSchema.methods.comparePassword = function (candidatePassword) {
            return bcryptjs_1.default.compareSync(candidatePassword, this.passwordHash);
        };
        this.userSchema.methods.toJSON = function () {
            const obj = this.toObject();
            delete obj.passwordHash;
            delete obj.googleToken;
            delete obj.__v;
            return obj;
        };
        this.userSchema.index({ '$**': 'text' });
    }
    /***********************
     *
     ****************************/
    /**
     * comparePasswords
     * @param userInstance
     * @param password
     * @returns
     */
    comparePasswords(userInstance, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcryptjs_1.default.compareSync(password, userInstance.passwordHash);
        });
    }
    /**
     * hashPassword
     * @param password
     * @returns hash
     */
    hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = bcryptjs_1.default.genSaltSync(10);
            const hash = bcryptjs_1.default.hashSync(password, salt);
            return hash;
        });
    }
    /**
     * addUser
     * @param userFields
     * @returns <CreateUserDto>
     * @public
     */
    addUser(userFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = utils_1.default.generateUniqueId();
            const refcode = utils_1.default.generateReferralCode();
            const verifyEmailOtp = utils_1.default.RandomInteger().toString().substring(2, 8);
            const newUser = yield this.User.create(Object.assign({ id: userId, referral_code: refcode, verifyEmailOtp }, userFields));
            return newUser;
        });
    }
    /**
     * getAllUsers
     * @returns UserDto[]
     * @public
     */
    getAllUsers(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const paginate = { skip: 0, limit: 10 };
            if (query && query.skip && query.limit) {
                paginate.skip = Number(query.skip);
                paginate.limit = Number(query.limit);
            }
            if (query.search) {
                const regex = new RegExp(utils_1.default.escapeRegex(query === null || query === void 0 ? void 0 : query.search), 'gi');
                const data = yield this.User.find({ $text: { $search: regex } }, { score: { $meta: 'textScore' } })
                    .sort({ 'meta.createdAt': -1, score: { $meta: 'textScore' } })
                    .skip(paginate.skip)
                    .limit(paginate.limit)
                    .sort({ 'meta.createdAt': -1 })
                    .select('-passwordHash')
                    .exec();
                const totalDocumentCount = yield this.User.countDocuments({
                    $text: { $search: regex },
                });
                return Promise.resolve({
                    data: data,
                    totalDocumentCount,
                    skip: paginate.skip,
                    limit: paginate.limit,
                    queryWith: query,
                });
            }
            const filterParams = Object.assign({}, query);
            if (query.date) {
                filterParams['meta.createdAt'] = {
                    $gte: new Date(new Date(query.date).setHours(0o0, 0o0, 0o0)),
                    $lt: new Date(new Date(query.date).setHours(23, 59, 59)),
                };
            }
            if (query.startDate && query.endDate) {
                filterParams['meta.createdAt'] = {
                    $gte: new Date(new Date(query.startDate).setHours(0o0, 0o0, 0o0)),
                    $lt: new Date(new Date(query.endDate).setHours(23, 59, 59)),
                };
            }
            const { skip, limit, date, endDate, startDate, search } = filterParams, rest = __rest(filterParams, ["skip", "limit", "date", "endDate", "startDate", "search"]);
            const data = yield this.User.find(Object.assign({}, rest))
                .limit(paginate.limit)
                .skip(paginate.skip)
                .sort({ 'meta.createdAt': -1 })
                .select('-passwordHash')
                .exec();
            const totalDocumentCount = yield this.User.countDocuments(Object.assign({}, rest));
            return Promise.resolve({
                users: data,
                totalDocumentCount,
                skip: paginate.skip,
                limit: paginate.limit,
                queryWith: query,
            });
        });
    }
    /**
     * putUserById
     * @param userId
     * @param userFields
     * @returns UserDto
     * @public
     */
    putById(userId, userFields, option) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongoose_services_1.default.validMongooseObjectId(userId)) {
                return Promise.resolve(false);
            }
            return (yield this.User.findOneAndUpdate({ _id: userId }, {
                $set: userFields,
                'meta.updatedAt': Date.now(),
            }, option)
                .select('-passwordHash')
                .exec());
        });
    }
    /**
     * put
     * @param query
     * @param update
     * @param option
     * @returns UserDto
     */
    put(query, update, option) {
        return __awaiter(this, void 0, void 0, function* () {
            if (query._id) {
                if (!mongoose_services_1.default.validMongooseObjectId(query._id)) {
                    return Promise.resolve(false);
                }
            }
            return (yield this.User.findOneAndUpdate(query, {
                $set: update,
                'meta.updatedAt': Date.now(),
            }, option)
                .select('-passwordHash')
                .exec());
        });
    }
    /**
     * getUserById
     * @param userId
     * @returns UserDto
     * @public
     */
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongoose_services_1.default.validMongooseObjectId(userId)) {
                return Promise.resolve(false);
            }
            return (yield this.User.findOne({ _id: userId })
                .select('-passwordHash')
                .exec());
        });
    }
    findOne(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.User.findOne(query).exec();
        });
    }
    save(userInstance) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userInstance.save();
        });
    }
    /**
     * counts the number of Users documents in the collection.
     * @returns number
     * @public
     */
    getUserTotalCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.User.estimatedDocumentCount().exec();
        });
    }
}
exports.default = new UsersDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuZGFvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbW9kdWxlcy91c2Vycy9kYW9zL3VzZXJzLmRhby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkJBQTZCO0FBQzdCLG1HQUF5RTtBQUN6RSxrREFBMEI7QUFDMUIsd0RBQThCO0FBQzlCLDBGQUF3RDtBQVN4RCx3RUFBZ0Q7QUFHaEQsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLGVBQWUsQ0FBQyxDQUFDO0FBRXBELE1BQU0sUUFBUTtJQW9EWjtRQW5EQSxXQUFNLEdBQUcsMkJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFFOUMsZUFBVSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUMzQixFQUFFLEVBQUUsTUFBTTtZQUNWLFNBQVMsRUFBRSxNQUFNO1lBQ2pCLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFlBQVksRUFBRTtnQkFDWixJQUFJLEVBQUUsTUFBTTtnQkFDWixPQUFPLEVBQ0wseUVBQXlFO2FBQzVFO1lBQ0QsS0FBSyxFQUFFO2dCQUNMLElBQUksRUFBRSxNQUFNO2dCQUNaLE1BQU0sRUFBRSxJQUFJO2dCQUNaLFNBQVMsRUFBRSxJQUFJO2dCQUNmLFFBQVEsRUFBRSxJQUFJO2dCQUNkLElBQUksRUFBRSxJQUFJO2dCQUNWLEtBQUssRUFBRSxpREFBaUQ7YUFDekQ7WUFDRCxnQkFBZ0IsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7WUFDbEMsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtZQUM5QixjQUFjLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO1lBQ2hDLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRTtZQUN6QyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxF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