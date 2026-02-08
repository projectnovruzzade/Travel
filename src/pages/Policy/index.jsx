import Logo from "../../components/Logo";
import usePageTitle from "../../hooks/usePageTitle";
import "./style.scss";
import "../../components/components.scss"

const Policy = () => {
  usePageTitle("Terms & Privacy Policy");

  return (
    <div id="policy-page">
      <div className="policy-logo">
        <Logo />
      </div>

      <div className="policy-content">
        <section className="policy-section">
          <h1 className="policy-title">Terms & Conditions</h1>
          <p className="policy-date">Last Updated: January 20, 2026</p>

          <p className="policy-intro">
            By using Travelia, you agree to the following terms:
          </p>

          <ol className="policy-list">
            <li>
              Nature of Service: Travelia is an AI-powered digital travel guide.
              All itineraries and suggestions are provided for informational and
              recommendation purposes only.
            </li>
            <li>
              Accuracy Disclaimer: Information such as opening hours, entrance
              fees, and availability of venues may change without notice.
              Travelia does not guarantee 100% accuracy of the data.
            </li>
            <li>
              Limitation of Liability: Travelia shall not be held liable for any
              incidents, financial losses, or accidents occurring during your
              travels. Users are responsible for their own safety and compliance
              with local laws.
            </li>
            <li>
              <>Third Parties:</> Recommendations involving third-party services
              (e.g., hotels, transport, booking platforms) are independent of
              Travelia. We are not responsible for their service quality or
              actions.
            </li>
          </ol>
        </section>

        <section className="policy-section">
          <h2 className="policy-title">
            Privacy Policy Travelia values your privacy:
          </h2>

          <ol className="policy-list">
            <li>
              Data Collection: We only collect the preferences you provide
              (city, budget, interests) and technical device info to generate
              personalized travel plans.
            </li>
            <li>
              Purpose of Use: Your data is used exclusively to improve AI
              recommendations and your overall user experience.
            </li>
            <li>
              Data Protection: We do not sell or share your personal information
              with third parties for marketing purposes.
            </li>
          </ol>
        </section>
      </div>
    </div>
  );
};

export default Policy;
