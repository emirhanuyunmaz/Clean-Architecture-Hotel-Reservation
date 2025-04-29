type SendEmailType = {
  email: string;
  message: string;
};

export interface ISendEmail {
  // sendEmail(userId:string,message:string):Promise<SendEmailType>
  sendEmailResetPassword(email: string, message: string): Promise<boolean>;
  sendEmailCheck(email: string): Promise<boolean>;
  htmlDesign(key: string): String;
  createCode(): String;
}
