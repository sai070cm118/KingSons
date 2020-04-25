
export interface IApp {
    Id?: number;
    Name?: string;
    Description?: string;
    AppKey?: string;
    PublicKey?: string;
    IsActive?: boolean;
  }


  export interface IAppUser {
    Id?: number;
    AppId?: number;
    UserName?: string;
    FirstName?: string;
    LastName?: string;
    ProfilePic?: string;
    CreatedOn?: Date;
    Password?: string;
    Email?: string;
    IsEmailVerified?: boolean;
    Mobile?: string;
    IsMobileVerified?: boolean;
    IsActive?: boolean;
    InActiveOn?: Date;
    InActiveReason?: string;
  }

  export interface IAppModel {
    Id?: number;
    Name?: string;
    Description?: string;
    AppKey?: string;
    PublicKey?: string;
    IsActive?: boolean;
  }

  export interface IException {
    Id?: number;
    AppId?: number;
    LogDate?: Date;
    ExMessage?: string;
    Exception?: string;
    Controller?: string;
    Action?: string;
    User?: string;
  }

  export interface IAuditLog {
    Id?: number;
    AppId?: number;
    LogDate?: Date;
    Type?: string;
    Message?: string;
    User?: string;
  }

  export interface ICustomError {
    Id?: number;
    AppId?: number;
    Code?: Date;
    Message?: string;
    Description?: string;
    IsError?: string;
    ForUser?: string;
  }

  export interface ISettings {
    Id?: number;
    AppId?: number;
    Name?: Date;
    Value?: string;
  }

  export interface IDatabases {
    Id?: number;
    AppId?: number;
    Dsscription?: string;
    Server?: string;
    Name?: string;
    UserId?: string;
    Password?: string;
    Details?: string;
  }


  export interface IProcedures {
    Id?: number;
    AppId?: number;
    DatabaseName?: string;
    DatabaseId?: number;
    Name?: string;
  }

  export interface IProcedureParams {
    Id?: number;
    AppId?: number;
    AppProcedureId?: number;
    Name?: string;
    MapProperty?: string;
    Type?: string;
    Size?: number;
    Is_Out?: boolean;
    Is_Nullable?: boolean;
  }


  export interface IRoutes {
    Id?: number;
    AppId?: number;
    Group?: string;
    Route?: string;
    BusinessLogicMethod?: string;
    Is_Custom_BusinessLogic?: boolean;
    ProcedureId?: number;
    ProcedureName?: number;
    EditType?: string;
    RequireAuth?: boolean;
    IsSocket?: boolean;
    ResponseType?: number;
    IsChecked?: boolean;
  }

  export interface IRole {
    Id?: number;
    AppId?: number;
    Role?: string;
    IsCustom?: boolean;
    HasAccess?: boolean;
  }

  export interface IEmailTemplate {
    Id?: number;
    AppId?: number;
    Name?: string;
    Template?: string;
  }
