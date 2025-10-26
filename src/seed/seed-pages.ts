export async function seedPages(payload: any) {
  console.log('📄 Importing pages...')

  const pages = [
  {
    "title": "Privacy Policy",
    "slug": "privacy-policy",
    "excerpt": "Learn about how CHIRP Radio collects, uses, and protects your personal information.",
    "layout": [
      {
        "blockType": "contentCard",
        "preheader": "LEGAL",
        "title": "Privacy Policy",
        "titleTag": "h1",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "The Chicago Independent Radio Project, a non-profit, registered 501(C)(3) organization (\"CHIRP\"), takes the confidentiality and protection of the information we collect seriously. As such, CHIRP has created this privacy policy (the \"Policy\") to provide you with information about our privacy practices so that you will understand when and how we collect information about you as you interact with the CHIRP website, located at http://www.chirpradio.org (the \"Site\") and mobile app (the \"App\"), and how that information is used, disclosed and protected.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "By accessing our Site or App and submitting information to us, you consent to the privacy practices described in this Policy and the Terms of Service located at /terms-of-service, as modified from time to time by us. We reserve the right to modify any portion of the Policy at any time, and without notice to you. Your continued use of the Site following any modification of the Policy signifies your consent to the modification.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none"
      },
      {
        "blockType": "contentCard",
        "title": "Information CHIRP Collects",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "When you access the Site or App, CHIRP may collect both personally identifiable information such as your name, e-mail address, customer support inquiries, or non-personally identifiable information about your activities while interacting with Site.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Information You Give Us:",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "• Registration Information: Portions of the Site or App may require you to register and log in and provide personal information before you can access the area of the Site or App or post information.\n• Donation Information: When you make a donation to CHIRP, we may collect various kinds of information about you, including your name, e-mail address, home or business addresses, home and business phone numbers, or demographic information.\n• Public Forums: The Site may allow you to participate in or submit content to online chat rooms, discussion boards, forums, blogs and other interactive features.\n• Support: If you contact us with questions or issues regarding your use of the Site, we will collect information about you in order to provide necessary support to you.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none"
      },
      {
        "blockType": "contentCard",
        "title": "Automatically Collected Information",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "We automatically receive certain types of information whenever you interact with the Site. For example, when you visit the Site, we automatically collect your IP address, exit and entry information, browsing behavior, the type of browser you use, podcasts accessed, pages viewed, impressions, and similar types of information. This information may be automatically collected through the use of \"cookies\" or \"clickstream\" which are discussed in more detail below.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "We also use Cookies and navigational data like Uniform Resource Locators (URL) to gather information regarding the date and time of your visit and the information you searched for and viewed, or on which of the advertisements displayed on the CHIRP site you clicked. This type of information is collected to make the CHIRP site and tools more useful to you and to tailor the CHIRP experience to meet your special interests and needs.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none"
      },
      {
        "blockType": "contentCard",
        "title": "Use of \"Cookies\"",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Cookies are small text files placed on your hard drive by a website when you visit that website. These files identify your computer and record your preferences and other data about your visit so that, when you return to the site, the site recognizes you and can personalize your visit. In general, we use cookies to collect information so that we can determine how to improve the Site by seeing which areas, features, and products are most popular, to personalize the Site, to make recommendations based on content you have liked in the past, to improve the overall site experience, and to complete transactions you have requested.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Most browsers automatically accept cookies as the default setting. You should be able to modify the setting of your browser to reject cookies or to prompt you before accepting a cookie from the websites you visit by editing your browser options. If you decide not to accept our cookies, you will still be able to access those parts of our Site available to the general public, but you may not be able to use some of the Site's features or services and you may have a less satisfactory experience.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none"
      },
      {
        "blockType": "contentCard",
        "title": "Use & Disclosure of Information",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "In general, we use personal information internally to serve you and to enhance and extend our relationship with our users. We use personal information for donation purposes, to complete transactions you have requested, to anticipate and resolve problems with our Site or App, to respond to support inquiries, to create and inform you of upcoming events and CHIRP related news, and to inform you of new products or services.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "We disclose personal information only when we have your consent to do so, as necessary to complete a transaction you have requested, when required by law, or when permitted to protect our rights or property. CHIRP does not share, sell, or trade user or donor information with any other entities.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Protection of CHIRP and Others: We may release personal information when we believe release is appropriate to comply with the law (e.g., a lawful subpoena, warrant or court order); to enforce or apply our policies; to initiate, render, bill, and collect for amounts owed to us; to protect our rights or property; to protect you from fraudulent, abusive, or unlawful use of our Site; or if we reasonably believe that an emergency involving immediate danger of death or serious physical injury to any person requires disclosure of communications or justifies disclosure of records without delay.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none"
      },
      {
        "blockType": "contentCard",
        "title": "Third-Party Sites & Security",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Please be aware that we may provide links to third-party websites from the Site and App. We may also enable third-party advertising networks, advertisers and ad servers to promote third-party products and/or services by placing advertisements on the CHIRP website. CHIRP is not responsible for the content or information collection practices of third party websites.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "CHIRP has in place what we believe to be appropriate physical, electronic, and managerial procedures to safeguard and secure the information we collect online. While we have taken efforts to guard your personal information, we cannot guarantee that your information is secure and will not be disclosed or accessed by accidental circumstances or by the unauthorized acts of others.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "CHIRP does not share, trade or sell member lists with third parties.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Please contact us at chirp@chirpradio.org to (a) correct or update any personal information in the CHIRP database that you state is erroneous, (b) opt-out of future communications from CHIRP, or (c) request CHIRP to make reasonable efforts to remove your personal information from our database.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "If you have any questions, comments or concerns about this Policy, or wish to change your information please contact chirp@chirpradio.org or send mail to: CHIRP Radio, 4045 N. Rockwell, Chicago, IL 60618.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none"
      }
    ],
    "sidebarAnnouncementId": null,
    "sidebarContentType": "none",
    "sidebarAdvertisementId": null
  },
  {
    "title": "Terms of Service",
    "slug": "terms-of-service",
    "excerpt": "Terms and conditions for using the CHIRP Radio website and services.",
    "layout": [
      {
        "blockType": "contentCard",
        "preheader": "LEGAL",
        "title": "Terms of Service",
        "titleTag": "h1",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Chicago Independent Radio Project, a non-profit, registered 501(C)(3) organization (\"CHIRP\"), has created these Terms of Use (the \"Terms\") to provide you with information about how you may or may not use the CHIRP website located at www.chirpradio.org. Please read these Terms of Use before accessing http://www.chirpradio.org or any features of our website, including, but not limited to, the CHIRP Volunteer Site, the CHIRP Record Fair Site, CHIRP's First Time Reading Series Site, CHIRP's Record Store Day Event Site, the CHIRP Store, or CHIRP Podcasts (collectively, the \"Website\"). By using the Website, you agree to be bound by these Terms. If you do not agree to these Terms, please exit the Website.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "We reserve the right, at our discretion, to modify, add or delete portions of these terms at any time by posting updated Terms on the Website. Please check these Terms frequently for updates. Any modifications, additions or deletions to these Terms shall be effective immediately upon posting of updated Terms. Your continued use of the Website following the posting of updated Terms will mean that you agree to those changes.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none"
      },
      {
        "blockType": "contentCard",
        "title": "Copyrights & Trademarks",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "The Website and all content made available through the Website are protected by U.S. and international copyright laws and are the intellectual property of CHIRP or its licensors. You may not reproduce, distribute, transmit, display, prepare derivative works, or perform any copyrighted material which is made available through Website without the prior written consent of CHIRP, except as provided in this section: (a) You may copy and print a limited amount of content for non-commercial use, (b) if you would like to link to articles or other publications available on the Website, you may copy up to three (3) paragraphs or 50% of the content, whichever is greater, then you must provide a link to the original Website page on the website where the publication is located.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "CHIRP, Chicago Independent Radio Project, CHIRP program names, button icons, trade dress and any other logo or trademark located on the Website are the trademarks or registered trademarks of CHIRP or CHIRP's sponsors. All rights are reserved to CHIRP or its sponsors. You may not use any of the trademarks, service marks, logos or graphics located at Website without the prior written consent of the applicable trademark owner.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none"
      },
      {
        "blockType": "contentCard",
        "title": "Links to and from CHIRP Website",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "CHIRP encourages and permits links to content on the Website, provided such links conform to these Terms. However, because we are a registered 501(C)(3) nonprofit organization the linking should not: (a) suggest that CHIRP promotes or endorses any third party's causes, ideas, websites, products or services, without CHIRP's prior consent or (b) use CHIRP content for inappropriate commercial purposes. We reserve the right to withdraw permission for any link.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "CHIRP has provided links to Internet sites maintained by third parties, over which CHIRP has no control. CHIRP does not endorse the content, operators, products or services of such sites, and CHIRP is not responsible or liable for the content, operators, availability, accuracy, quality, advertising, products, services or other materials on or available from such sites.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none"
      },
      {
        "blockType": "contentCard",
        "title": "CHIRP Podcasts",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "CHIRP may provide you with access to podcasts consisting of selected audio content from CHIRP and other content providers, which may be downloaded and played from a user's computer or transferred to a portable listening device (the \"Podcasts\"). Podcasts are protected by U.S. and international copyright laws. All rights in and to the Podcasts are reserved to CHIRP or the content provider. Podcasts are made available to you for personal, noncommercial use only. You may download, copy and/or transfer a Podcast to a portable listening device the Podcasts for your personal, noncommercial use only, provided that you do not modify the content or make it publically available. You also may link to Podcasts from your website, blog or similar application, as long as the linking does not: (a) suggest that CHIRP promotes or endorses any third party's causes, ideas, websites, products or services, or (b) use CHIRP content for inappropriate commercial purposes. CHIRP reserves the right to discontinue providing Podcasts and to require that you cease accessing or using the Podcasts, or any content contained in the Podcasts, at any time for any reason.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none"
      },
      {
        "blockType": "contentCard",
        "title": "Use of the Website & Rules for Posting Content",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "When using the Website, You must abide by the following rules:",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "• you may not post, upload or transmit any material or links to material that is libelous, defamatory, false, obscene, indecent, lewd, pornographic, violent, abusive, threatening, harassing, discriminatory, in violation of the law or that constitutes hate speech\n• you may only post, upload or transmit materials, including but not limited to photographs, artwork, or publications, for which you have the necessary rights to post, upload or transmit via the Website\n• you are solely responsible for the content you submit; You may not violate, plagiarize, or infringe on the rights of third parties, including copyright, trademark, trade secret, privacy, personal, publicity, moral or proprietary rights\n• the Website may only be used for noncommercial purposes\n• you may not post, upload or transmit any software or other material which contains a virus or other harmful code or device\n• you may not use the Website to distribute chain letters, mass mailings or \"spam\" or to gather e-mail addresses for the purpose of sending \"spam\" to others\n• persons under the age of eighteen (18) MUST obtain parental permission before registering, uploading or transmitting material on or through the Website\n• you are not allowed to mirror or frame the Website",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "CHIRP reserves the right to edit and or remove posts deemed off-topic, abusive or not in conformance with CHIRP's Privacy Policy or Terms. CHIRP further reserves the right to deny a user from making further posts by blocking their registration and access to the Website, should the user show repeated disregard for these Terms.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none"
      },
      {
        "blockType": "contentCard",
        "title": "Your Content; Grant of Rights to CHIRP",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "By posting, uploading or transmitting any content or material on or through the Website, you hereby grant CHIRP a non-exclusive, perpetual, royalty-free, worldwide license to use, copy, sublicense, modify, transmit, publicly perform or display the content or material, and your name and location (city, state and/or country), if you provide that information to us, in connection with that content or material, in all media, whether or not now known.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none"
      },
      {
        "blockType": "contentCard",
        "title": "Disclaimer & Limitation of Liability",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "THE WEBSITE AND ANY PRODUCTS SOLD ON OR THROUGH THE WEBSITE ARE AVAILABLE ON AN \"AS IS\" AND \"AS AVAILABLE\" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF TITLE OR IMPLIED WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. CHIRP DOES NOT WARRANT THAT THE WEBSITE WILL BE UNINTERRUPTED OR ERROR-FREE. USE OF THIS WEBSITE IS ENTIRELY AT YOUR OWN RISK.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "IN NO EVENT WILL CHIRP, ITS DIRECTORS, OFFICERS, EMPLOYEES, MEMBERS, SUPPLIERS, LICENSORS, OR OTHER THIRD PARTIES MENTIONED AT THIS WEBSITE BE LIABLE TO YOU IN ANY AMOUNT FOR ANY DAMAGES WHATSOEVER INCLUDING, WITHOUT LIMITATION, DIRECT, INDIRECT, CONSEQUENTIAL, SPECIAL, INCIDENTAL OR PUNITIVE DAMAGES, ARISING OUT OF THE USE OR INABILITY TO USE THE WEBSITE OR RELATING TO ANY PRODUCTS SOLD ON OR THROUGH THE WEBSITE.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "You agree to defend, indemnify and hold harmless CHIRP, its affiliate and its respective officers, directors, principals, employees, contractors, sponsors, agents and affiliates harmless from and against any and all demands, claims, damages, losses, costs and expenses, including, without limitation, reasonable attorneys' fees and costs of suit, arising or resulting from your use or misuse of the Websites (or any associated services), or materials, comments or content you submit.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none"
      },
      {
        "blockType": "contentCard",
        "title": "Digital Millennium Copyright Act",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "CHIRP respects the intellectual property rights of others. If you believe that your work has been copied in a way that constitutes copyright infringement, please contact us via email at CHIRP@chirpradio.org and send us a proper Digital Millennium Copyright Act (\"DMCA\") takedown notice. Upon determination that your DMCA takedown notice has been properly executed we will remove the specified infringing content.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "If you wish to send your DMCA takedown notice by mail, please send it to: CHIRP Radio, 4045 N. Rockwell, Chicago, IL 60618",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none"
      },
      {
        "blockType": "contentCard",
        "title": "Miscellaneous",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "The Website is controlled and operated in Chicago, Illinois, United States. CHIRP makes no representation that content, materials or products available on or through the Website are appropriate or available for use outside of the United States.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "These terms of use shall be governed by and construed under State of Illinois law without regard to its choice of law rules, and, where applicable, the laws of the United States. To the extent permissible by law, any disputes under these terms of use or relating to the Website shall be litigated in the local or Federal courts located, and you hereby consent to personal jurisdiction and venue, in the State of Illinois.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "If you have any questions about the terms of use, please contact us.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none"
      }
    ],
    "sidebarAnnouncementId": null,
    "sidebarContentType": "none",
    "sidebarAdvertisementId": null
  },
  {
    "title": "About CHIRP",
    "slug": "about",
    "excerpt": "Learn about CHIRP Radio - Chicago's independent, volunteer-driven community radio station.",
    "layout": [
      {
        "blockType": "contentCard",
        "preheader": "ABOUT CHIRP",
        "title": "About CHIRP Radio",
        "titleTag": "h1",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "CHIRP is a radio station that is all about its community. CHIRP Radio - 107.1FM is a volunteer-driven, community radio station that focuses on music, arts, and culture. We are live and local every day of the year from 6am-midnight from our studios in Chicago's North Center neighborhood, and the city we live in is a key part of everything we do.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "CHIRP plays a wide mix of local, independent, lesser-heard music, and just generally good music from a variety of genres and eras. CHIRP DJs are true music fans who love to share their discoveries, new and old, with listeners. CHIRP DJs broadcast live from our studios in Chicago's North Center neighborhood, curating their own shows and interacting with listeners. CHIRP emphasizes local and independent music and embraces radio's traditional strength of creating meaningful connections with listeners. CHIRP also features conversations with artists, activists, and other people doing interesting work, and our award-winning features department produces pieces highlighting Chicago's diverse voices and stories.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "right",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "The CHIRP Story",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "The Chicago Independent Radio Project (CHIRP) is a volunteer driven, listener supported radio station built and run by independent-minded music and arts fans. CHIRP is always live and local, connecting Chicago's diverse creative communities through its programming and events.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "The Chicago Independent Radio Project was founded in 2007 to bring a new community radio station to Chicago, and to expand low power FM opportunities into urban areas. CHIRP worked with national partners to successfully pass a bill through Congress, the Local Community Radio Act, that has allowed more than 1,000 new stations across the country to go on the air.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "CHIRP launched its station online at chirpradio.org in 2010, and hit the terrestrial airwaves at 107.1FM in late 2017. During that time, CHIRP has grown from a small organization into a well-loved, community-focused radio station with one staff member and more than 250 volunteers.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none"
      },
      {
        "blockType": "imageRow",
        "images": []
      },
      {
        "blockType": "contentCard",
        "preheader": "Founder & General Manager",
        "title": "Shawn Campbell",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Shawn Campbell has three decades of broadcast experience, including eight years as program director at Chicago's WLUW, and a stint as a producer and reporter at WBEZ. She's also been a news writer and anchor, a DJ, a music director, and a news director. The only thing she wanted to do from the time she was ten years old was to be on the radio.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Prior to becoming CHIRP's first employee in March of 2012, Campbell served as President of the Board of Directors for nearly five years. During that time, she and then-Vice President Jennifer Lizak led a White House meeting on the low-power FM broadcast issue with President Obama's technology team. In addition to her General Manager duties, she currently hosts a CHIRP show on Saturdays from 12-2pm.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "right",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=800&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Staffing",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "CHIRP is staffed by a General Manager and a volunteer group of roughly 240. CHIRP volunteers head up all station departments, handle DJ and producer duties, manage the technical aspects of the station, plan events and raise funds, create marketing campaigns and build partnerships, and take part in everything else required to run the station. No prior radio experience is required to be a part of CHIRP. New volunteer orientations are held three times each year.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "You can find out more about what you can do to help on our Volunteers Website.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "You can find a list of CHIRP staff and members of the organization's Board of Directors here.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none"
      },
      {
        "blockType": "imageRow",
        "images": []
      },
      {
        "blockType": "contentCard",
        "title": "Our History",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "The Chicago Independent Radio Project, or CHIRP, was formed in the summer of 2007 to bring a truly independent music- and arts-focused community radio station to Chicago.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "At a time when corporate-owned radio grows ever more bland, repetitious, and commercialized, community radio is more important than ever. The volunteers and staff at CHIRP are true believers in radio that is diverse, exciting, live, and locally-based. Community radio is non-commercial, and is created by regular people from all walks of life, not just broadcast professionals. It is committed to playing music the big stations won't touch, and to focusing on the vibrant culture of a community that often flies under the radar.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "CHIRP launched its station online at CHIRPradio.org in January of 2010. From the time the organization was founded, its members also worked to convince Congress and the Federal Communications Commission to allow new LPFM stations in big cities. CHIRP volunteers and supporters called their legislators and filed public comments with the FCC. In 2010, the bill CHIRP had worked to support, the Local Community Radio Act, was signed into law by President Obama and handed to the Federal Communications Commission to implement.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "In October 2013, the FCC opened its first low-power FM application window in thirteen years, and for the first time made room for urban applicants. CHIRP submitted its broadcast license application in November 2013, and almost exactly one year later, was awarded a broadcast license for 107.1FM.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "CHIRP launched its terrestrial broadcast on October 21, 2017 at 107.1FM on the north side of Chicago. Meanwhile, thanks to the bill we helped pass, 700 other new community stations are on the air across the country.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none"
      }
    ],
    "sidebarAnnouncementId": null,
    "sidebarContentType": "none",
    "sidebarAdvertisementId": null
  },
  {
    "title": "Ways to Give",
    "slug": "ways-to-give",
    "excerpt": "Support CHIRP Radio through donations, vehicle donations, record donations, and more.",
    "layout": [
      {
        "blockType": "contentCard",
        "preheader": "DONATE TO CHIRP",
        "title": "Other Ways to Give",
        "titleTag": "h1",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Nulla vitae elit libero, a pharetra augue. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas sed diam eget risus varius blandit sit amet non ipsum. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Curabitur blandit tempus porttitor ligula. Cras mattis consectetur purus sit amet fermentum.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur. Integer posuere erat a ante venenatis.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "right",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Support CHIRP When You Shop",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Bookmark the following links and use them all year long when you shop. A portion of your sale price will be donated directly to CHIRP!",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "• eBay\n• Paypal Giving Fund\n• Amazon (While Amazon has discontinued their Smile charitable giving program, their affiliate program remains active. Click this link and shop and CHIRP may receive as much as 8% of your purchase through Amazon Associates from the Amazon home page. There will not be a mention of CHIRP.)",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Wishlist / In-Kind Donations",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "CHIRP can always use donations of the following items:",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "• white paper\n• printer cartridges\n• padded mailing envelopes in various sizes (unused)\n• packing tape\n• office/office supplies\n• cleaning supplies (paper towels, wax, windex, etc.)\n• coffee\n• monetary gifts or gift cards",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Contact us for information about specific needs. Thanks so much.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Donate Your Records, CDs, DVDs",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Have you been thinking of getting rid of your collection of old records, CDs, or DVDs? We have a solution! You can donate your unwanted music and movies to CHIRP Radio for up some space and support your favorite radio station! We can even arrange a pick-up. If you would like to donate your vinyl or other collection to CHIRP, please email our Record Fair team.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1512733596533-7b00ccf8ebaf?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Donate Your Vehicle",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Have an old car, truck, boat, or motorcycle sitting around in your garage? Why not donate it to CHIRP? It doesn't even have to run, and you can get a tax deduction! Towing and title transfer is all taken care of for you. Find out more about donating your vehicle to CHIRP.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Donate Bitcoin / Cryptocurrencies",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "1. Go to crypto.chirpradio.us\n2. Pick Chicago Independent Radio Project (CHIRP Radio) from the list.\n3. Donate crypto and get a tax receipt!",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Donations of appreciated cryptocurrency don't trigger capital gains taxes, and may be tax-deductible for the full value.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Join the Vinyl Circle",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Become a member of our major donor program, CHIRP's Vinyl Circle, with a tax-deductible donation and you'll join a network of people who are committed to keeping volunteer-driven, local radio a vibrant part of our community. You can find a list of giving levels and benefits here.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "right",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?w=800&h=800&fit=crop"
      }
    ],
    "sidebarAnnouncementId": 5,
    "sidebarContentType": "podcasts",
    "sidebarAdvertisementId": 6
  },
  {
    "title": "Become a Volunteer",
    "slug": "volunteer",
    "excerpt": "Join the CHIRP Radio volunteer team and become part of Chicago's independent radio community.",
    "layout": [
      {
        "blockType": "contentCard",
        "preheader": "JOIN OUR TEAM",
        "title": "Become a CHIRP Volunteer",
        "titleTag": "h1",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "CHIRP Radio is powered entirely by passionate volunteers who share a love for independent music and community radio. Whether you dream of being on the airwaves, working behind the scenes, or helping spread the word about great music, there's a place for you at CHIRP.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Since 2008, hundreds of volunteers have joined our community to learn new skills, meet fellow music enthusiasts, and contribute to Chicago's vibrant independent radio scene. No prior experience necessary — just bring your passion for music and willingness to learn!",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "right",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&h=800&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Ready to Get Started?",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "To become a CHIRP Radio volunteer, fill out the volunteer form and attend a future volunteer orientation meeting to learn about the station, its departments, and ask any questions you may have.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Orientation meetings are held monthly. After submitting your form, you'll receive information about upcoming session dates.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Become a DJ",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Ever dreamed of being on the radio? CHIRP DJs curate and host their own shows, sharing their musical discoveries with Chicago listeners. All DJs start as volunteers in other departments to learn about the station, then attend DJ orientation, submit an application, and complete training and audition process. CHIRP DJs play a wide array of music from various genres and eras — no specialty shows focused on a single style.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "What you'll do:\n• Curate weekly radio shows\n• Discover and share new music\n• Interview artists and bands\n• Engage with the Chicago music community",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Music Department",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Help decide what music gets played on CHIRP! The Music Department reviews submissions from artists and labels, manages our music library, creates specialty charts, and ensures DJs have access to the best independent music. Perfect for music enthusiasts who love discovering new artists and organizing collections.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Events Team",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Plan and execute CHIRP's legendary events including concerts, the annual Record Fair, DJ nights, and community gatherings. Work with venues, book talent, manage logistics, and create memorable experiences for music fans across Chicago. Great for people-oriented volunteers who love live music.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Tech Department",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Keep CHIRP on the air and online! Our Tech team maintains broadcasting equipment, manages our website and streaming infrastructure, develops digital tools, and ensures listeners can tune in anywhere. Perfect for volunteers with technical skills or those wanting to learn about broadcast technology and web development.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Marketing & Social Media",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Spread the word about CHIRP! Create social media content, design graphics, write newsletters, manage community outreach, and help grow our audience. Ideal for creative volunteers interested in digital marketing, copywriting, graphic design, and building online communities.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Production",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Create audio content for CHIRP including promos, station IDs, podcast editing, and special features. Learn audio production skills, work with professional software, and help maintain CHIRP's unique on-air sound. Great for volunteers interested in audio engineering and creative sound design.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Fundraising",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Help keep CHIRP on the air! Support fundraising campaigns, coordinate donor outreach, plan fundraising events, and develop sponsorship opportunities. Work with a passionate team to ensure CHIRP remains independent and community-supported.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Partnerships",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Build relationships with local businesses, venues, and organizations. Develop sponsorship packages, coordinate cross-promotions, and create mutually beneficial partnerships that support both CHIRP and Chicago's creative community.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Why Volunteer with CHIRP?",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Joining CHIRP means more than just volunteering — it means becoming part of a vibrant community of music lovers and creative professionals.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "• Learn valuable skills in broadcasting, production, marketing, and more\n• Access to exclusive music industry events and concerts\n• Network with musicians, industry professionals, and fellow music enthusiasts\n• Contribute to Chicago's independent music scene\n• Flexible commitment — work around your schedule\n• Potential pathway to becoming an on-air DJ\n• Make lifelong friendships with people who share your passion\n• See direct impact of your work in the community",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "What's the Commitment?",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "CHIRP volunteers meet monthly on the third Thursday at 7:30pm for general meetings where we discuss station business, plan events, and socialize. Beyond meetings, volunteers serve in at least one department and contribute according to their availability and interests. Some departments meet regularly while others work remotely. The time commitment varies by department and role, but flexibility is key — we work with your schedule!",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "right",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop"
      }
    ],
    "sidebarAnnouncementId": null,
    "sidebarContentType": "none",
    "sidebarAdvertisementId": null
  },
  {
    "title": "Contact Us",
    "slug": "contact",
    "excerpt": "Get in touch with CHIRP Radio for music submissions, volunteer opportunities, partnerships, and more.",
    "layout": [
      {
        "blockType": "contentCard",
        "preheader": "GET IN TOUCH",
        "title": "Contact CHIRP Radio",
        "titleTag": "h1",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "We'd love to hear from you! Whether you have questions, feedback, or want to get involved with CHIRP Radio, we're here to help. As a volunteer-driven community radio station, CHIRP thrives on the passion and participation of music lovers like you.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Since 2008, we've been bringing independent music to Chicago's airwaves at 107.1 FM, and we couldn't do it without our dedicated community of listeners, volunteers, and supporters. Whether you're an artist looking to share your music, a music fan wanting to get involved, or a business interested in partnership opportunities, there's a place for you at CHIRP.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Use the contact form or reach out using the information below. Our volunteer teams work hard to respond to all inquiries, though response times may vary depending on the department and volume of messages. Thank you for your interest in CHIRP Radio — Chicago's independent voice for music discovery!",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "right",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1584541728894-dbcae08f94ac?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        "blockType": "contentCard",
        "title": "Submitting Your Music to CHIRP Radio",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "If you're an artist or label who would like to submit music to CHIRP Radio for possible airplay, you can contact our music department using the contact form or send it by mail to the address below.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "IMPORTANT:",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "• If you use the contact form, you must select \"music submissions\" in the dropdown. Submissions sent to any other addresses will be deleted!\n• Please include a brief band bio, your BandCamp or Soundcloud link and a download code.\n• We can only consider submissions with downloadable files! Music submitted via Spotify or YouTube links will NOT be considered because they cannot be used for airplay.\n• Please be aware that due to the volume of mail that we receive, we cannot respond to questions about submission status. However, we do make every effort to listen to all music submitted to CHIRP.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Mailing Address:\nCHIRP Radio * attn: Music Department * 4045 N. Rockwell * Chicago, IL 60618",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Proposing an Interview with a Musical Artist",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "CHIRP does regular interviews with local and touring artists, which we offer as podcasts. If you're interested in being interviewed for a CHIRP podcast, send a bio and links to music samples using the contact form.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Volunteering for CHIRP",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "CHIRP is a volunteer-driven organization. Volunteers meet monthly to work on issues and events, chart progress, and socialize. Meetings take place on the third Thursday of the month at 7:30pm. CHIRP has many active departments that meet at different times or work remotely. CHIRP's departments include Music, Events, Partnerships, Tech, Features, Fundraising, Marketing, Outreach, Volunteer Management, Promotions, Production, and Record Fair. Volunteers can serve in whichever departments match their skills and interests, but all are asked to serve in at least one department.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "If you're interested in volunteering with CHIRP, your required first step is to attend a new volunteer meeting. To find the date of the next meeting, please visit our Volunteers website.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Becoming a DJ",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Anyone hoping to DJ for CHIRP must first attend a new volunteer meeting. From there, volunteers will be expected to participate in other areas and demonstrate their commitment to the organization overall. All potential DJs must attend a CHIRP DJ orientation (offered several times per year), then submit an application and go through a training and audition process. All CHIRP DJs are expected to play a wide array of music from a mix of genres and eras — CHIRP does not feature specialty shows that focus on a single style of music or time period.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Proposing A Ticket Giveaway",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "If you'd like to propose a ticket giveaway, please contact our promotions department using the contact form.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Proposing A Partnership",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "If you have a business or organization and you'd like to propose a partnership with CHIRP, please contact our partnerships department using the contact form.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "CHIRP Radio Studio",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "4045 N. Rockwell St.\nChicago, IL 60618",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Please note: Our studio is not open to the public. For studio tours or in-person visits, please email us in advance to schedule an appointment.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Connect With Us",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Follow CHIRP Radio on social media for the latest updates, show announcements, playlists, and behind-the-scenes content.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Instagram: @chirpradio\nFacebook: facebook.com/chirpradio\nTwitter: @chirpradio\nYouTube: CHIRP Radio",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop"
      }
    ],
    "sidebarAnnouncementId": 2,
    "sidebarContentType": "events",
    "sidebarAdvertisementId": 3
  },
  {
    "title": "Ways to Listen",
    "slug": "other-ways-to-listen",
    "excerpt": "Tune in to CHIRP Radio on FM, online streaming, mobile apps, smart speakers, and more.",
    "layout": [
      {
        "blockType": "contentCard",
        "preheader": "LISTEN TO CHIRP",
        "title": "Other Ways to Listen",
        "titleTag": "h1",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "CHIRP Radio is available across multiple platforms so you can tune in wherever you are. Whether you prefer traditional FM radio, streaming online, or listening on your favorite smart device, we've got you covered.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Discover all the ways to connect with CHIRP and never miss your favorite shows, DJs, and the best independent music Chicago has to offer.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "right",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1584541728894-dbcae08f94ac?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        "blockType": "contentCard",
        "title": "FM Radio",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "The classic way to listen to CHIRP:",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "• 107.1 FM in Chicago and surrounding areas\n• Broadcast 24/7 with no commercials\n• Crystal clear signal covering the entire Chicago metro area",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1606928155414-bb8f56e3e261?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Online Streaming",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Listen from anywhere in the world:",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "• Stream directly from chirpradio.org\n• High-quality audio stream\n• Access our complete playlist and show archives\n• Compatible with all modern browsers",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Our web player makes it easy to listen from any computer or mobile device.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Smart Speakers & Voice Assistants",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Listen to CHIRP Radio on your smart speaker! Simply say \"Alexa, play CHIRP Radio\" or \"Hey Google, play CHIRP Radio\" and start listening. CHIRP is also available on Apple HomePod and other voice-activated devices.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Mobile Apps",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Take CHIRP with you wherever you go! Download the CHIRP Radio app for iOS or Android. Access live streams, view current playlists, discover new music, and get notifications when your favorite DJs are on air.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Radio Apps & Aggregators",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Find CHIRP on popular radio apps:",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "• TuneIn Radio\n• Radio.com\n• iHeartRadio\n• Simple Radio",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Search for \"CHIRP Radio Chicago\" in your favorite radio app and add us to your favorites for easy access.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "CHIRP Podcasts",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Can't catch your favorite show live? No problem! Subscribe to CHIRP's podcasts and listen to select shows on demand. Available on Apple Podcasts, Spotify, Google Podcasts, and all major podcast platforms. Never miss an episode of your favorite CHIRP programs.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "right",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=800&fit=crop"
      }
    ],
    "sidebarAnnouncementId": 3,
    "sidebarContentType": "events",
    "sidebarAdvertisementId": 4
  },
  {
    "title": "CHIRP Vinyl Circle",
    "slug": "vinyl-circle",
    "excerpt": "Join CHIRP's major donor program and support independent community radio in Chicago.",
    "layout": [
      {
        "blockType": "contentCard",
        "title": "CHIRP Vinyl Circle",
        "titleTag": "h1",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Become a member of our major donor program, CHIRP's Vinyl Circle, with a tax-deductible donation and you'll join a network of people who are committed to keeping volunteer-driven, local radio a vibrant part of our community.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none"
      }
    ],
    "sidebarAnnouncementId": null,
    "sidebarContentType": "none",
    "sidebarAdvertisementId": null
  },
  {
    "title": "Car Donation",
    "slug": "car-donation",
    "excerpt": "Donate your old car, truck, motorcycle, or boat to CHIRP. Our vehicle donation program is simple and quick - towing and title transfer provided, plus a tax deduction. Your vehicle doesn't even have to run\\! Call 844-48-CHIRP or fill out the form to arrange a donation.",
    "layout": [
      {
        "blockType": "contentCard",
        "preheader": "Donate to CHIRP",
        "title": "Donating a Vehicle to CHIRP is Easy",
        "titleTag": "h1",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "If you have an old car, truck, motorcycle, or boat that you no longer want, we hope you'll consider donating it to CHIRP. Our vehicle donation program is simple and quick, and makes a real difference for us! Towing and title transfer are provided, and you get a tax deduction for your generosity. Your vehicle doesn't even have to run! All you have to do to arrange a donation is call 844-48-CHIRP (844-482-4477) or fill out this form.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Here are a some answers to the questions you may have:",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "heading",
                "tag": "h3",
                "children": [
                  {
                    "type": "text",
                    "text": "What types of vehicles do you accept?",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Most cars, trucks, trailers, boats, RV's, motorcycles, off road vehicles, heavy equipment and other motorized vehicles are accepted.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "heading",
                "tag": "h3",
                "children": [
                  {
                    "type": "text",
                    "text": "Does my car have to be running to donate it?",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "We can take your vehicle running or not. However, it must be in one piece, have an engine, and be towable. Contact our CARS representative at 844-482-4477 to find out if your vehicle qualifies for pick-up.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "heading",
                "tag": "h3",
                "children": [
                  {
                    "type": "text",
                    "text": "How quickly can I get my vehicle picked up?",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "You will be contacted within 24 hours to start the donation process. After the donation record has been created, we will reach out to you within 2 to 3 business days to schedule your pick up. If you need your vehicle picked up sooner, please call us toll-free at 844-482-4477 as we may be able to make those arrangements.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "heading",
                "tag": "h3",
                "children": [
                  {
                    "type": "text",
                    "text": "Do I need a smog certificate in order to donate my car?",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "For states that require smog certificates or safety inspections, you may donate your vehicle without these documents.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "heading",
                "tag": "h3",
                "children": [
                  {
                    "type": "text",
                    "text": "Do I need the title to donate my vehicle?",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "You will need the title to the vehicle. If you do not have it, it is possible that other arrangements can be made. Please call us toll-free at 844-482-4477 seven days a week, for more information.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "heading",
                "tag": "h3",
                "children": [
                  {
                    "type": "text",
                    "text": "What do you do with donated vehicles?",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Donated vehicles are taken to one of the sale locations our partner company has throughout the country, where they evaluate each vehicle and make major and/or minor mechanical repairs when it is cost effective. In most circumstances, they use auction houses to sell the donated vehicles. For unique or specialty items that have been donated, we may use other means to sell the vehicle to help ensure the maximum amount of money is received for such a donation.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "heading",
                "tag": "h3",
                "children": [
                  {
                    "type": "text",
                    "text": "Why Donate?",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "There are several great reasons, like:",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "list",
                "listType": "number",
                "start": 1,
                "tag": "ol",
                "children": [
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "You don't want to worry about selling your vehicle.",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 1
                  },
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "It is too expensive to repair your vehicle.",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 2
                  },
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "You don't trust your car to be safe on the road.",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 3
                  },
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "You need a tax write-off.",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 4
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "But the most important reason is that your donation will help CHIRP Radio stay strong and continue to improve and its expand its programming!",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "right",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop"
      }
    ],
    "sidebarAnnouncementId": 5,
    "sidebarContentType": "podcasts",
    "sidebarAdvertisementId": 7
  },
  {
    "title": "Request a Song",
    "slug": "request-song",
    "excerpt": "Want to hear your favorite song on CHIRP Radio? We love taking requests from our listeners!",
    "layout": [
      {
        "blockType": "contentCard",
        "title": "Request a Song",
        "titleTag": "h1",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Want to hear your favorite song on CHIRP Radio? We love taking requests from our listeners! Whether it's a deep cut you've been dying to hear, a local artist you want to support, or a new discovery you think everyone should experience, we want to know what you're into.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Our DJs are always on the lookout for great music suggestions, and listener requests help us stay connected to what our community wants to hear. While we can't guarantee every request will make it on air (our DJs curate their shows based on their individual tastes and the station's eclectic format), we read every message and love hearing from you!",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&h=800&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Email Your Request",
        "titleTag": "h3",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Send your song request to dj@chirpradio.org",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Be sure to include:",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "list",
                "listType": "bullet",
                "start": 1,
                "tag": "ul",
                "children": [
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "Song title and artist name",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 1
                  },
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "Album name (if you know it)",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 2
                  },
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "Why you'd like to hear this song",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 3
                  },
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "Optional: Your name and shout-out message",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 4
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Our DJs check this inbox regularly and may play your request during their next show!",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Call the Request Line",
        "titleTag": "h3",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Pick up the phone and call 773-DJ-SONGS (773-357-6647) to speak directly with the DJ on air. This is the most direct way to make a request and you might even get a shout-out! The request line is monitored during live DJ shows.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Request via Social Media",
        "titleTag": "h3",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Use the hashtag #CHIRPrequest on X (formerly Twitter) to reach @CHIRPRadio. Tag us in your post with the song and artist you'd like to hear. Our DJs and social team monitor this hashtag, especially during live shows. Great for engaging with other listeners too!",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Request Through Your Account",
        "titleTag": "h3",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Log in to your listener account on chirpradio.org to submit song requests directly through our website. This method keeps a record of your requests and allows you to track what you've requested in the past. Plus, our DJs can see your listening history and preferences!",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Request Tips for Best Results",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Want to increase your chances of hearing your request on air? Follow these helpful tips:",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "list",
                "listType": "bullet",
                "start": 1,
                "tag": "ul",
                "children": [
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "Know your DJ's style — check the schedule to see what kind of music each DJ typically plays",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 1
                  },
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "Request songs that fit CHIRP's independent and eclectic format",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 2
                  },
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "Support local artists — we love playing Chicago musicians!",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 3
                  },
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "Include context — tell us why you love the song or why it's meaningful to you",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 4
                  },
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "Be patient — DJs receive many requests and curate shows in advance",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 5
                  },
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "Try requesting during live shows for the best response time",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 6
                  },
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "Keep it clean — we're a community radio station!",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 7
                  },
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "Don't request Top 40 hits — we focus on independent and lesser-known music",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 8
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none"
      },
      {
        "blockType": "contentCard",
        "title": "A Note About Requests",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "CHIRP Radio operates on a freeform format, which means our DJs have creative freedom to curate their shows. While we welcome and appreciate all requests, our DJs ultimately decide what fits their show's vibe and the station's mission to promote independent music. Even if your request doesn't make it on air immediately, it might inspire future playlists or introduce our DJs to new artists. Thank you for being an engaged listener and helping us discover great music together!",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "right",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=800&h=600&fit=crop"
      }
    ],
    "sidebarAnnouncementId": 3,
    "sidebarContentType": "events",
    "sidebarAdvertisementId": 6
  },
  {
    "title": "Websites to Remember",
    "slug": "websites-to-remember",
    "excerpt": "Essential links and resources for CHIRP volunteers, including general information, mailing lists, and DJ-specific tools.",
    "layout": [
      {
        "blockType": "contentCard",
        "title": "Websites to Remember",
        "titleTag": "h1",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Welcome to your volunteer resource hub! This page contains essential links and tools you'll need as a CHIRP volunteer. From logging your hours to booking the production studio, accessing DJ resources, and joining mailing lists — everything you need is organized here for easy reference. Bookmark this page and check back regularly for updates.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none"
      },
      {
        "blockType": "contentCard",
        "title": "General Links",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Essential resources for all CHIRP volunteers.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "CHIRP Passport",
                    "format": 1,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  },
                  {
                    "type": "text",
                    "text": " - New to CHIRP? Check out this guide to the many ways you can get involved, and earn a free t-shirt!",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Log your hours",
                    "format": 1,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  },
                  {
                    "type": "text",
                    "text": " - Log in to Volunteer Impact to log your hours.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Past Hell Yeah Award Winners",
                    "format": 1,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  },
                  {
                    "type": "text",
                    "text": " - Each month, we recognize a volunteer who has gone above and beyond expectations in support of CHIRP. Here is a list of past winners!",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Production Studio calendar",
                    "format": 1,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  },
                  {
                    "type": "text",
                    "text": " - Use this calendar to book the production studio for a DJ audition, for Production work, or for Features work. Book multiple consecutive events for time over 60 minutes.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Review Tracker App",
                    "format": 1,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  },
                  {
                    "type": "text",
                    "text": " - Sign up for albums to review here.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Setting Up the CHIRP Tent",
                    "format": 1,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  },
                  {
                    "type": "text",
                    "text": " - Here's a short video to show you the basic setup for the CHIRP tent. You can just reverse engineer it to take it down. This video will show you about attaching the back wall, but it's pretty self explanatory with the velcro connectors that attach to the frame. Please be gentle when setting up or taking down the tent -- never force anything!",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Social Media Post Request Form",
                    "format": 1,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  },
                  {
                    "type": "text",
                    "text": " - When you'd like something posted on one (or more) of CHIRP's social media assets (Facebook, Twitter, Instagram) or in the newsletter, use this form to submit the details. Be sure to give plenty of notice.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Staff Ticket Sign-up",
                    "format": 1,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  },
                  {
                    "type": "text",
                    "text": " - Sign up here for available CHIRP staff tickets to upcoming shows. Remember to limit sign-ups to one per 30 days!",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none"
      },
      {
        "blockType": "contentCard",
        "title": "Mailing Lists",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Here are links to all of the CHIRP Radio Mailing Lists.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "CHIRP DJ list",
                    "format": 1,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  },
                  {
                    "type": "text",
                    "text": " - This is the list for all active CHIRP DJs, weekly and sub.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "CHIRP Features list",
                    "format": 1,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  },
                  {
                    "type": "text",
                    "text": " - This is the list for volunteers interested in conducting and producing artist interviews.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "CHIRP Marketing and Outreach list",
                    "format": 1,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  },
                  {
                    "type": "text",
                    "text": " - This is the list for volunteers interested in working on marketing, design, and outreach projects.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "CHIRP Production list",
                    "format": 1,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  },
                  {
                    "type": "text",
                    "text": " - This is a group for volunteers interested in producing, mixing, voicing, or recording projects, including station promos, podcasts, and special features.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "CHIRP Record Fair list",
                    "format": 1,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  },
                  {
                    "type": "text",
                    "text": " - This is the list for volunteers interested in working on the CHIRP Record Fairs.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Main Volunteer Mailing List",
                    "format": 1,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  },
                  {
                    "type": "text",
                    "text": " - The mailing list for all general CHIRP news and station business.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none"
      },
      {
        "blockType": "contentCard",
        "title": "DJ Items",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "These links relate to DJ training sessions, helpful resources, and collaborative Spotify playlists.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "CHIRP DJ 202 - engineering, on-air presentation, and programming your show",
                    "format": 1,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  },
                  {
                    "type": "text",
                    "text": " - This is the general discussion portion of the DJ202 session, covering topics relating to engineering, on-air presentation, and programming your show.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "CHIRP DJ202 - Advanced Techniques with Spotify, Traktor, and the DJDB",
                    "format": 1,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  },
                  {
                    "type": "text",
                    "text": " - This is a run-through of advanced techniques for playing single tracks, building collaborative playlists, searching and identifying label information in Spotify, setting cue points and searching in Traktor, and using filters in the DJDB.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "How to cue in Traktor when something is playing on the other deck",
                    "format": 1,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  },
                  {
                    "type": "text",
                    "text": " - Here's a video from Mike Nikolich made to show how to cue something in Traktor when you've already got a track playing on the other deck. Thanks, Mike!",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Show resources",
                    "format": 1,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  },
                  {
                    "type": "text",
                    "text": " - Upcoming show listings, local news, events, and music reviews, weather, and general info to help enhance your show.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none"
      }
    ],
    "sidebarContentType": "none"
  },
  {
    "title": "Volunteer Downloads",
    "slug": "volunteer-downloads",
    "excerpt": "Access essential documents, forms, guides, and resources for CHIRP volunteers including production guides, marketing materials, and DJ forms.",
    "layout": [
      {
        "blockType": "contentCard",
        "title": "Volunteer Downloads",
        "titleTag": "h1",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Access essential documents, forms, guides, and resources for CHIRP volunteers. From production guides to marketing materials, DJ forms to legal documents — everything you need to support your volunteer work is here.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none"
      },
      {
        "blockType": "contentCard",
        "title": "Production processes, instructions, and tips",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Instructions, tips, and guides relating to production-related tasks",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "list",
                "listType": "bullet",
                "start": 1,
                "tag": "ul",
                "children": [
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "Field Recorder checkout process",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 1
                  },
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "Field recorder use with built-in mics",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 2
                  },
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "Field recorder use with shotgun mic",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 3
                  },
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "Field recorder use with standard mic",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 4
                  },
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "First Time event-recording procedures",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 5
                  },
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "Why You're Doing Audio Levels Wrong, and Why It Really Does Matter (Current.org)",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 6
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none"
      },
      {
        "blockType": "contentCard",
        "title": "Marketing, Partnerships, and Sponsorships",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Media kit, partnership and DJ services info, sponsorship packages, etc.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "list",
                "listType": "bullet",
                "start": 1,
                "tag": "ul",
                "children": [
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "Street Team Tips",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 1
                  },
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "Tabling for CHIRP: Everything You Need To Know",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 2
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none"
      },
      {
        "blockType": "contentCard",
        "title": "Skills and Tips",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Articles on improving your skills and other interesting topics.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "list",
                "listType": "bullet",
                "start": 1,
                "tag": "ul",
                "children": [
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "Getting Over the Fear of Asking for Donations (from grassrootsfundraising.org)",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 1
                  },
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "Great DJ Tips",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 2
                  },
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "Interview Questions to Avoid - wisdom from Brendan Kelly of the Lawrence Arms",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 3
                  },
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "Tabling for CHIRP: Everything You Need To Know",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 4
                  },
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "Ways to Promote via Social Media (from airmedia.org)",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                "indent": 0,
                    "version": 1,
                    "value": 5
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none"
      },
      {
        "blockType": "contentCard",
        "title": "HR Documents",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Policy manuals and other documents",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "list",
                "listType": "bullet",
                "start": 1,
                "tag": "ul",
                "children": [
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "CHIRP Policy Manual",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none"
      },
      {
        "blockType": "contentCard",
        "title": "Volunteer Files",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Files for new volunteers to learn about how CHIRP works.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "list",
                "listType": "bullet",
                "start": 1,
                "tag": "ul",
                "children": [
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "CHIRP Guidelines for Photography",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 1
                  },
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "CHIRP Script Standards",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 2
                  },
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "CHIRP Talking Points",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 3
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none"
      },
      {
        "blockType": "contentCard",
        "title": "Fundraising Information and Donation Forms",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Here, you'll find forms for people who want to donate items to CHIRP, or who would like to make monetary donations offline.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "list",
                "listType": "bullet",
                "start": 1,
                "tag": "ul",
                "children": [
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "Getting Over the Fear of Asking for Donations (from grassrootsfundraising.org)",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 1
                  },
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "In-Kind Donation Form & Instructions",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 2
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none"
      },
      {
        "blockType": "contentCard",
        "title": "Legal Documents",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Important legal documents and agreements for CHIRP volunteers.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none"
      },
      {
        "blockType": "contentCard",
        "title": "Flyers/Postcards",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "We'll keep an updated list of files you can download and print out to help promote CHIRP events.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none"
      },
      {
        "blockType": "contentCard",
        "title": "DJ Forms",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Shift applications and more...",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "list",
                "listType": "bullet",
                "start": 1,
                "tag": "ul",
                "children": [
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "CHIRP New DJ Application",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 1
                  },
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "DJ Rig Operating Instructions",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 2
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none"
      },
      {
        "blockType": "contentCard",
        "title": "Logos",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "These are various logos for CHIRP Radio and the Chicago Independent Radio Project.",
                    "format": 0,
                    "detail": 0,
                    "mode": "normal",
                    "style": "",
                    "version": 1
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              },
              {
                "type": "list",
                "listType": "bullet",
                "start": 1,
                "tag": "ul",
                "children": [
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "CHIRP horizontal broadcast logo PDF",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 1
                  },
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "CHIRP Record Album Logo PDF",
                        "format": 0,
                        "detail": 0,
                        "mode": "normal",
                        "style": "",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "value": 2
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "version": 1
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none"
      }
    ],
    "sidebarContentType": "none"
  },
  {
    "title": "Other Ways to Give",
    "slug": "other-ways-to-give",
    "excerpt": "Discover various ways to support CHIRP Radio beyond direct donations.",
    "layout": [
      {
        "blockType": "contentCard",
        "preheader": "DONATE TO CHIRP",
        "title": "Other Ways to Give",
        "titleTag": "h1",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Nulla vitae elit libero, a pharetra augue. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas sed diam eget risus varius blandit sit amet non ipsum. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Curabitur blandit tempus porttitor ligula. Cras mattis consectetur purus sit amet fermentum."
                  }
                ]
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur. Integer posuere erat a ante venenatis."
                  }
                ]
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "right",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Support Chirp When You Shop",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Bookmark the following links and use them all year long when you shop. A portion of your sale price will be donated directly to CHIRP!"
                  }
                ]
              },
              {
                "type": "list",
                "listType": "bullet",
                "start": 1,
                "tag": "ul",
                "children": [
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "eBay"
                      }
                    ]
                  },
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "Paypal Giving Fund"
                      }
                    ]
                  },
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "Amazon (While Amazon has discontinued their Smile charitable giving program, their affiliate program remains active. Click this link and shop and CHIRP may receive as much as 8% of your purchase through Amazon Associates from the Amazon home page. There will not be a mention of CHIRP.)"
                      }
                    ]
                  }
                ]
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Wishlist / In-Kind Donations",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "CHIRP can always use donations of the following items:"
                  }
                ]
              },
              {
                "type": "list",
                "listType": "bullet",
                "start": 1,
                "tag": "ul",
                "children": [
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "white paper"
                      }
                    ]
                  },
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "printer cartridges"
                      }
                    ]
                  },
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "padded mailing envelopes in various sizes (unused)"
                      }
                    ]
                  },
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "packing tape"
                      }
                    ]
                  },
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "office/office supplies"
                      }
                    ]
                  },
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "cleaning supplies (paper towels, wax, windex, etc.)"
                      }
                    ]
                  },
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "coffee"
                      }
                    ]
                  },
                  {
                    "type": "listitem",
                    "children": [
                      {
                        "type": "text",
                        "text": "monetary gifts or gift cards"
                      }
                    ]
                  }
                ]
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Contact us for information about specific needs. Thanks so much."
                  }
                ]
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Donate Your Records, CDs, DVDs",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Have you been thinking of getting rid of your collection of old records, CDs, or DVDs? We have a solution! You can donate your unwanted music and movies to CHIRP Radio for up some space and support your favorite radio station! We can even arrange a pick-up. If you would like to donate your vinyl or other collection to CHIRP, please email our Record Fair team."
                  }
                ]
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1512733596533-7b00ccf8ebaf?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Donate Your Vehicle",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Have an old car, truck, boat, or motorcycle sitting around in your garage? Why not donate it to CHIRP? It doesn't even have to run, and you can get a tax deduction! Towing and title transfer is all taken care of for you. Find out more about donating your vehicle to CHIRP."
                  }
                ]
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Donate Bitcoin / Cryptocurrencies",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "1. Go to crypto.chirpradio.us"
                  }
                ]
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "2. Pick Chicago Independent Radio Project (CHIRP Radio) from the list."
                  }
                ]
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "3. Donate crypto and get a tax receipt!"
                  }
                ]
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Donations of appreciated cryptocurrency don't trigger capital gains taxes, and may be tax-deductible for the full value."
                  }
                ]
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "none",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=600&fit=crop"
      },
      {
        "blockType": "contentCard",
        "title": "Join the Vinyl Circle",
        "titleTag": "h2",
        "content": {
          "root": {
            "type": "root",
            "children": [
              {
                "type": "paragraph",
                "children": [
                  {
                    "type": "text",
                    "text": "Become a member of our major donor program, CHIRP's Vinyl Circle, with a tax-deductible donation and you'll join a network of people who are committed to keeping volunteer-driven, local radio a vibrant part of our community. You can find a list of giving levels and benefits here."
                  }
                ]
              }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
          }
        },
        "imagePosition": "right",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?w=800&h=800&fit=crop"
      }
    ],
    "sidebarAnnouncementId": 6,
    "sidebarContentType": "events",
    "sidebarAdvertisementId": 4
  },
  {
    "title": "Volunteer Calendar",
    "slug": "volunteer-calendar",
    "excerpt": "Stay up to date with CHIRP volunteer events, training sessions, and community gatherings.",
    "layout": [],
    "sidebarAnnouncementId": 1,
    "sidebarContentType": "events",
    "sidebarAdvertisementId": 4
  }
]

  // Get all announcements and advertisements once (sorted by creation order)
  const { docs: allAnnouncements } = await payload.find({
    collection: 'announcements',
    limit: 100,
    sort: 'createdAt',
  })
  const { docs: allAdvertisements } = await payload.find({
    collection: 'advertisements',
    limit: 100,
    sort: 'createdAt',
  })

  for (const page of pages) {
    // Extract sidebar IDs from the page data
    const { sidebarAnnouncementId, sidebarAdvertisementId, ...pageData } = page

    // Map the numeric IDs to actual document IDs
    const sidebarAnnouncement = sidebarAnnouncementId ? allAnnouncements[sidebarAnnouncementId - 1]?.id : undefined
    const sidebarAdvertisement = sidebarAdvertisementId ? allAdvertisements[sidebarAdvertisementId - 1]?.id : undefined

    await payload.create({
      collection: 'pages',
      data: {
        ...pageData,
        sidebarAnnouncement,
        sidebarAdvertisement,
      },
    })
    console.log(`  ✓ ${page.title}`)
  }
}
