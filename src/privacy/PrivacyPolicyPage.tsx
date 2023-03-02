import { Button, Container, Typography } from '@mui/material';
import { useEffect } from 'react';

const policyInformation:{variant: "button" | "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "inherit" | "subtitle1" | "subtitle2" | "body1" | "body2" | "overline" | undefined, content: string| string[]}[] = [
    { variant: 'h3', content: 'Privacy Policy' },
    { variant: 'caption', content: 'Last Updated: March 1st, 2023' },
    { variant: 'subtitle1', content: 'The Privacy Policy of Sartain Studios (hereinafter referred to as "Sartain Studios," "we," or "us") outlines the methods by which we gather, utilize, and reveal information concerning you. This Privacy Policy is applicable when you avail of our websites, mobile applications, and other online offerings that are linked to this Privacy Policy (collectively referred to as our "Services"), communicate with our customer service team, participate in our social media interactions, or engage with us through other means.' },
    { variant: 'subtitle1', content: 'It is possible that this Privacy Policy may undergo modifications in the future. In the event of such changes, we will keep you informed through revision of the date located at the top of the policy, and in specific circumstances, additional notification may be provided (such as a statement added to our website or a direct notification to you). We advise you to regularly review this Privacy Policy in order to stay updated on our information practices and the options available to you.' },
    { variant: 'h4', content: 'CONTENTS' },
    { variant: 'body1', content: ['Collection of Information', 'Use of Information', 'Sharing of Information', 'Transfer of Information to the United States and Other Countries', 'Your Choices', 'Your California Privacy Rights', 'Additional Disclosures for Individuals in Europe', 'Contact Us'] },
    { variant: 'h4', content: 'COLLECTION OF INFORMATION' },
    { variant: 'h6', content: 'Information You Provide to Us' },
    { variant: 'body1', content: 'We gather information that is directly provided by you. This can occur in various ways, such as when you create an account, complete a form, submit or post content on our Services, purchase a membership, communicate with us through third-party platforms, request customer support, or engage in any other form of communication with us. The personal information that we may collect can encompass your name, display name, username, biography, email address, business information, your content, including your profile picture, photographs, posts, responses, and series published by you, and any other information that you elect to supply.' },
    { variant: 'body1', content: 'On occasion, we may also gather information that you provide about others. An instance of this is when you purchase a Sartain Studios membership as a gift for someone else. This information will be utilized to fulfill your request and we will not send any communications to your contacts that are not related to your request, unless they have separately given their consent to receive communications from us or have engaged with us in some other manner.' },
    { variant: 'body1', content: 'We do not gather payment information through our Services. Third-party entities are relied upon to handle payments in connection with our Services. Any information that you supply to facilitate a payment is subject to the privacy policy of the third-party payment processor, and we strongly suggest that you review this policy before providing any information to the payment processor.' },
    { variant: 'h6', content: 'Information Acquired Automatically During Your Interactions with Us' },
    { variant: 'body1', content: 'On certain occasions, we may automatically gather certain information, including:' },
    { variant: 'body1', content: 'Activity Details: Our Services collect information regarding your engagement with us, such as your reading history, shared links, user followings, post highlights, and applause given for posts.' },
    { variant: 'body1', content: 'Transaction Information: In the event that you purchase a membership, information concerning the transaction will be collected by us, including subscription details, purchase price, and the date of the transaction.' },
    { variant: 'body1', content: 'Device and Usage Data: Our Services gather information about your method of accessing them, including information about the device and network used, such as hardware model, operating system version, mobile network, IP address, unique device identifier, browser type, and app version. We also track your activity on our Services, such as access times, pages viewed, links clicked, and previous page visited before accessing our Services.' },
    { variant: 'body1', content: 'Data Collected by Cookies and Tracking Technologies: We utilize tracking technologies like cookies and web beacons to gather information about you. Cookies are small data files stored on your device or hard drive that enhance our Services and your experience, monitor popular areas and features of our Services, and count visits. Web beacons, also known as "pixel tags" or "clear GIFs," are electronic images that we use on our Services and in emails to deliver cookies, track visits, and understand usage. We collaborate with third-party analytics providers who use cookies, web beacons, device identifiers, and other technologies to gather information about your use of our Services and other websites and applications, such as your IP address, web browser, mobile network information, pages viewed, time spent on pages or in mobile apps, and links clicked. This information may be utilized by Sartain Studios and others for various purposes, including analyzing and tracking data, determining the popularity of content, delivering content relevant to your interests on our Services, and enhancing understanding of your online behavior. For more information on cookies and disabling them, see "Your Choices" below.' },
    { variant: 'h6', content: 'Data Collected from External Sources' },
    { variant: 'body1', content: 'We gather information from reputable third-party sources, including social networks, accounting services providers, and data analytics providers. Should you choose to create or log into your Sartain Studios account through a third-party platform like Apple, Facebook, Google, or Twitter, we will be granted access to certain information in accordance with the authorization procedures outlined by the platform, such as your name, network of friends or followers, birthdate, and profile picture. The application accesses user data from google/apple/facebook/twitter when user agrees to sign in the website using the user\'s google/apple/facebook/twitter account. The data is used by the application to remeber where the user finished reading and help them get back there. The data also allows users to add comments, likes, dislikes, and posts to articles. The user data from google/apple/facebook/twitter is limited to just name and email which is store securely in a database. The application does not share google/apple/facebook/twitter user data with other parties. Google/apple/facebook/twitter user data is not used for other reasons other than whats mentioned in this privacy policy.' },
    { variant: 'h6', content: 'Information We Derive' },
    { variant: 'body1', content: 'We may use the information collected to derive additional information or make inferences about you. This may include determining your location based on your IP address or deducing your reading preferences from your reading history.' },
    { variant: 'h4', content: 'Utilization of Information' },
    { variant: 'body1', content: 'The information we collect is utilized to provide, sustain, and enhance our Services, including the publication and distribution of user-generated content, personalization of posts, and operation of our metered paywall. The information also serves the following purposes:' },
    { variant: 'body1', content: 'Establish and upkeep of your Sartain Studios account' },
    { variant: 'body1', content: 'Facilitate transactions and provide related information, including confirmations, receipts, and user satisfaction surveys' },
    { variant: 'body1', content: 'Deliver technical notices, security alerts, and offer support and administrative communication' },
    { variant: 'body1', content: 'We respond to your comments and questions and provide customer support to ensure the best possible experience with our Services' },
    { variant: 'body1', content: 'We communicate with you about new and exciting content, products, services, and features offered by Sartain Studios, as well as other relevant news and information. You can choose to opt out of these communications at any time through your Choices (see below)' },
    { variant: 'body1', content: 'We monitor and analyze trends, usage, and activities in relation to our Services to continuously improve and enhance your experience' },
    { variant: 'body1', content: 'We work to detect, investigate, and prevent security incidents and other malicious, deceptive, fraudulent, or illegal activity, and protect the rights and property of Sartain Studios and others to maintain a safe and secure platform' },
    { variant: 'body1', content: 'We debug our Services to identify and repair any errors, ensuring the reliability and stability of our platform.' },
    { variant: 'body1', content: 'We comply with our legal and financial obligations to maintain transparency and accountability' },
    { variant: 'body1', content: 'And carry out any other purposes that were described to you at the time the information was collected.' },
    { variant: 'h4', content: 'INFORMATION SHARING' },
    { variant: 'body1', content: 'We share personal information in the following scenarios or as otherwise stated in this policy:' },
    { variant: 'body1', content: 'When using our Services to publish content, post comments, or send private notes, certain personal information about you, such as your name, photo, bio, and other account information you may provide, as well as information about your activities on our Services (e.g., your followers and who you follow, recent posts, claps, highlights, and responses), will be visible to other users.' },
    { variant: 'body1', content: 'We share personal information with vendors, service providers, and consultants who require access to this information in order to perform services for us, such as companies that assist us with web hosting, storage, analytics, payment processing, fraud prevention and security, customer service, communications, and marketing.' },
    { variant: 'body1', content: 'We may disclose personal information when we believe it is in accordance with, or required by, any applicable law or legal process, including lawful requests from public authorities for national security or law enforcement purposes. If we are required to disclose personal information in response to legal process, we will provide notice unless doing so is prohibited by law or may pose a risk to others or encourage illegal conduct. We will object to any improper legal requests for information about our Services users.' },
    { variant: 'body1', content: 'We may share personal information if we believe that your actions are inconsistent with our user agreements or policies, if we believe you have violated the law, or if it is necessary to protect the rights, property, and safety of Sartain Studios, our users, the public, or others.' },
    { variant: 'body1', content: 'We may share personal information with our legal advisors and other professional consultants when necessary to obtain advice or otherwise protect and manage our business interests.' },
    { variant: 'body1', content: 'We may share personal information in the event of, or during negotiations concerning, any merger, sale of company assets, financing, or acquisition of all or a portion of our business by another company.' },
    { variant: 'body1', content: 'Personal information is shared between Sartain Studios and its current and future parents, affiliates, and subsidiaries, as well as other companies under common control and ownership.' },
    { variant: 'body1', content: 'Disclosure of Personal Information with Consent or Direction' },
    { variant: 'body1', content: 'Aggregated or De-Identified Information Sharing' },
    { variant: 'body1', content: 'International Transfer of Information' },
    { variant: 'body1', content: 'Our headquarters are located in the United States and we also have operations and service providers in other countries. This may result in the transfer of personal information to jurisdictions that may not provide the same level of data protection as your home country. For instance, we transfer personal data to Amazon Web Services, one of our service providers that processes personal information globally in multiple data centers, including those listed here. We will take necessary measures to ensure your personal information is adequately protected in the jurisdictions in which we process it.' },
    { variant: 'h5', content: 'Options for Your Information' },
    { variant: 'h6', content: 'Accessing and Managing Account Information' },
    { variant: 'body1', content: 'You can access, correct, delete, and export your account information at any time by logging in to the Services and navigating to the Settings page. Please note that if you decide to delete your account, certain information about you may still be retained for legal or business purposes.' },
    { variant: 'h6', content: 'Cookie Management' },
    { variant: 'body1', content: 'Most web browsers have cookies enabled by default. However, if desired, you can usually modify your browser settings to either remove or block cookies. Please be aware that doing so may impact the availability and functionality of our Services.' },
    { variant: 'h6', content: 'Communication Preferences' },
    { variant: 'body1', content: 'You may choose to opt-out of certain types of communications from us, such as newsletters, digests, and activity notifications, by following the instructions in the relevant communications or through your account settings. However, we may still send you administrative emails, such as those related to your account or our ongoing business relationship.' },
    { variant: 'h6', content: 'Mobile Push Notifications' },
    { variant: 'body1', content: 'With your consent, we may send push notifications to your mobile device. You can disable these messages at any time by modifying the notification settings on your mobile device.' },
    { variant: 'h6', content: 'YOUR CALIFORNIA PRIVACY RIGHTS' },
    { variant: 'body1', content: 'The California Consumer Privacy Act (CCPA) (Cal. Civ. Code § 1798.100 et seq.) grants California residents certain rights in relation to their personal information. If you are a California resident, this section applies to you.' },
    { variant: 'body1', content: 'In the past 12 months, we have collected the following categories of personal information: identifiers, commercial information, information on internet or other electronic network activity, and inferences. For more detailed information on the specific data points we collect and the sources of such collection, please refer to the "Collection of Information" section above. We collect personal information for the business and commercial purposes described in the "Use of Information" section above. In the past 12 months, we have disclosed the following categories of personal information for business purposes to the following categories of recipients:' },
    { variant: 'body1', content: 'Sartain Studios does not sell your personal information.' },
    { variant: 'body1', content: 'Subject to certain limitations, you have the right to (1) request more information about the categories and specific pieces of personal information we collect, use, and disclose about you, (2) request the deletion of your personal information, (3) opt-out of any future sales of your personal information, if applicable, and (4) not be discriminated against for exercising these rights. You may make these requests by emailing us at privacy@sartainstudios.com or by using this webform. We will verify a webform request by requiring you to provide identifying information. If you exercise your rights under the CCPA, we will not discriminate against you.' },
    { variant: 'body1', content: 'If we receive a request from an authorized agent, we may request evidence that you have granted the agent power of attorney or that the agent has valid written authority to make requests on your behalf. This may include requiring you to verify your identity. If you are an authorized agent, please contact us.' },
    { variant: 'body1', content: 'ADDITIONAL DISCLOSURES FOR INDIVIDUALS IN EUROPE' },
    { variant: 'body1', content: 'If you reside within the European Economic Area (“EEA”), the United Kingdom, or Switzerland, you are entitled to certain rights and protections under applicable laws regarding the handling of your personal data, and this section applies to you.' },
    { variant: 'h6', content: 'Legal Justification for Handling' },
    { variant: 'body1', content: 'When we handle your personal data, we will do so based on the following lawful justifications:' },
    { variant: 'body1', content: 'To fulfill our obligations under our contract with you (e.g. providing the products and services you requested).' },
    { variant: 'body1', content: 'When we have a legitimate interest in handling your personal data to run our business or protect our interests (e.g. to provide, maintain and improve our products and services, conduct data analysis, and communicate with you).' },
    { variant: 'body1', content: 'To comply with our legal responsibilities (e.g. to maintain a record of your consents and track those who have opted out of non-administrative communications).' },
    { variant: 'body1', content: 'When we have your consent to do so (e.g. when you opt in to receive non-administrative communications from us). If consent is the lawful justification for handling your personal data, you may withdraw such consent at any time.' },
    { variant: 'h6', content: 'Data Preservation' },
    { variant: 'body1', content: 'We store personal data linked to your account for as long as your account remains active. If you close your account, we will delete your account data within 14 days. We preserve other personal data for as long as it is necessary to carry out the purposes for which we initially collected it, and for other legitimate business purposes, including meeting our legal, regulatory, or other compliance obligations.' },
    { variant: 'h6', content: 'Data Subject Requests' },
    { variant: 'body1', content: 'Subject to certain limitations, you have the right to request access to the personal data we have about you, and receive it in a portable format, the right to ask that your personal data be corrected or deleted, and the right to object to, or request that we restrict, certain handling. To exercise your rights:' },
    { variant: 'body1', content: 'If you sign up for a Sartain Studios account, you can request an export of your personal information at any time from the Settings page or by navigating to Settings, then selecting Account within our app.' },
    { variant: 'body1', content: 'You may correct information linked to your account from the Settings page or by navigating to Settings, then selecting Account within our app, and the Customize Your Interests page to update your interests.' },
    { variant: 'body1', content: 'You may withdraw consent at any time by deleting your account through the Settings page or by navigating to Settings, then selecting Account within our app (unless Sartain Studios is legally prohibited from deleting your information).' },
    { variant: 'body1', content: 'You may object to the use of your personal data at any time by contacting privacy@sartainstudios.com.' }
];

function PrivacyPolicyPage() {
    useEffect(() => {
        document.title = 'Privacy Policy';
    }, []);

    return (
        <Container>
            <Button href={"google-authentication"}>Google Authentication Policy</Button>
            <Button href={"https://console.cloud.google.com/apis/credentials/consent?project=red-delight-377901"}>Google API Console</Button>

            {policyInformation.map((information, key) =>
                Array.isArray(information.content)
                    ? (
                        <ul>
                            {information.content.map((content, smallerKey) =>
                                <li>
                                    <Typography variant={information.variant} key={smallerKey} gutterBottom >
                                        {content}
                                    </Typography>
                                </li>
                            )}
                        </ul>
                    )
                    : (
                        <Typography variant={information.variant} gutterBottom key={key}>
                            {information.content}
                        </Typography>
                    )
            )}
        </Container>
    );
}

export default PrivacyPolicyPage;