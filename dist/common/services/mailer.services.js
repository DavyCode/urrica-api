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
console.log('ses==============', ses);
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
                            console.log('sendEmail==============', sendEmail);
                            sendEmail
                                .then((data) => {
                                console.log('sendEmail then==============', data);
                                log('email submitted to SES');
                                return resolve(data);
                            })
                                .catch((error) => {
                                console.log('sendEmail catch ==============', error);
                                log('message did not deliver', error);
                                return reject(error);
                            });
                        }
                        catch (error) {
                            console.log('ses sendEmail catch==============', error);
                            log('could not deliver message', error);
                            return reject(error);
                        }
                    });
                });
            }
            catch (err) {
                console.log('could not deliver message =============', err);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbGVyLnNlcnZpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL21haWxlci5zZXJ2aWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0VBQW9DO0FBQ3BDLGdEQUF3QjtBQUN4QixrREFBMEI7QUFDMUIsMERBQTRDO0FBQzVDLGtFQUF5QztBQUN6QyxzREFBMEI7QUFFMUIsMENBTzBCO0FBRTFCLGlCQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNoQixXQUFXLEVBQUUsdUJBQWlCO0lBQzlCLGVBQWUsRUFBRSwyQkFBcUI7SUFDdEMsTUFBTSxFQUFFLHVCQUFpQjtDQUMxQixDQUFDLENBQUM7QUFFSCxNQUFNLEdBQUcsR0FBRyxJQUFJLGlCQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7QUFDdEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUV0QyxNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsOEJBQThCLENBQUMsQ0FBQztBQUVuRSxNQUFNLGFBQWE7SUFDWCxXQUFXLENBQUMsVUFBZTs7WUFDL0IsSUFBSTtnQkFDRixNQUFNLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxHQUFHLFVBQVUsQ0FBQztnQkFFM0MsT0FBTyxJQUFJLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7b0JBQ3JELElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQVcsRUFBRSxFQUFFO3dCQUMvRCxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUM7d0JBRXZDLE1BQU0sTUFB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