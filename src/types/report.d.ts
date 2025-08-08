declare namespace App.Types.Report {
  type ReportResponse = {
    id: string;
    title: string;
    reason: string;
    reportableModel: "review" | "comment";
    reportableId: string;
    resolvedActions: string[];
  };

  type ReportCreate = {
    reportableModel: "review" | "comment";
    reportableId: string;
    title: string;
    reason: string;
  };

  type ReportResolve = {
    resolvedActions: string[];
  };
}