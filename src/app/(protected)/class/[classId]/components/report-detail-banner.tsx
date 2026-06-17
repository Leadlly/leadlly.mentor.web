import React from "react";
import {
  formatCompetitiveExamLabel,
  formatStandardLabel,
} from "@/helpers/constants/academic";

type ReportDetailBannerProps = {
  batchName?: string;
  subject?: string;
  standard?: string | number | null;
  competitiveExam?: string | null;
};

const ReportDetailBanner = ({
  batchName,
  subject,
  standard,
  competitiveExam,
}: ReportDetailBannerProps) => {
  if (!batchName && !subject) return null;

  return (
    <div className="bg-gradient-to-r from-[#FAF5FF] via-white to-[#FFF7ED] border border-[#F2E0FF] rounded-2xl md:rounded-[24px] px-4 py-4 md:px-6 md:py-5 shadow-sm">
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 capitalize tracking-tight">
        {batchName || "Batch"}
      </h1>
      <div className="flex flex-wrap items-center gap-2 mt-2">
        {subject ? (
          <span className="text-sm md:text-base text-gray-600 font-semibold capitalize">
            {subject}
          </span>
        ) : null}
        {standard != null && standard !== "" ? (
          <span className="px-2.5 py-1 rounded-full text-[11px] md:text-xs font-bold bg-white border border-gray-200 text-gray-700">
            Standard {formatStandardLabel(standard)}
          </span>
        ) : null}
        {competitiveExam ? (
          <span className="px-2.5 py-1 rounded-full text-[11px] md:text-xs font-bold uppercase tracking-wide bg-purple-100 text-purple-700">
            {formatCompetitiveExamLabel(competitiveExam)}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default ReportDetailBanner;
