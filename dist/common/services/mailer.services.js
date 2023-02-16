"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const email_templates_1 = __importDefault(require("email-templates"));
const path_1 = __importDefault(require("path"));
const debug_1 = __importDefault(require("debug"));
const BluebirdPromise = __importStar(require("bluebird"));
const preview_email_1 = __importDefault(require("preview-email"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const env_1 = require("../../config/env");
aws_sdk_1.default.config.update({
    accessKeyId: env_1.ACCESS_AWS_KEY_ID,
    secretAccessKey: env_1.SECRET_AWS_ACCESS_KEY,
    region: env_1.BUCKET_AWS_REGION,
});
const ses = new aws_sdk_1.default.SES({ apiVersion: '2010-12-01' });
const log = (0, debug_1.default)('app:event-background-process');
class MailerService {
    sendMailAws(mailObject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, templateName } = mailObject;
                return new BluebirdPromise.Promise((resolve, reject) => {
                    this.loadTemplate(templateName, mailObject).then((result) => {
                        const { subject, html, text } = result;
                        const params = {
                            Destination: {
                                ToAddresses: [email],
                                BccAddresses: [env_1.LOGS_MAIL],
                                // CcAddresses: [
                                //   LOGS_MAIL,
                                //   /* more items */
                                // ],
                            },
                            ConfigurationSetName: env_1.SES_AWS_CONFIG_SET,
                            Message: {
                                Body: {
                                    Html: {
                                        // HTML Format of the email
                                        Charset: 'UTF-8',
                                        Data: html,
                                    },
                                    Text: {
                                        Charset: 'UTF-8',
                                        Data: text,
                                    },
                                },
                                Subject: {
                                    Charset: 'UTF-8',
                                    Data: subject,
                                },
                            },
                            Source: env_1.MAILER_FROM_OPTION,
                            ReplyToAddresses: [
                            /* more items */
                            ],
                        };
                        try {
                            const sendEmail = ses.sendEmail(params).promise();
                            sendEmail
                                .then((data) => {
                                log('email submitted to SES');
                                return resolve(data);
                            })
                                .catch((error) => {
                                log('message did not deliver', error);
                                return reject(error);
                            });
                        }
                        catch (error) {
                            log('could not deliver message', error);
                            return reject(error);
                        }
                    });
                });
            }
            catch (err) {
                log(err);
            }
        });
    }
    loadTemplate(templateName, context) {
        try {
            const dir = path_1.default.join(__dirname, '../../../email-templates', // this folder is outside dist so add extra ../ path
            templateName);
            const email = new email_templates_1.default({
                message: context,
                views: {
                    options: {
                        extension: 'ejs', // <------ HERE template engine
                    },
                },
            });
            return new BluebirdPromise.Promise((resolve, reject) => {
                email
                    .renderAll(dir, Object.assign({}, context))
                    .then((template) => {
                    (0, preview_email_1.default)(template).then(log).catch(log); //preview email in browser, comment in production
                    resolve(template);
                })
                    .catch((err) => {
                    log(err.message);
                    reject(err);
                });
            });
        }
        catch (err) {
            log('ERROR_loadTemplate', err.message);
        }
    }
}
exports.default = new MailerService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbGVyLnNlcnZpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL21haWxlci5zZXJ2aWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0VBQW9DO0FBQ3BDLGdEQUF3QjtBQUN4QixrREFBMEI7QUFDMUIsMERBQTRDO0FBQzVDLGtFQUF5QztBQUN6QyxzREFBMEI7QUFFMUIsMENBTzBCO0FBRTFCLGlCQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNoQixXQUFXLEVBQUUsdUJBQWlCO0lBQzlCLGVBQWUsRUFBRSwyQkFBcUI7SUFDdEMsTUFBTSxFQUFFLHVCQUFpQjtDQUMxQixDQUFDLENBQUM7QUFFSCxNQUFNLEdBQUcsR0FBRyxJQUFJLGlCQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7QUFFdEQsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLDhCQUE4QixDQUFDLENBQUM7QUFFbkUsTUFBTSxhQUFhO0lBQ1gsV0FBVyxDQUFDLFVBQWU7O1lBQy9CLElBQUk7Z0JBQ0YsTUFBTSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsR0FBRyxVQUFVLENBQUM7Z0JBRTNDLE9BQU8sSUFBSSxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO29CQUNyRCxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFXLEVBQUUsRUFBRTt3QkFDL0QsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDO3dCQUV2QyxNQUFNLE1BQU0sR0FBUTs0QkFDbEIsV0FBVyxFQUFFO2dDQUNYLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FB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