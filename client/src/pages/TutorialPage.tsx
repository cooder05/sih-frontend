import { useTranslation } from "react-i18next";
import SplitText from '../components/ui/SplitText';
const TutorialPage = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-24 p-8 max-w-4xl mx-auto text-muted-foreground bg-dark-bg min-h-screen">
      <SplitText
        text={t("how_to_use")}
        className="text-4xl md:text-5xl font-bold text-royal-gold mb-6"
        delay={80}
        duration={0.6}
        tag="h1"
        textAlign="center"
      />
      <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
        {t("homepage_about")}
      </p>

      {/* Step 1 */}
      <div className="p-6 bg-ocean-blue/20 rounded-lg border border-ocean-blue mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-3">{t("step1")}</h2>
        <p className="mb-2">{t("step1_desc")}</p>
        <ol className="list-decimal list-inside space-y-2">
          <li>{t("step1_list1")}</li>
          <li>{t("step1_list2")}</li>
          <li>{t("step1_list3")}</li>
          <li>{t("step1_list4")}</li>
        </ol>
      </div>

      {/* Step 2 */}
      <div className="p-6 bg-deep-teal/20 rounded-lg border border-deep-teal mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-3">{t("step2")}</h2>
        <p className="mb-2">{t("step2_desc")}</p>
        <ol className="list-decimal list-inside space-y-2">
          <li>{t("step2_list1")}</li>
          <li>{t("step2_list2")}</li>
          <li className="ml-4">{t("step2_list3")}</li>
          <li className="ml-4">{t("step2_list4")}</li>
          <li>{t("step2_list5")}</li>
        </ol>
      </div>

      {/* Step 3 */}
      <div className="p-6 bg-primary/20 rounded-lg border border-primary mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-3">{t("step3")}</h2>
        <p className="mb-4">{t("step3_desc")}</p>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 bg-yellow-500 rounded-full"></span>
            <span>{t("pending")}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 bg-green-500 rounded-full"></span>
            <span>{t("verified")}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 bg-red-500 rounded-full"></span>
            <span>{t("urgent")}</span>
          </div>
        </div>
      </div>

      {/* Safety Guidelines */}
      <div className="p-6 bg-muted/20 rounded-lg border border-border mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-3">{t("safety_guidelines")}</h2>
        <div className="space-y-3">
          <p>{t("personal_safety")}</p>
          <p>{t("emergency_situations")}</p>
          <p>{t("location_privacy")}</p>
          <p>{t("evidence_guidelines")}</p>
        </div>
      </div>

      {/* Types of Incidents */}
      <div className="p-6 bg-destructive/20 rounded-lg border border-destructive mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-3">{t("incidents_to_report")}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="font-bold text-foreground mb-2">{t("marine_hazards")}</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>{t("marine_hazards1")}</li>
              <li>{t("marine_hazards2")}</li>
              <li>{t("marine_hazards3")}</li>
              <li>{t("marine_hazards4")}</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-2">{t("natural_disasters")}</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>{t("natural_disasters1")}</li>
              <li>{t("natural_disasters2")}</li>
              <li>{t("natural_disasters3")}</li>
              <li>{t("natural_disasters4")}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center p-8 bg-card/50 rounded-lg border border-card-border">
        <h2 className="text-2xl font-bold text-royal-gold mb-4">{t("ready_to_make_difference")}</h2>
        <p className="text-foreground mb-6 text-lg">{t("join_guardians")}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/report"
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover-elevate transition-all duration-300"
            data-testid="button-start-reporting"
          >
            {t("start_reporting_now")}
          </a>
          <a
            href="/map"
            className="bg-ocean-blue text-white px-8 py-3 rounded-lg font-semibold hover-elevate transition-all duration-300"
            data-testid="button-explore-map"
          >
            {t("explore_map")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default TutorialPage;