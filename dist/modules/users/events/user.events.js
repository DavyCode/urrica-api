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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("../../../common/events/events"));
const mailer_services_1 = __importDefault(require("../../../common/services/mailer.services"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:event-background-process');
events_1.default.on('user_signup_otp', ({ email, otp, firstName }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (email) {
            yield mailer_services_1.default.sendMailAws({
                email,
                otp,
                firstName,
                templateName: 'user-signup-otp',
                link: 'https://app.urrica.com',
            });
        }
    }
    catch (err) {
        log('error', err);
    }
}));
events_1.default.on('welcome_to_urrica', ({ email, otp, firstName }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (email) {
            yield mailer_services_1.default.sendMailAws({
                email,
                otp,
                firstName,
                templateName: 'welcome-to-urrica',
                link: 'https://app.urrica.com',
            });
        }
    }
    catch (err) {
        log('error', err);
    }
}));
events_1.default.on('user_signup_otp_confirmed', ({ email, firstName }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (email) {
            yield mailer_services_1.default.sendMailAws({
                email: email,
                templateName: 'signup-otp-confirmed',
                firstName: firstName,
                link: 'https://app.urrica.com',
            });
        }
    }
    catch (err) {
        log('error', err);
    }
}));
events_1.default.on('reset_password_otp', ({ email, otp, firstName }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (email) {
            yield mailer_services_1.default.sendMailAws({
                email,
                otp,
                firstName,
                templateName: 'reset-password-otp',
            });
        }
    }
    catch (err) {
        console.log('reset_password_otp==============', err);
        log('error', err);
    }
}));
events_1.default.on('password_reset_success', ({ email, otp, firstName }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (email) {
            yield mailer_services_1.default.sendMailAws({
                email,
                firstName,
                templateName: 'password-reset-success',
            });
        }
    }
    catch (err) {
        log('error', err);
    }
}));
exports.default = events_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5ldmVudHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9tb2R1bGVzL3VzZXJzL2V2ZW50cy91c2VyLmV2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLDJFQUFtRDtBQUNuRCwrRkFBc0U7QUFDdEUsa0RBQTBCO0FBRTFCLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBRW5FLGdCQUFNLENBQUMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLENBQU8sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDL0QsSUFBSTtRQUNGLElBQUksS0FBSyxFQUFFO1lBQ1QsTUFBTSx5QkFBYyxDQUFDLFdBQVcsQ0FBQztnQkFDL0IsS0FBSztnQkFDTCxHQUFHO2dCQUNILFNBQVM7Z0JBQ1QsWUFBWSxFQUFFLGlCQUFpQjtnQkFDL0IsSUFBSSxFQUFFLHdCQUF3QjthQUMvQixDQUFDLENBQUM7U0FDSjtLQUNGO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ25CO0FBQ0gsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUVILGdCQUFNLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQU8sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDakUsSUFBSTtRQUNGLElBQUksS0FBSyxFQUFFO1lBQ1QsTUFBTSx5QkFBYyxDQUFDLFdBQVcsQ0FBQztnQkFDL0IsS0FBSztnQkFDTCxHQUFHO2dCQUNILFNBQVM7Z0JBQ1QsWUFBWSxFQUFFLG1CQUFtQjtnQkFDakMsSUFBSSxFQUFFLHdCQUF3QjthQUMvQixDQUFDLENBQUM7U0FDSjtLQUNGO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ25CO0FBQ0gsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUVILGdCQUFNLENBQUMsRUFBRSxDQUFDLDJCQUEyQixFQUFFLENBQU8sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUNwRSxJQUFJO1FBQ0YsSUFBSSxLQUFLLEVBQUU7WUFDVCxNQUFNLHlCQUFjLENBQUMsV0FBVyxDQUFDO2dCQUMvQixLQUFLLEVBQUUsS0FBSztnQkFDWixZQUFZLEVBQUUsc0JBQXNCO2dCQUNwQyxTQUFTLEVBQUUsU0FBUztnQkFDcEIsSUFBSSxFQUFFLHdCQUF3QjthQUMvQixDQUFDLENBQUM7U0FDSjtLQUNGO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ25CO0FBQ0gsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUVILGdCQUFNLENBQUMsRUFBRSxDQUFDLG9CQUFvQixFQUFFLENBQU8sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDbEUsSUFBSTtRQUNGLElBQUksS0FBSyxFQUFFO1lBQ1QsTUFBTSx5QkFBYyxDQUFDLFdBQVcsQ0FBQztnQkFDL0IsS0FBSztnQkFDTCxHQUFHO2dCQUNILFNBQVM7Z0JBQ1QsWUFBWSxFQUFFLG9CQUFvQjthQUNuQyxDQUFDLENBQUM7U0FDSjtLQUNGO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3JELEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDbkI7QUFDSCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ0gsZ0JBQU0sQ0FBQyxFQUFFLENBQUMsd0JBQXdCLEVBQUUsQ0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUN0RSxJQUFJO1FBQ0YsSUFBSSxLQUFLLEVBQUU7WUFDVCxNQUFNLHlCQUFjLENBQUMsV0FBVyxDQUFDO2dCQUMvQixLQUFLO2dCQUNMLFNBQVM7Z0JBQ1QsWUFBWSxFQUFFLHdCQUF3QjthQUN2QyxDQUFDLENBQUM7U0FDSjtLQUNGO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ25CO0FBQ0gsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUVILGtCQUFlLGdCQUFNLENBQUMifQ==