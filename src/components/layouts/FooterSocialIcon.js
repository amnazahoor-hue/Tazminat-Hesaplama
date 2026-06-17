import { FaLinkedin } from "react-icons/fa6";
import {
  SiFacebook,
  SiInstagram,
  SiPinterest,
  SiQuora,
  SiReddit,
  SiX,
  SiYoutube
} from "react-icons/si";

function withIconSize(Icon) {
  return function FooterSocialIcon({ size = 15 }) {
    return <Icon size={size} aria-hidden="true" />;
  };
}

export const FOOTER_SOCIAL_ICON_MAP = {
  "social-facebook": withIconSize(SiFacebook),
  "social-instagram": withIconSize(SiInstagram),
  "social-linkedin": withIconSize(FaLinkedin),
  "social-youtube": withIconSize(SiYoutube),
  "social-x": withIconSize(SiX),
  "social-twitter": withIconSize(SiX),
  "social-pinterest": withIconSize(SiPinterest),
  "social-reddit": withIconSize(SiReddit),
  "social-quora": withIconSize(SiQuora)
};
