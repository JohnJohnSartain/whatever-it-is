import { Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect } from "react";

const googleAuthenticationPolicy: {
  variant:
    | "button"
    | "caption"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "inherit"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "overline"
    | undefined;
  content: string | string[];
}[] = [
  { variant: "h3", content: "Google Authentication Using OAuth2" },
  { variant: "caption", content: "Last Updated: March 1st, 2023" },
  { variant: "h5", content: "What is This Website About?" },
  {
    variant: "body1",
    content:
      '"Whatever It Is" is a website where you can view articles from a variety of topics such as home or community. You can also interact with others by leaving comments to articles. The intent is to provide education and entertainment.',
  },
  { variant: "h5", content: "Google OAuth2 Limited Use Disclosure" },
  {
    variant: "body1",
    content:
      "This app doesn't request restricted scopes, but if it did, the holtstrom.com App's use of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements.",
  },
  {
    variant: "body1",
    content:
      "Google user data is used by the application to allow users complete the following actions: 1. add comments to posts. 2. reply to comments on posts. 3. Like and dislike posts. 4. Like and dislike comments. 5. create posts. 6. edit posts. 7. Display user's profile photo in the top right correct of the page.",
  },
  {
    variant: "body1",
    content:
      "The collection of Google user data enhances the experience of users to return where they left off, interact with commonuinty through comments or likes/dislikes, and create posts, allows users to continue browsing on other devices since the user is known by the application.",
  },
  { variant: "h5", content: "Copyright" },
  {
    variant: "body1",
    content:
      "If you have a copyright complaint, please tell me and include the Advanciti App page that contains the alleged content, identification of the work claimed to have been infringed including the name and reply email address of the copyright holder/representative, an assertion that the use of the material is not authorized and an assertion that you are the copyright holder/representative.",
  },
  { variant: "h5", content: "Additional Privacy Information" },
  {
    variant: "body1",
    content:
      "This is my private site. Aside from the articles, I am the only person who can enter data here. I don't directly collect any information from you other than your login info from google which is used to administer protected access to some of my content. Cookies are used for login purposes. No information is given to other parties, except this site does include google analytics which records anonymized browsing behaviour. This site uses cookies as described below.",
  },
  {
    variant: "body1",
    content:
      "The only user data received is: name, email and profile picture. These are accessed via OAuth2 login. These are stored in an unencrypted database. These are used only: to be re-displayed to the user, to reply to messages sent by the user, and as identification for granting access to additional content to the user. None of this data is shared with anyone.",
  },
  { variant: "h5", content: "Security" },
  {
    variant: "body1",
    content:
      "We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.",
  },
  { variant: "h5", content: "Contact Us." },
  {
    variant: "body1",
    content:
      "If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us.",
  },
  { variant: "body1", content: "john.john.sartain@gmail.com" },
  { variant: "h5", content: "Terms of Serivce" },
  {
    variant: "body1",
    content:
      'This app is designed to educate and socialize. It\'s provided "as is", without any warranty or condition, express or implied or statutory. This app specifically disclaims any implied warranties of merchantability or fitness for a particular purpose.',
  },
  {
    variant: "body1",
    content:
      "By continuing to use this app, you accept these terms of service in full. If you disagree with these terms, you must not use this app.",
  },
];

function GoogleAuthenticationPolicyPage() {
  useEffect(() => {
    document.title = "Google Authentication";
  }, []);

  return (
    <Container>
      <Button href={"privacy-policy"}>Privacy Policy</Button>

      {googleAuthenticationPolicy.map((information, key) =>
        Array.isArray(information.content) ? (
          <ul>
            {information.content.map((content, smallerKey) => (
              <li>
                <Typography
                  variant={information.variant}
                  key={smallerKey}
                  gutterBottom
                >
                  {content}
                </Typography>
              </li>
            ))}
          </ul>
        ) : (
          <Typography variant={information.variant} gutterBottom key={key}>
            {information.content}
          </Typography>
        )
      )}
    </Container>
  );
}

export default GoogleAuthenticationPolicyPage;
