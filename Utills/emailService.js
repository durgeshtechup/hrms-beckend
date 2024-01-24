var nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  console.log("process.env.CLIENT_SECRET", process.env.CLIENT_SECRET);

  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });
  //   const accessToken = await new Promise((resolve, reject) => {
  //     oauth2Client.getAccessToken((err, token) => {
  //       if (err) {
  //         reject("Failed to create access token :(", err);
  //       }
  //       resolve(token);
  //     });
  //   });
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      accessToken: process.env.ACCESS_TOKEN,
      // "ya29.a0AfB_byCm3_cLE8o6oVLG9KtTGE265BHa054zrJaCpQAaeA4eODGbBtfsM9wHcBbxsi1IsbYUcvyUVjL1LxJCRFKPNQ9ZdIesdbrhng9Wla-DuDBIsezkg-r9XYd9OZP45BDPFP41DQFhVze2tz8XAu1He1HGXQCYeg7_aCgYKAcoSAQ4SFQHGX2MimBjKR63gGUJY1s0_x5v1Kw0171",
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      // refreshToken: process.env.REFRESH_TOKEN,
    },
  });

  return transporter;
};

const sendEmail = async (emailOptions) => {
  try {
    let emailTransporter = await createTransporter();
    await emailTransporter.sendMail(emailOptions);
  } catch (error) {
    console.log(error);
  }
};

// sendEmail({
//     subject: "New Candidate Added",
//     html: `<div>
//         <p>Hello HR</p>
//         <p>
//           I would like to inform you that a new candidate ${info?.name} (
//           ${info?.email}) is added by ${currentUser.email}, please take follow
//           up and keep updating its status.
//         </p>
//         <br  />
//         <br />

//         <p>Thanks and regards,</p>
//         <p>${currentUser.email} </p>
//       </div>`,
//     to: process.env.FROM_EMAIL,
//     from: process.env.EMAIL,
//   });
module.exports = sendEmail;
