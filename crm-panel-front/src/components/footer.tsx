import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-inner">
          <div className="h-100 pt-3 border-t-1 brc-secondary-l3 bgc-white">
            <span className="text-primary-m2 font-bolder text-120">
              Sepanta
            </span>
            <span className="text-muted"> © 2022</span>
            <span className="mx-3 action-buttons">
              <a
                href="https://www.instagram.com/sepantacom/"
                className="text-140 text-pink"
              >
                <FontAwesomeIcon icon={["fab", "instagram"]} />
              </a>{" "}
              <a
                href="https://www.linkedin.com/company/%D9%87%D8%A7%D8%B3%D8%AA%DB%8C%D9%86%DA%AF-%D8%B4%DB%8C%D8%B1%D9%BE%D9%88%DB%8C%D9%86%D8%AA-%D8%B3%D9%BE%D9%86%D8%AA%D8%A7/"
                className="text-blue-d1 text-140"
              >
                <FontAwesomeIcon icon={["fab", "linkedin"]} />
              </a>{" "}
              <a
                href="https://t.me/SNSsepanta"
                className="text-blue-l1 text-140"
              >
                <FontAwesomeIcon icon={["fab", "telegram"]} />
              </a>
            </span>
          </div>
        </div>
      </footer>
      <div className="footer-tools">
        <Button
          variant="white"
          href="#"
          className="btn-scroll-up brc-black-tp7 px-25 py-2 text-95 border-2 radius-round mb-2 mr-2"
        >
          <FontAwesomeIcon icon="angle-double-up" className="w-2 h-2" />
        </Button>
      </div>
    </>
  );
}
