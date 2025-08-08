declare namespace App.Services.Report {
  type reportFilters = PaginatedFilters & {
    reportableModel?: "review" | "comment";
    reportableId?: string;
  }

  type createReport = (data: App.Types.Report.ReportCreate) => Response<App.Types.Report.ReportResponse>;
  type getReports = (params: reportFilters) => PaginatedResponse<App.Types.Report.ReportResponse>;
  type resolveReport = (id: string, data: App.Types.Report.ReportResolve) => Response<App.Types.Report.ReportResponse>;
}