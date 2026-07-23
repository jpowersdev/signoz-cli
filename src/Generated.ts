import * as Data from "effect/Data"
import * as Effect from "effect/Effect"
import type { SchemaError } from "effect/Schema"
import * as Schema from "effect/Schema"
import * as SchemaGetter from "effect/SchemaGetter"
import type * as HttpClient from "effect/unstable/http/HttpClient"
import * as HttpClientError from "effect/unstable/http/HttpClientError"
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest"
import * as HttpClientResponse from "effect/unstable/http/HttpClientResponse"
// non-recursive definitions
export type AlertmanagertypesChannel = { readonly "createdAt"?: string, readonly "data": string, readonly "id": string, readonly "name": string, readonly "orgId": string, readonly "type": string, readonly "updatedAt"?: string }
export const AlertmanagertypesChannel = Schema.Struct({ "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "data": Schema.String, "id": Schema.String, "name": Schema.String, "orgId": Schema.String, "type": Schema.String, "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })) })
export type AlertmanagertypesExpressionKind = "rule" | "policy"
export const AlertmanagertypesExpressionKind = Schema.Literals(["rule", "policy"])
export type AlertmanagertypesMaintenanceKind = "fixed" | "recurring"
export const AlertmanagertypesMaintenanceKind = Schema.Literals(["fixed", "recurring"])
export type AlertmanagertypesMaintenanceStatus = "active" | "upcoming" | "expired"
export const AlertmanagertypesMaintenanceStatus = Schema.Literals(["active", "upcoming", "expired"])
export type AlertmanagertypesRepeatType = "daily" | "weekly" | "monthly"
export const AlertmanagertypesRepeatType = Schema.Literals(["daily", "weekly", "monthly"])
export type AuthtypesAttributeMapping = { readonly "email"?: string, readonly "groups"?: string, readonly "name"?: string, readonly "role"?: string }
export const AuthtypesAttributeMapping = Schema.Struct({ "email": Schema.optionalKey(Schema.String), "groups": Schema.optionalKey(Schema.String), "name": Schema.optionalKey(Schema.String), "role": Schema.optionalKey(Schema.String) })
export type AuthtypesAuthNProvider = "google_auth" | "saml" | "email_password" | "oidc"
export const AuthtypesAuthNProvider = Schema.Literals(["google_auth", "saml", "email_password", "oidc"])
export type AuthtypesAuthNProviderInfo = { readonly "relayStatePath"?: string | null }
export const AuthtypesAuthNProviderInfo = Schema.Struct({ "relayStatePath": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type AuthtypesDeprecatedPostableUserRole = { readonly "id": string }
export const AuthtypesDeprecatedPostableUserRole = Schema.Struct({ "id": Schema.String })
export type AuthtypesGettableRole = { readonly "createdAt"?: string, readonly "description": string, readonly "id": string, readonly "name": string, readonly "orgId": string, readonly "type": string, readonly "updatedAt"?: string }
export const AuthtypesGettableRole = Schema.Struct({ "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "description": Schema.String, "id": Schema.String, "name": Schema.String, "orgId": Schema.String, "type": Schema.String, "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })) })
export type AuthtypesGettableToken = { readonly "accessToken"?: string, readonly "expiresIn"?: number, readonly "refreshToken"?: string, readonly "tokenType"?: string }
export const AuthtypesGettableToken = Schema.Struct({ "accessToken": Schema.optionalKey(Schema.String), "expiresIn": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "refreshToken": Schema.optionalKey(Schema.String), "tokenType": Schema.optionalKey(Schema.String) })
export type AuthtypesGoogleConfig = { readonly "allowedGroups"?: ReadonlyArray<string>, readonly "clientId"?: string, readonly "clientSecret"?: string, readonly "domainToAdminEmail"?: { readonly [x: string]: string }, readonly "fetchGroups"?: boolean, readonly "fetchTransitiveGroupMembership"?: boolean, readonly "insecureSkipEmailVerified"?: boolean, readonly "redirectURI"?: string, readonly "serviceAccountJson"?: string }
export const AuthtypesGoogleConfig = Schema.Struct({ "allowedGroups": Schema.optionalKey(Schema.Array(Schema.String)), "clientId": Schema.optionalKey(Schema.String), "clientSecret": Schema.optionalKey(Schema.String), "domainToAdminEmail": Schema.optionalKey(Schema.Record(Schema.String, Schema.String)), "fetchGroups": Schema.optionalKey(Schema.Boolean), "fetchTransitiveGroupMembership": Schema.optionalKey(Schema.Boolean), "insecureSkipEmailVerified": Schema.optionalKey(Schema.Boolean), "redirectURI": Schema.optionalKey(Schema.String), "serviceAccountJson": Schema.optionalKey(Schema.String) })
export type AuthtypesPostableEmailPasswordSession = { readonly "email"?: string, readonly "orgId"?: string, readonly "password"?: string }
export const AuthtypesPostableEmailPasswordSession = Schema.Struct({ "email": Schema.optionalKey(Schema.String), "orgId": Schema.optionalKey(Schema.String), "password": Schema.optionalKey(Schema.String) })
export type AuthtypesPostableRotateToken = { readonly "refreshToken"?: string }
export const AuthtypesPostableRotateToken = Schema.Struct({ "refreshToken": Schema.optionalKey(Schema.String) })
export type AuthtypesPostableUserRole = { readonly "roleId": string, readonly "userId": string }
export const AuthtypesPostableUserRole = Schema.Struct({ "roleId": Schema.String, "userId": Schema.String })
export type AuthtypesRelation = "create" | "read" | "update" | "delete" | "list" | "assignee" | "attach" | "detach"
export const AuthtypesRelation = Schema.Literals(["create", "read", "update", "delete", "list", "assignee", "attach", "detach"])
export type AuthtypesRoleMapping = { readonly "defaultRole"?: string, readonly "groupMappings"?: {  }, readonly "useRoleAttribute"?: boolean }
export const AuthtypesRoleMapping = Schema.Struct({ "defaultRole": Schema.optionalKey(Schema.String), "groupMappings": Schema.optionalKey(Schema.Union([Schema.Struct({  })])), "useRoleAttribute": Schema.optionalKey(Schema.Boolean) })
export type CloudintegrationtypesAWSAccountConfig = { readonly "regions": ReadonlyArray<string> }
export const CloudintegrationtypesAWSAccountConfig = Schema.Struct({ "regions": Schema.Array(Schema.String) })
export type CloudintegrationtypesAWSCloudWatchLogsSubscription = { readonly "filterPattern": string, readonly "logGroupNamePrefix": string }
export const CloudintegrationtypesAWSCloudWatchLogsSubscription = Schema.Struct({ "filterPattern": Schema.String, "logGroupNamePrefix": Schema.String })
export type CloudintegrationtypesAWSCloudWatchMetricStreamFilter = { readonly "metricNames"?: ReadonlyArray<string>, readonly "namespace": string }
export const CloudintegrationtypesAWSCloudWatchMetricStreamFilter = Schema.Struct({ "metricNames": Schema.optionalKey(Schema.Array(Schema.String)), "namespace": Schema.String })
export type CloudintegrationtypesAWSConnectionArtifact = { readonly "connectionUrl": string }
export const CloudintegrationtypesAWSConnectionArtifact = Schema.Struct({ "connectionUrl": Schema.String })
export type CloudintegrationtypesAWSPostableAccountConfig = { readonly "deploymentRegion": string, readonly "regions": ReadonlyArray<string> }
export const CloudintegrationtypesAWSPostableAccountConfig = Schema.Struct({ "deploymentRegion": Schema.String, "regions": Schema.Array(Schema.String) })
export type CloudintegrationtypesAWSServiceLogsConfig = { readonly "enabled"?: boolean, readonly "s3Buckets"?: { readonly [x: string]: ReadonlyArray<string> } }
export const CloudintegrationtypesAWSServiceLogsConfig = Schema.Struct({ "enabled": Schema.optionalKey(Schema.Boolean), "s3Buckets": Schema.optionalKey(Schema.Record(Schema.String, Schema.Array(Schema.String))) })
export type CloudintegrationtypesAWSServiceMetricsConfig = { readonly "enabled"?: boolean }
export const CloudintegrationtypesAWSServiceMetricsConfig = Schema.Struct({ "enabled": Schema.optionalKey(Schema.Boolean) })
export type CloudintegrationtypesAgentReport = { readonly "data": {  }, readonly "timestampMillis": number }
export const CloudintegrationtypesAgentReport = Schema.Union([Schema.Struct({ "data": Schema.Union([Schema.Struct({  })]), "timestampMillis": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()) })])
export type CloudintegrationtypesAzureAccountConfig = { readonly "deploymentRegion": string, readonly "resourceGroups": ReadonlyArray<string> }
export const CloudintegrationtypesAzureAccountConfig = Schema.Struct({ "deploymentRegion": Schema.String, "resourceGroups": Schema.Array(Schema.String) })
export type CloudintegrationtypesAzureConnectionArtifact = { readonly "cliCommand": string, readonly "cloudPowerShellCommand": string }
export const CloudintegrationtypesAzureConnectionArtifact = Schema.Struct({ "cliCommand": Schema.String, "cloudPowerShellCommand": Schema.String })
export type CloudintegrationtypesAzureLogsCollectionStrategy = { readonly "categoryGroups": ReadonlyArray<string> }
export const CloudintegrationtypesAzureLogsCollectionStrategy = Schema.Struct({ "categoryGroups": Schema.Array(Schema.String) })
export type CloudintegrationtypesAzureMetricsCollectionStrategy = {  }
export const CloudintegrationtypesAzureMetricsCollectionStrategy = Schema.Struct({  })
export type CloudintegrationtypesAzureServiceLogsConfig = { readonly "enabled"?: boolean }
export const CloudintegrationtypesAzureServiceLogsConfig = Schema.Struct({ "enabled": Schema.optionalKey(Schema.Boolean) })
export type CloudintegrationtypesAzureServiceMetricsConfig = { readonly "enabled"?: boolean }
export const CloudintegrationtypesAzureServiceMetricsConfig = Schema.Struct({ "enabled": Schema.optionalKey(Schema.Boolean) })
export type CloudintegrationtypesCredentials = { readonly "ingestionKey": string, readonly "ingestionUrl": string, readonly "sigNozApiKey": string, readonly "sigNozApiUrl": string }
export const CloudintegrationtypesCredentials = Schema.Struct({ "ingestionKey": Schema.String, "ingestionUrl": Schema.String, "sigNozApiKey": Schema.String, "sigNozApiUrl": Schema.String })
export type CloudintegrationtypesDataCollected = { readonly "logs"?: ReadonlyArray<{ readonly "name"?: string, readonly "path"?: string, readonly "type"?: string }>, readonly "metrics"?: ReadonlyArray<{ readonly "description"?: string, readonly "name"?: string, readonly "type"?: string, readonly "unit"?: string }> }
export const CloudintegrationtypesDataCollected = Schema.Struct({ "logs": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "name": Schema.optionalKey(Schema.String), "path": Schema.optionalKey(Schema.String), "type": Schema.optionalKey(Schema.String) }))])), "metrics": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "description": Schema.optionalKey(Schema.String), "name": Schema.optionalKey(Schema.String), "type": Schema.optionalKey(Schema.String), "unit": Schema.optionalKey(Schema.String) }))])) })
export type CloudintegrationtypesGCPAccountConfig = { readonly "deploymentProjectId": string, readonly "deploymentRegion": string, readonly "projectIds": ReadonlyArray<string> }
export const CloudintegrationtypesGCPAccountConfig = Schema.Struct({ "deploymentProjectId": Schema.String, "deploymentRegion": Schema.String, "projectIds": Schema.Array(Schema.String) })
export type CloudintegrationtypesGCPConnectionArtifact = {  }
export const CloudintegrationtypesGCPConnectionArtifact = Schema.Struct({  })
export type CloudintegrationtypesGCPIntegrationConfig = {  }
export const CloudintegrationtypesGCPIntegrationConfig = Schema.Struct({  })
export type CloudintegrationtypesGCPServiceLogsConfig = { readonly "enabled": boolean }
export const CloudintegrationtypesGCPServiceLogsConfig = Schema.Struct({ "enabled": Schema.Boolean })
export type CloudintegrationtypesGCPServiceMetricsConfig = { readonly "enabled": boolean }
export const CloudintegrationtypesGCPServiceMetricsConfig = Schema.Struct({ "enabled": Schema.Boolean })
export type CloudintegrationtypesOldAWSLogsStrategy = { readonly "cloudwatch_logs_subscriptions"?: ReadonlyArray<{ readonly "filter_pattern"?: string, readonly "log_group_name_prefix"?: string }> }
export const CloudintegrationtypesOldAWSLogsStrategy = Schema.Struct({ "cloudwatch_logs_subscriptions": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "filter_pattern": Schema.optionalKey(Schema.String), "log_group_name_prefix": Schema.optionalKey(Schema.String) }))])) })
export type CloudintegrationtypesOldAWSMetricsStrategy = { readonly "cloudwatch_metric_stream_filters"?: ReadonlyArray<{ readonly "MetricNames"?: ReadonlyArray<string>, readonly "Namespace"?: string }> }
export const CloudintegrationtypesOldAWSMetricsStrategy = Schema.Struct({ "cloudwatch_metric_stream_filters": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "MetricNames": Schema.optionalKey(Schema.Array(Schema.String)), "Namespace": Schema.optionalKey(Schema.String) }))])) })
export type CloudintegrationtypesPostableAgentCheckIn = { readonly "account_id"?: string, readonly "cloud_account_id"?: string, readonly "cloudIntegrationId"?: string, readonly "data": {  }, readonly "providerAccountId"?: string }
export const CloudintegrationtypesPostableAgentCheckIn = Schema.Struct({ "account_id": Schema.optionalKey(Schema.String), "cloud_account_id": Schema.optionalKey(Schema.String), "cloudIntegrationId": Schema.optionalKey(Schema.String), "data": Schema.Union([Schema.Struct({  })]), "providerAccountId": Schema.optionalKey(Schema.String) })
export type CloudintegrationtypesServiceID = "alb" | "api-gateway" | "dynamodb" | "ec2" | "ecs" | "eks" | "elasticache" | "lambda" | "msk" | "rds" | "s3sync" | "sns" | "sqs" | "storageaccountsblob" | "cdnprofile" | "virtualmachine" | "appservice" | "containerapp" | "aks" | "sqldatabase" | "sqldatabasemi" | "mysqlflexibleserver" | "postgresqlflexibleserver" | "mongodb" | "cosmosdb" | "cassandradb" | "redis" | "cloudsql_postgres" | "memorystore_redis"
export const CloudintegrationtypesServiceID = Schema.Literals(["alb", "api-gateway", "dynamodb", "ec2", "ecs", "eks", "elasticache", "lambda", "msk", "rds", "s3sync", "sns", "sqs", "storageaccountsblob", "cdnprofile", "virtualmachine", "appservice", "containerapp", "aks", "sqldatabase", "sqldatabasemi", "mysqlflexibleserver", "postgresqlflexibleserver", "mongodb", "cosmosdb", "cassandradb", "redis", "cloudsql_postgres", "memorystore_redis"])
export type CloudintegrationtypesServiceMetadata = { readonly "enabled": boolean, readonly "icon": string, readonly "id": string, readonly "title": string }
export const CloudintegrationtypesServiceMetadata = Schema.Struct({ "enabled": Schema.Boolean, "icon": Schema.String, "id": Schema.String, "title": Schema.String })
export type CloudintegrationtypesStorableIntegrationDashboard = { readonly "createdAt": string, readonly "dashboardId": string, readonly "id": string, readonly "provider": string, readonly "slug": string, readonly "updatedAt": string }
export const CloudintegrationtypesStorableIntegrationDashboard = Schema.Struct({ "createdAt": Schema.String.annotate({ "format": "date-time" }), "dashboardId": Schema.String, "id": Schema.String, "provider": Schema.String, "slug": Schema.String, "updatedAt": Schema.String.annotate({ "format": "date-time" }) })
export type CloudintegrationtypesSupportedSignals = { readonly "logs"?: boolean, readonly "metrics"?: boolean }
export const CloudintegrationtypesSupportedSignals = Schema.Struct({ "logs": Schema.optionalKey(Schema.Boolean), "metrics": Schema.optionalKey(Schema.Boolean) })
export type CloudintegrationtypesUpdatableAzureAccountConfig = { readonly "resourceGroups": ReadonlyArray<string> }
export const CloudintegrationtypesUpdatableAzureAccountConfig = Schema.Struct({ "resourceGroups": Schema.Array(Schema.String) })
export type CloudintegrationtypesUpdatableGCPAccountConfig = { readonly "deploymentProjectId": string, readonly "deploymentRegion": string, readonly "projectIds": ReadonlyArray<string> }
export const CloudintegrationtypesUpdatableGCPAccountConfig = Schema.Struct({ "deploymentProjectId": Schema.String, "deploymentRegion": Schema.String, "projectIds": Schema.Union([Schema.Array(Schema.String)]) })
export type CommonDisplay = { readonly "description"?: string, readonly "name"?: string }
export const CommonDisplay = Schema.Struct({ "description": Schema.optionalKey(Schema.String), "name": Schema.optionalKey(Schema.String) })
export type CommonJSONRef = { readonly "$ref"?: string }
export const CommonJSONRef = Schema.Struct({ "$ref": Schema.optionalKey(Schema.String) })
export type ConfigAuthorization = { readonly "credentials"?: string, readonly "credentials_file"?: string, readonly "credentials_ref"?: string, readonly "type"?: string }
export const ConfigAuthorization = Schema.Struct({ "credentials": Schema.optionalKey(Schema.String), "credentials_file": Schema.optionalKey(Schema.String), "credentials_ref": Schema.optionalKey(Schema.String), "type": Schema.optionalKey(Schema.String) })
export type ConfigBasicAuth = { readonly "password"?: string, readonly "password_file"?: string, readonly "password_ref"?: string, readonly "username"?: string, readonly "username_file"?: string, readonly "username_ref"?: string }
export const ConfigBasicAuth = Schema.Struct({ "password": Schema.optionalKey(Schema.String), "password_file": Schema.optionalKey(Schema.String), "password_ref": Schema.optionalKey(Schema.String), "username": Schema.optionalKey(Schema.String), "username_file": Schema.optionalKey(Schema.String), "username_ref": Schema.optionalKey(Schema.String) })
export type ConfigDuration = string
export const ConfigDuration = Schema.String.annotate({ "format": "int64" })
export type ConfigHeaders = {  }
export const ConfigHeaders = Schema.Struct({  })
export type ConfigHostPort = {  }
export const ConfigHostPort = Schema.Struct({  })
export type ConfigJiraFieldConfig = { readonly "enable_update"?: boolean | null, readonly "template"?: string }
export const ConfigJiraFieldConfig = Schema.Struct({ "enable_update": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "template": Schema.optionalKey(Schema.String) })
export type ConfigMattermostField = { readonly "short"?: boolean | null, readonly "title"?: string, readonly "value"?: string }
export const ConfigMattermostField = Schema.Struct({ "short": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "title": Schema.optionalKey(Schema.String), "value": Schema.optionalKey(Schema.String) })
export type ConfigMattermostPriority = { readonly "persistent_notifications"?: boolean, readonly "priority"?: string, readonly "requested_ack"?: boolean }
export const ConfigMattermostPriority = Schema.Struct({ "persistent_notifications": Schema.optionalKey(Schema.Boolean), "priority": Schema.optionalKey(Schema.String), "requested_ack": Schema.optionalKey(Schema.Boolean) })
export type ConfigMattermostProps = { readonly "card"?: string }
export const ConfigMattermostProps = Schema.Struct({ "card": Schema.optionalKey(Schema.String) })
export type ConfigOpsGenieConfigResponder = { readonly "id"?: string, readonly "name"?: string, readonly "type"?: string, readonly "username"?: string }
export const ConfigOpsGenieConfigResponder = Schema.Struct({ "id": Schema.optionalKey(Schema.String), "name": Schema.optionalKey(Schema.String), "type": Schema.optionalKey(Schema.String), "username": Schema.optionalKey(Schema.String) })
export type ConfigPagerdutyImage = { readonly "alt"?: string, readonly "href"?: string, readonly "src"?: string }
export const ConfigPagerdutyImage = Schema.Struct({ "alt": Schema.optionalKey(Schema.String), "href": Schema.optionalKey(Schema.String), "src": Schema.optionalKey(Schema.String) })
export type ConfigPagerdutyLink = { readonly "href"?: string, readonly "text"?: string }
export const ConfigPagerdutyLink = Schema.Struct({ "href": Schema.optionalKey(Schema.String), "text": Schema.optionalKey(Schema.String) })
export type ConfigProxyHeader = { readonly [x: string]: ReadonlyArray<string> }
export const ConfigProxyHeader = Schema.Record(Schema.String, Schema.Array(Schema.String))
export type ConfigRocketchatAttachmentAction = { readonly "image_url"?: string, readonly "is_webview"?: boolean, readonly "msg"?: string, readonly "msg_in_chat_window"?: boolean, readonly "msg_processing_type"?: string, readonly "text"?: string, readonly "type"?: string, readonly "url"?: string, readonly "webview_height_ratio"?: string }
export const ConfigRocketchatAttachmentAction = Schema.Struct({ "image_url": Schema.optionalKey(Schema.String), "is_webview": Schema.optionalKey(Schema.Boolean), "msg": Schema.optionalKey(Schema.String), "msg_in_chat_window": Schema.optionalKey(Schema.Boolean), "msg_processing_type": Schema.optionalKey(Schema.String), "text": Schema.optionalKey(Schema.String), "type": Schema.optionalKey(Schema.String), "url": Schema.optionalKey(Schema.String), "webview_height_ratio": Schema.optionalKey(Schema.String) })
export type ConfigRocketchatAttachmentField = { readonly "short"?: boolean | null, readonly "title"?: string, readonly "value"?: string }
export const ConfigRocketchatAttachmentField = Schema.Struct({ "short": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "title": Schema.optionalKey(Schema.String), "value": Schema.optionalKey(Schema.String) })
export type ConfigSecretURL = {  }
export const ConfigSecretURL = Schema.Struct({  })
export type ConfigSlackConfirmationField = { readonly "dismiss_text"?: string, readonly "ok_text"?: string, readonly "text"?: string, readonly "title"?: string }
export const ConfigSlackConfirmationField = Schema.Struct({ "dismiss_text": Schema.optionalKey(Schema.String), "ok_text": Schema.optionalKey(Schema.String), "text": Schema.optionalKey(Schema.String), "title": Schema.optionalKey(Schema.String) })
export type ConfigSlackField = { readonly "short"?: boolean | null, readonly "title"?: string, readonly "value"?: string }
export const ConfigSlackField = Schema.Struct({ "short": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "title": Schema.optionalKey(Schema.String), "value": Schema.optionalKey(Schema.String) })
export type ConfigTLSConfig = { readonly "ca"?: string, readonly "ca_file"?: string, readonly "ca_ref"?: string, readonly "cert"?: string, readonly "cert_file"?: string, readonly "cert_ref"?: string, readonly "insecure_skip_verify"?: boolean, readonly "key"?: string, readonly "key_file"?: string, readonly "key_ref"?: string, readonly "max_version"?: number, readonly "min_version"?: number, readonly "server_name"?: string }
export const ConfigTLSConfig = Schema.Struct({ "ca": Schema.optionalKey(Schema.String), "ca_file": Schema.optionalKey(Schema.String), "ca_ref": Schema.optionalKey(Schema.String), "cert": Schema.optionalKey(Schema.String), "cert_file": Schema.optionalKey(Schema.String), "cert_ref": Schema.optionalKey(Schema.String), "insecure_skip_verify": Schema.optionalKey(Schema.Boolean), "key": Schema.optionalKey(Schema.String), "key_file": Schema.optionalKey(Schema.String), "key_ref": Schema.optionalKey(Schema.String), "max_version": Schema.optionalKey(Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0))), "min_version": Schema.optionalKey(Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0))), "server_name": Schema.optionalKey(Schema.String) })
export type ConfigThreadingConfig = { readonly "enabled"?: boolean, readonly "thread_by_date"?: string }
export const ConfigThreadingConfig = Schema.Struct({ "enabled": Schema.optionalKey(Schema.Boolean), "thread_by_date": Schema.optionalKey(Schema.String) })
export type ConfigURL = {  }
export const ConfigURL = Schema.Struct({  })
export type ConfigURLType2 = {  }
export const ConfigURLType2 = Schema.Struct({  })
export type CoretypesKind = "anonymous" | "organization" | "role" | "serviceaccount" | "user" | "notification-channel" | "route-policy" | "apdex-setting" | "auth-domain" | "session" | "cloud-integration" | "cloud-integration-service" | "integration" | "dashboard" | "public-dashboard" | "ingestion-key" | "ingestion-limit" | "pipeline" | "user-preference" | "org-preference" | "quick-filter" | "ttl-setting" | "rule" | "planned-maintenance" | "saved-view" | "trace-funnel" | "factor-password" | "factor-api-key" | "license" | "subscription" | "logs" | "traces" | "metrics" | "audit-logs" | "meter-metrics" | "logs-field" | "traces-field"
export const CoretypesKind = Schema.Literals(["anonymous", "organization", "role", "serviceaccount", "user", "notification-channel", "route-policy", "apdex-setting", "auth-domain", "session", "cloud-integration", "cloud-integration-service", "integration", "dashboard", "public-dashboard", "ingestion-key", "ingestion-limit", "pipeline", "user-preference", "org-preference", "quick-filter", "ttl-setting", "rule", "planned-maintenance", "saved-view", "trace-funnel", "factor-password", "factor-api-key", "license", "subscription", "logs", "traces", "metrics", "audit-logs", "meter-metrics", "logs-field", "traces-field"])
export type CoretypesType = "user" | "serviceaccount" | "anonymous" | "role" | "organization" | "metaresource" | "telemetryresource"
export const CoretypesType = Schema.Literals(["user", "serviceaccount", "anonymous", "role", "organization", "metaresource", "telemetryresource"])
export type DashboardGridLayoutCollapse = { readonly "open"?: boolean }
export const DashboardGridLayoutCollapse = Schema.Struct({ "open": Schema.optionalKey(Schema.Boolean) })
export type DashboardtypesAxes = { readonly "isLogScale"?: boolean, readonly "softMax"?: number | null, readonly "softMin"?: number | null }
export const DashboardtypesAxes = Schema.Struct({ "isLogScale": Schema.optionalKey(Schema.Boolean), "softMax": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Null])), "softMin": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Null])) })
export type DashboardtypesComparisonOperator = "above" | "below" | "above_or_equal" | "below_or_equal" | "equal" | "not_equal"
export const DashboardtypesComparisonOperator = Schema.Literals(["above", "below", "above_or_equal", "below_or_equal", "equal", "not_equal"])
export type DashboardtypesCustomVariableSpec = { readonly "customValue": string }
export const DashboardtypesCustomVariableSpec = Schema.Struct({ "customValue": Schema.String })
export type DashboardtypesDisplay = { readonly "description"?: string, readonly "name": string }
export const DashboardtypesDisplay = Schema.Struct({ "description": Schema.optionalKey(Schema.String), "name": Schema.String })
export type DashboardtypesFillMode = "solid" | "gradient" | "none"
export const DashboardtypesFillMode = Schema.Literals(["solid", "gradient", "none"])
export type DashboardtypesGettablePublicDasbhboard = { readonly "defaultTimeRange"?: string, readonly "publicPath"?: string, readonly "timeRangeEnabled"?: boolean }
export const DashboardtypesGettablePublicDasbhboard = Schema.Struct({ "defaultTimeRange": Schema.optionalKey(Schema.String), "publicPath": Schema.optionalKey(Schema.String), "timeRangeEnabled": Schema.optionalKey(Schema.Boolean) })
export type DashboardtypesHistogramBuckets = { readonly "bucketCount"?: number | null, readonly "bucketWidth"?: number | null, readonly "mergeAllActiveQueries"?: boolean }
export const DashboardtypesHistogramBuckets = Schema.Struct({ "bucketCount": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Null])), "bucketWidth": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Null])), "mergeAllActiveQueries": Schema.optionalKey(Schema.Boolean) })
export type DashboardtypesLegendMode = "list"
export const DashboardtypesLegendMode = Schema.Literal("list")
export type DashboardtypesLegendPosition = "bottom" | "right"
export const DashboardtypesLegendPosition = Schema.Literals(["bottom", "right"])
export type DashboardtypesLineInterpolation = "linear" | "spline" | "step_after" | "step_before"
export const DashboardtypesLineInterpolation = Schema.Literals(["linear", "spline", "step_after", "step_before"])
export type DashboardtypesLineStyle = "solid" | "dashed"
export const DashboardtypesLineStyle = Schema.Literals(["solid", "dashed"])
export type DashboardtypesListOrder = "asc" | "desc"
export const DashboardtypesListOrder = Schema.Literals(["asc", "desc"])
export type DashboardtypesListSort = "updated_at" | "created_at" | "name"
export const DashboardtypesListSort = Schema.Literals(["updated_at", "created_at", "name"])
export type DashboardtypesListVariableSpecSort = "none" | "alphabetical-asc" | "alphabetical-desc" | "numerical-asc" | "numerical-desc" | "alphabetical-ci-asc" | "alphabetical-ci-desc"
export const DashboardtypesListVariableSpecSort = Schema.Literals(["none", "alphabetical-asc", "alphabetical-desc", "numerical-asc", "numerical-desc", "alphabetical-ci-asc", "alphabetical-ci-desc"])
export type DashboardtypesPanelKind = "Panel"
export const DashboardtypesPanelKind = Schema.Literal("Panel")
export type DashboardtypesPatchOp = "add" | "remove" | "replace" | "move" | "copy" | "test"
export const DashboardtypesPatchOp = Schema.Literals(["add", "remove", "replace", "move", "copy", "test"])
export type DashboardtypesPostablePublicDashboard = { readonly "defaultTimeRange"?: string, readonly "timeRangeEnabled"?: boolean }
export const DashboardtypesPostablePublicDashboard = Schema.Struct({ "defaultTimeRange": Schema.optionalKey(Schema.String), "timeRangeEnabled": Schema.optionalKey(Schema.Boolean) })
export type DashboardtypesPrecisionOption = "0" | "1" | "2" | "3" | "4" | "full"
export const DashboardtypesPrecisionOption = Schema.Literals(["0", "1", "2", "3", "4", "full"])
export type DashboardtypesQueryVariableSpec = { readonly "queryValue": string }
export const DashboardtypesQueryVariableSpec = Schema.Struct({ "queryValue": Schema.String })
export type DashboardtypesSigNozDatasourceSpec = {  }
export const DashboardtypesSigNozDatasourceSpec = Schema.Struct({  })
export type DashboardtypesSource = "user" | "system" | "integration"
export const DashboardtypesSource = Schema.Literals(["user", "system", "integration"])
export type DashboardtypesSpanGaps = { readonly "fillLessThan"?: string, readonly "fillOnlyBelow"?: boolean }
export const DashboardtypesSpanGaps = Schema.Struct({ "fillLessThan": Schema.optionalKey(Schema.String.annotate({ "description": "The maximum gap size to connect when fillOnlyBelow is true. Gaps larger than this duration are left disconnected." })), "fillOnlyBelow": Schema.optionalKey(Schema.Boolean.annotate({ "description": "Controls whether lines connect across null values. When false (default), all gaps are connected. When true, only gaps smaller than fillLessThan are connected." })) })
export type DashboardtypesStorableDashboardData = { readonly [x: string]: Schema.Json }
export const DashboardtypesStorableDashboardData = Schema.Record(Schema.String, Schema.Json)
export type DashboardtypesThresholdFormat = "text" | "background"
export const DashboardtypesThresholdFormat = Schema.Literals(["text", "background"])
export type DashboardtypesTimePreference = "global_time" | "last_5_min" | "last_15_min" | "last_30_min" | "last_1_hr" | "last_6_hr" | "last_1_day" | "last_3_days" | "last_1_week" | "last_1_month"
export const DashboardtypesTimePreference = Schema.Literals(["global_time", "last_5_min", "last_15_min", "last_30_min", "last_1_hr", "last_6_hr", "last_1_day", "last_3_days", "last_1_week", "last_1_month"])
export type DashboardtypesUpdatablePublicDashboard = { readonly "defaultTimeRange"?: string, readonly "timeRangeEnabled"?: boolean }
export const DashboardtypesUpdatablePublicDashboard = Schema.Struct({ "defaultTimeRange": Schema.optionalKey(Schema.String), "timeRangeEnabled": Schema.optionalKey(Schema.Boolean) })
export type DashboardtypesVariableDefaultValue = string | ReadonlyArray<string>
export const DashboardtypesVariableDefaultValue = Schema.Union([Schema.String, Schema.Array(Schema.String)], { mode: "oneOf" })
export type ErrorsResponseerroradditional = { readonly "message": string, readonly "suggestions": ReadonlyArray<string> }
export const ErrorsResponseerroradditional = Schema.Struct({ "message": Schema.String, "suggestions": Schema.Array(Schema.String) })
export type FactoryResponse = { readonly "healthy"?: boolean, readonly "services"?: {  } }
export const FactoryResponse = Schema.Struct({ "healthy": Schema.optionalKey(Schema.Boolean), "services": Schema.optionalKey(Schema.Union([Schema.Struct({  })])) })
export type FeaturetypesGettableFeature = { readonly "defaultVariant"?: string, readonly "description"?: string, readonly "kind"?: string, readonly "name"?: string, readonly "resolvedValue"?: Schema.Json, readonly "stage"?: string, readonly "variants"?: {  } }
export const FeaturetypesGettableFeature = Schema.Struct({ "defaultVariant": Schema.optionalKey(Schema.String), "description": Schema.optionalKey(Schema.String), "kind": Schema.optionalKey(Schema.String), "name": Schema.optionalKey(Schema.String), "resolvedValue": Schema.optionalKey(Schema.Json), "stage": Schema.optionalKey(Schema.String), "variants": Schema.optionalKey(Schema.Union([Schema.Struct({  })])) })
export type GatewaytypesGettableCreatedIngestionKey = { readonly "id": string, readonly "value": string }
export const GatewaytypesGettableCreatedIngestionKey = Schema.Struct({ "id": Schema.String, "value": Schema.String })
export type GatewaytypesGettableCreatedIngestionKeyLimit = { readonly "id": string }
export const GatewaytypesGettableCreatedIngestionKeyLimit = Schema.Struct({ "id": Schema.String })
export type GatewaytypesLimitMetricValue = { readonly "count"?: number, readonly "size"?: number }
export const GatewaytypesLimitMetricValue = Schema.Struct({ "count": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "size": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) })
export type GatewaytypesLimitValue = { readonly "count"?: number | null, readonly "size"?: number | null }
export const GatewaytypesLimitValue = Schema.Struct({ "count": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isInt()), Schema.Null])), "size": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isInt()), Schema.Null])) })
export type GatewaytypesPagination = { readonly "page"?: number, readonly "pages"?: number, readonly "per_page"?: number, readonly "total"?: number }
export const GatewaytypesPagination = Schema.Struct({ "page": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "pages": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "per_page": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "total": Schema.optionalKey(Schema.Number.check(Schema.isInt())) })
export type GatewaytypesPostableIngestionKey = { readonly "expires_at"?: string, readonly "name": string, readonly "tags"?: ReadonlyArray<string> }
export const GatewaytypesPostableIngestionKey = Schema.Struct({ "expires_at": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "name": Schema.String, "tags": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String)])) })
export type GlobaltypesAPIKeyConfig = { readonly "enabled"?: boolean }
export const GlobaltypesAPIKeyConfig = Schema.Struct({ "enabled": Schema.optionalKey(Schema.Boolean) })
export type GlobaltypesImpersonationConfig = { readonly "enabled"?: boolean }
export const GlobaltypesImpersonationConfig = Schema.Struct({ "enabled": Schema.optionalKey(Schema.Boolean) })
export type GlobaltypesTokenizerConfig = { readonly "enabled"?: boolean }
export const GlobaltypesTokenizerConfig = Schema.Struct({ "enabled": Schema.optionalKey(Schema.Boolean) })
export type InframonitoringtypesCheckComponentType = "receiver" | "processor"
export const InframonitoringtypesCheckComponentType = Schema.Literals(["receiver", "processor"])
export type InframonitoringtypesCheckType = "hosts" | "processes" | "pods" | "nodes" | "deployments" | "daemonsets" | "statefulsets" | "jobs" | "namespaces" | "clusters" | "volumes" | "kube_containers"
export const InframonitoringtypesCheckType = Schema.Literals(["hosts", "processes", "pods", "nodes", "deployments", "daemonsets", "statefulsets", "jobs", "namespaces", "clusters", "volumes", "kube_containers"])
export type InframonitoringtypesContainerCountsByReady = { readonly "notReady": number, readonly "ready": number }
export const InframonitoringtypesContainerCountsByReady = Schema.Struct({ "notReady": Schema.Number.check(Schema.isInt()), "ready": Schema.Number.check(Schema.isInt()) })
export type InframonitoringtypesContainerCountsByStatus = { readonly "completed": number, readonly "containerCannotRun": number, readonly "containerCreating": number, readonly "crashLoopBackOff": number, readonly "createContainerConfigError": number, readonly "errImagePull": number, readonly "error": number, readonly "imagePullBackOff": number, readonly "oomKilled": number, readonly "running": number, readonly "terminated": number, readonly "unknown": number, readonly "waiting": number }
export const InframonitoringtypesContainerCountsByStatus = Schema.Struct({ "completed": Schema.Number.check(Schema.isInt()), "containerCannotRun": Schema.Number.check(Schema.isInt()), "containerCreating": Schema.Number.check(Schema.isInt()), "crashLoopBackOff": Schema.Number.check(Schema.isInt()), "createContainerConfigError": Schema.Number.check(Schema.isInt()), "errImagePull": Schema.Number.check(Schema.isInt()), "error": Schema.Number.check(Schema.isInt()), "imagePullBackOff": Schema.Number.check(Schema.isInt()), "oomKilled": Schema.Number.check(Schema.isInt()), "running": Schema.Number.check(Schema.isInt()), "terminated": Schema.Number.check(Schema.isInt()), "unknown": Schema.Number.check(Schema.isInt()), "waiting": Schema.Number.check(Schema.isInt()) })
export type InframonitoringtypesContainerReady = "ready" | "not_ready" | "no_data"
export const InframonitoringtypesContainerReady = Schema.Literals(["ready", "not_ready", "no_data"])
export type InframonitoringtypesContainerStatus = "running" | "waiting" | "terminated" | "crashloopbackoff" | "imagepullbackoff" | "errimagepull" | "createcontainerconfigerror" | "containercreating" | "oomkilled" | "completed" | "error" | "containercannotrun" | "unknown" | "no_data"
export const InframonitoringtypesContainerStatus = Schema.Literals(["running", "waiting", "terminated", "crashloopbackoff", "imagepullbackoff", "errimagepull", "createcontainerconfigerror", "containercreating", "oomkilled", "completed", "error", "containercannotrun", "unknown", "no_data"])
export type InframonitoringtypesHostStatus = "active" | "inactive" | ""
export const InframonitoringtypesHostStatus = Schema.Literals(["active", "inactive", ""])
export type InframonitoringtypesNodeCondition = "ready" | "not_ready" | "no_data"
export const InframonitoringtypesNodeCondition = Schema.Literals(["ready", "not_ready", "no_data"])
export type InframonitoringtypesNodeCountsByReadiness = { readonly "notReady": number, readonly "ready": number }
export const InframonitoringtypesNodeCountsByReadiness = Schema.Struct({ "notReady": Schema.Number.check(Schema.isInt()), "ready": Schema.Number.check(Schema.isInt()) })
export type InframonitoringtypesPodCountsByPhase = { readonly "failed": number, readonly "pending": number, readonly "running": number, readonly "succeeded": number, readonly "unknown": number }
export const InframonitoringtypesPodCountsByPhase = Schema.Struct({ "failed": Schema.Number.check(Schema.isInt()), "pending": Schema.Number.check(Schema.isInt()), "running": Schema.Number.check(Schema.isInt()), "succeeded": Schema.Number.check(Schema.isInt()), "unknown": Schema.Number.check(Schema.isInt()) })
export type InframonitoringtypesPodCountsByStatus = { readonly "completed": number, readonly "containerCannotRun": number, readonly "containerCreating": number, readonly "crashLoopBackOff": number, readonly "createContainerConfigError": number, readonly "errImagePull": number, readonly "error": number, readonly "evicted": number, readonly "failed": number, readonly "imagePullBackOff": number, readonly "nodeAffinity": number, readonly "nodeLost": number, readonly "oomKilled": number, readonly "pending": number, readonly "running": number, readonly "shutdown": number, readonly "unexpectedAdmissionError": number, readonly "unknown": number }
export const InframonitoringtypesPodCountsByStatus = Schema.Struct({ "completed": Schema.Number.check(Schema.isInt()), "containerCannotRun": Schema.Number.check(Schema.isInt()), "containerCreating": Schema.Number.check(Schema.isInt()), "crashLoopBackOff": Schema.Number.check(Schema.isInt()), "createContainerConfigError": Schema.Number.check(Schema.isInt()), "errImagePull": Schema.Number.check(Schema.isInt()), "error": Schema.Number.check(Schema.isInt()), "evicted": Schema.Number.check(Schema.isInt()), "failed": Schema.Number.check(Schema.isInt()), "imagePullBackOff": Schema.Number.check(Schema.isInt()), "nodeAffinity": Schema.Number.check(Schema.isInt()), "nodeLost": Schema.Number.check(Schema.isInt()), "oomKilled": Schema.Number.check(Schema.isInt()), "pending": Schema.Number.check(Schema.isInt()), "running": Schema.Number.check(Schema.isInt()), "shutdown": Schema.Number.check(Schema.isInt()), "unexpectedAdmissionError": Schema.Number.check(Schema.isInt()), "unknown": Schema.Number.check(Schema.isInt()) })
export type InframonitoringtypesPodPhase = "pending" | "running" | "succeeded" | "failed" | "unknown" | "no_data"
export const InframonitoringtypesPodPhase = Schema.Literals(["pending", "running", "succeeded", "failed", "unknown", "no_data"])
export type InframonitoringtypesPodStatus = "pending" | "running" | "failed" | "unknown" | "crashloopbackoff" | "imagepullbackoff" | "errimagepull" | "createcontainerconfigerror" | "containercreating" | "oomkilled" | "completed" | "error" | "containercannotrun" | "evicted" | "nodeaffinity" | "nodelost" | "shutdown" | "unexpectedadmissionerror" | "no_data"
export const InframonitoringtypesPodStatus = Schema.Literals(["pending", "running", "failed", "unknown", "crashloopbackoff", "imagepullbackoff", "errimagepull", "createcontainerconfigerror", "containercreating", "oomkilled", "completed", "error", "containercannotrun", "evicted", "nodeaffinity", "nodelost", "shutdown", "unexpectedadmissionerror", "no_data"])
export type InframonitoringtypesResponseType = "list" | "grouped_list"
export const InframonitoringtypesResponseType = Schema.Literals(["list", "grouped_list"])
export type InframonitoringtypesVolumeRecord = { readonly "meta": {  }, readonly "persistentVolumeClaimName": string, readonly "volumeAvailable": number, readonly "volumeCapacity": number, readonly "volumeInodes": number, readonly "volumeInodesFree": number, readonly "volumeInodesUsed": number, readonly "volumeUsage": number }
export const InframonitoringtypesVolumeRecord = Schema.Struct({ "meta": Schema.Union([Schema.Struct({  })]), "persistentVolumeClaimName": Schema.String, "volumeAvailable": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "volumeCapacity": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "volumeInodes": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "volumeInodesFree": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "volumeInodesUsed": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "volumeUsage": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()) })
export type LlmpricingruletypesGettableUnmappedModels = { readonly "items": ReadonlyArray<{ readonly "modelName": string, readonly "provider"?: string, readonly "spanCount": number }> }
export const LlmpricingruletypesGettableUnmappedModels = Schema.Struct({ "items": Schema.Union([Schema.Array(Schema.Struct({ "modelName": Schema.String, "provider": Schema.optionalKey(Schema.String), "spanCount": Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)) }))]) })
export type LlmpricingruletypesLLMPricingRuleCacheMode = "subtract" | "additive" | "unknown"
export const LlmpricingruletypesLLMPricingRuleCacheMode = Schema.Literals(["subtract", "additive", "unknown"])
export type LlmpricingruletypesLLMPricingRuleUnit = "per_million_tokens"
export const LlmpricingruletypesLLMPricingRuleUnit = Schema.Literal("per_million_tokens")
export type LlmpricingruletypesStringSlice = ReadonlyArray<string>
export const LlmpricingruletypesStringSlice = Schema.Union([Schema.Array(Schema.String)])
export type MetricreductionruletypesAffectedWidget = { readonly "id": string, readonly "name": string }
export const MetricreductionruletypesAffectedWidget = Schema.Struct({ "id": Schema.String, "name": Schema.String })
export type MetricreductionruletypesAssetType = "dashboard" | "alert_rule"
export const MetricreductionruletypesAssetType = Schema.Literals(["dashboard", "alert_rule"])
export type MetricreductionruletypesGettableReductionRuleStats = { readonly "estimatedMonthlySavingsUsd": number, readonly "ingestedSamples": number, readonly "ingestedSeries": number, readonly "retainedSamples": number, readonly "retainedSeries": number }
export const MetricreductionruletypesGettableReductionRuleStats = Schema.Struct({ "estimatedMonthlySavingsUsd": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "ingestedSamples": Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)), "ingestedSeries": Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)), "retainedSamples": Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)), "retainedSeries": Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)) })
export type MetricreductionruletypesMatchType = "drop" | "keep"
export const MetricreductionruletypesMatchType = Schema.Literals(["drop", "keep"])
export type MetricreductionruletypesOrder = "asc" | "desc"
export const MetricreductionruletypesOrder = Schema.Literals(["asc", "desc"])
export type MetricreductionruletypesReductionRuleOrderBy = "metric" | "ingested_volume" | "reduced_volume" | "last_updated"
export const MetricreductionruletypesReductionRuleOrderBy = Schema.Literals(["metric", "ingested_volume", "reduced_volume", "last_updated"])
export type MetricsexplorertypesMetricAlertsResponse = { readonly "alerts": ReadonlyArray<{ readonly "alertId": string, readonly "alertName": string }> }
export const MetricsexplorertypesMetricAlertsResponse = Schema.Struct({ "alerts": Schema.Union([Schema.Array(Schema.Struct({ "alertId": Schema.String, "alertName": Schema.String }))]) })
export type MetricsexplorertypesMetricAttributesResponse = { readonly "attributes": ReadonlyArray<{ readonly "key": string, readonly "valueCount": number, readonly "values": ReadonlyArray<string> }>, readonly "totalKeys": number }
export const MetricsexplorertypesMetricAttributesResponse = Schema.Struct({ "attributes": Schema.Union([Schema.Array(Schema.Struct({ "key": Schema.String, "valueCount": Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)), "values": Schema.Union([Schema.Array(Schema.String)]) }))]), "totalKeys": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()) })
export type MetricsexplorertypesMetricDashboardPanelsResponse = { readonly "dashboards": ReadonlyArray<{ readonly "dashboardId": string, readonly "dashboardName": string, readonly "filterBy"?: ReadonlyArray<string>, readonly "groupBy"?: ReadonlyArray<string>, readonly "panelId": string, readonly "panelName": string }> }
export const MetricsexplorertypesMetricDashboardPanelsResponse = Schema.Struct({ "dashboards": Schema.Union([Schema.Array(Schema.Struct({ "dashboardId": Schema.String, "dashboardName": Schema.String, "filterBy": Schema.optionalKey(Schema.Array(Schema.String)), "groupBy": Schema.optionalKey(Schema.Array(Schema.String)), "panelId": Schema.String, "panelName": Schema.String }))]) })
export type MetricsexplorertypesMetricDashboardsResponse = { readonly "dashboards": ReadonlyArray<{ readonly "dashboardId": string, readonly "dashboardName": string, readonly "widgetId": string, readonly "widgetName": string }> }
export const MetricsexplorertypesMetricDashboardsResponse = Schema.Struct({ "dashboards": Schema.Union([Schema.Array(Schema.Struct({ "dashboardId": Schema.String, "dashboardName": Schema.String, "widgetId": Schema.String, "widgetName": Schema.String }))]) })
export type MetricsexplorertypesMetricHighlightsResponse = { readonly "activeTimeSeries": number, readonly "dataPoints": number, readonly "lastReceived": number, readonly "totalTimeSeries": number }
export const MetricsexplorertypesMetricHighlightsResponse = Schema.Struct({ "activeTimeSeries": Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)), "dataPoints": Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)), "lastReceived": Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)), "totalTimeSeries": Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)) })
export type MetricsexplorertypesMetricsOnboardingResponse = { readonly "hasMetrics": boolean }
export const MetricsexplorertypesMetricsOnboardingResponse = Schema.Struct({ "hasMetrics": Schema.Boolean })
export type MetricsexplorertypesTreemapMode = "timeseries" | "samples"
export const MetricsexplorertypesTreemapMode = Schema.Literals(["timeseries", "samples"])
export type MetricsexplorertypesTreemapResponse = { readonly "samples": ReadonlyArray<{ readonly "metricName": string, readonly "percentage": number, readonly "totalValue": number }>, readonly "timeseries": ReadonlyArray<{ readonly "metricName": string, readonly "percentage": number, readonly "totalValue": number }> }
export const MetricsexplorertypesTreemapResponse = Schema.Struct({ "samples": Schema.Union([Schema.Array(Schema.Struct({ "metricName": Schema.String, "percentage": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "totalValue": Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)) }))]), "timeseries": Schema.Union([Schema.Array(Schema.Struct({ "metricName": Schema.String, "percentage": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "totalValue": Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)) }))]) })
export type MetrictypesComparisonSpaceAggregationParam = { readonly "operator": string, readonly "threshold": number }
export const MetrictypesComparisonSpaceAggregationParam = Schema.Struct({ "operator": Schema.String, "threshold": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()) })
export type MetrictypesSpaceAggregation = "sum" | "avg" | "min" | "max" | "count" | "p50" | "p75" | "p90" | "p95" | "p99"
export const MetrictypesSpaceAggregation = Schema.Literals(["sum", "avg", "min", "max", "count", "p50", "p75", "p90", "p95", "p99"])
export type MetrictypesTemporality = "delta" | "cumulative" | "unspecified" | ""
export const MetrictypesTemporality = Schema.Literals(["delta", "cumulative", "unspecified", ""])
export type MetrictypesTimeAggregation = "latest" | "sum" | "avg" | "min" | "max" | "count" | "count_distinct" | "rate" | "increase" | ""
export const MetrictypesTimeAggregation = Schema.Literals(["latest", "sum", "avg", "min", "max", "count", "count_distinct", "rate", "increase", ""])
export type MetrictypesType = "gauge" | "sum" | "histogram" | "summary" | "exponentialhistogram"
export const MetrictypesType = Schema.Literals(["gauge", "sum", "histogram", "summary", "exponentialhistogram"])
export type ModelDuration = number
export const ModelDuration = Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())
export type ModelLabelSet = { readonly [x: string]: string }
export const ModelLabelSet = Schema.Record(Schema.String, Schema.String)
export type PreferencetypesUpdatablePreference = { readonly "value"?: Schema.Json }
export const PreferencetypesUpdatablePreference = Schema.Struct({ "value": Schema.optionalKey(Schema.Json) })
export type PreferencetypesValue = {  }
export const PreferencetypesValue = Schema.Struct({  })
export type Querybuildertypesv5Bucket = { readonly "step"?: number }
export const Querybuildertypesv5Bucket = Schema.Struct({ "step": Schema.optionalKey(Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite())) })
export type Querybuildertypesv5ClickHouseQuery = { readonly "disabled"?: boolean, readonly "legend"?: string, readonly "name"?: string, readonly "query"?: string }
export const Querybuildertypesv5ClickHouseQuery = Schema.Struct({ "disabled": Schema.optionalKey(Schema.Boolean), "legend": Schema.optionalKey(Schema.String), "name": Schema.optionalKey(Schema.String), "query": Schema.optionalKey(Schema.String) })
export type Querybuildertypesv5ColumnType = "group" | "aggregation"
export const Querybuildertypesv5ColumnType = Schema.Literals(["group", "aggregation"])
export type Querybuildertypesv5ExecStats = { readonly "bytesScanned"?: number, readonly "durationMs"?: number, readonly "rowsScanned"?: number, readonly "stepIntervals"?: { readonly [x: string]: number } }
export const Querybuildertypesv5ExecStats = Schema.Struct({ "bytesScanned": Schema.optionalKey(Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0))), "durationMs": Schema.optionalKey(Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0))), "rowsScanned": Schema.optionalKey(Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0))), "stepIntervals": Schema.optionalKey(Schema.Record(Schema.String, Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)))) }).annotate({ "description": "Execution statistics for the query, including rows scanned, bytes scanned, and duration." })
export type Querybuildertypesv5Filter = { readonly "expression"?: string }
export const Querybuildertypesv5Filter = Schema.Struct({ "expression": Schema.optionalKey(Schema.String) })
export type Querybuildertypesv5FormatOptions = { readonly "fillGaps"?: boolean, readonly "formatTableResultForUI"?: boolean }
export const Querybuildertypesv5FormatOptions = Schema.Struct({ "fillGaps": Schema.optionalKey(Schema.Boolean), "formatTableResultForUI": Schema.optionalKey(Schema.Boolean) })
export type Querybuildertypesv5FunctionName = "cutoffmin" | "cutoffmax" | "clampmin" | "clampmax" | "absolute" | "runningdiff" | "log2" | "log10" | "cumulativesum" | "ewma3" | "ewma5" | "ewma7" | "median3" | "median5" | "median7" | "timeshift" | "anomaly" | "fillzero"
export const Querybuildertypesv5FunctionName = Schema.Literals(["cutoffmin", "cutoffmax", "clampmin", "clampmax", "absolute", "runningdiff", "log2", "log10", "cumulativesum", "ewma3", "ewma5", "ewma7", "median3", "median5", "median7", "timeshift", "anomaly", "fillzero"])
export type Querybuildertypesv5Having = { readonly "expression"?: string }
export const Querybuildertypesv5Having = Schema.Struct({ "expression": Schema.optionalKey(Schema.String) })
export type Querybuildertypesv5LimitBy = { readonly "keys"?: ReadonlyArray<string>, readonly "value"?: string }
export const Querybuildertypesv5LimitBy = Schema.Struct({ "keys": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String)])), "value": Schema.optionalKey(Schema.String) })
export type Querybuildertypesv5OrderDirection = "asc" | "desc"
export const Querybuildertypesv5OrderDirection = Schema.Literals(["asc", "desc"])
export type Querybuildertypesv5QueryRangePreviewResponse = { readonly "compositeQuery": {  } }
export const Querybuildertypesv5QueryRangePreviewResponse = Schema.Struct({ "compositeQuery": Schema.Union([Schema.Struct({  })]) }).annotate({ "description": "Response from the v5 query range preview (dry-run) endpoint. For each query in the composite query, returns the underlying ClickHouse statement(s) it renders to without executing them (one per PromQL metric selector; exactly one for builder/ClickHouse/trace-operator queries), with the optional EXPLAIN ESTIMATE and granule analysis attached per statement when requested." })
export type Querybuildertypesv5QueryType = "builder_query" | "builder_formula" | "builder_trace_operator" | "clickhouse_sql" | "promql"
export const Querybuildertypesv5QueryType = Schema.Literals(["builder_query", "builder_formula", "builder_trace_operator", "clickhouse_sql", "promql"])
export type Querybuildertypesv5QueryWarnDataAdditional = { readonly "message"?: string }
export const Querybuildertypesv5QueryWarnDataAdditional = Schema.Struct({ "message": Schema.optionalKey(Schema.String) })
export type Querybuildertypesv5RawRow = { readonly "data"?: { readonly [x: string]: Schema.Json } | null, readonly "timestamp"?: string }
export const Querybuildertypesv5RawRow = Schema.Struct({ "data": Schema.optionalKey(Schema.Union([Schema.Record(Schema.String, Schema.Json), Schema.Null], { mode: "oneOf" })), "timestamp": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })) })
export type Querybuildertypesv5ReduceTo = "sum" | "count" | "avg" | "min" | "max" | "last" | "median"
export const Querybuildertypesv5ReduceTo = Schema.Literals(["sum", "count", "avg", "min", "max", "last", "median"])
export type Querybuildertypesv5RequestType = "scalar" | "time_series" | "raw" | "raw_stream" | "trace"
export const Querybuildertypesv5RequestType = Schema.Literals(["scalar", "time_series", "raw", "raw_stream", "trace"])
export type Querybuildertypesv5Step = string | number
export const Querybuildertypesv5Step = Schema.Union([Schema.String.annotate({ "description": "Duration string (e.g., \"60s\", \"5m\", \"1h\").", "examples": ["60s"] }), Schema.Number.annotate({ "description": "Duration in seconds.", "examples": [60] }).check(Schema.isFinite())], { mode: "oneOf" }).annotate({ "description": "Step interval. Accepts a Go duration string (e.g., \"60s\", \"1m\", \"1h\") or a number representing seconds (e.g., 60)." })
export type Querybuildertypesv5VariableType = "query" | "dynamic" | "custom" | "text"
export const Querybuildertypesv5VariableType = Schema.Literals(["query", "dynamic", "custom", "text"])
export type RuletypesAlertState = "inactive" | "pending" | "recovering" | "firing" | "nodata" | "disabled"
export const RuletypesAlertState = Schema.Literals(["inactive", "pending", "recovering", "firing", "nodata", "disabled"])
export type RuletypesAlertType = "METRIC_BASED_ALERT" | "TRACES_BASED_ALERT" | "LOGS_BASED_ALERT" | "EXCEPTIONS_BASED_ALERT"
export const RuletypesAlertType = Schema.Literals(["METRIC_BASED_ALERT", "TRACES_BASED_ALERT", "LOGS_BASED_ALERT", "EXCEPTIONS_BASED_ALERT"])
export type RuletypesCompareOperator = "above" | "below" | "equal" | "not_equal" | "outside_bounds"
export const RuletypesCompareOperator = Schema.Literals(["above", "below", "equal", "not_equal", "outside_bounds"])
export type RuletypesEvaluationKind = "rolling" | "cumulative"
export const RuletypesEvaluationKind = Schema.Literals(["rolling", "cumulative"])
export type RuletypesGettableTestRule = { readonly "alertCount"?: number, readonly "message"?: string }
export const RuletypesGettableTestRule = Schema.Struct({ "alertCount": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "message": Schema.optionalKey(Schema.String) })
export type RuletypesMatchType = "at_least_once" | "all_the_times" | "on_average" | "in_total" | "last"
export const RuletypesMatchType = Schema.Literals(["at_least_once", "all_the_times", "on_average", "in_total", "last"])
export type RuletypesPanelType = "value" | "table" | "graph"
export const RuletypesPanelType = Schema.Literals(["value", "table", "graph"])
export type RuletypesQueryType = "builder" | "clickhouse_sql" | "promql"
export const RuletypesQueryType = Schema.Literals(["builder", "clickhouse_sql", "promql"])
export type RuletypesRenotify = { readonly "alertStates"?: ReadonlyArray<"inactive" | "pending" | "recovering" | "firing" | "nodata" | "disabled">, readonly "enabled"?: boolean, readonly "interval"?: string }
export const RuletypesRenotify = Schema.Struct({ "alertStates": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Literals(["inactive", "pending", "recovering", "firing", "nodata", "disabled"]))])), "enabled": Schema.optionalKey(Schema.Boolean), "interval": Schema.optionalKey(Schema.String) })
export type RuletypesRollingWindow = { readonly "evalWindow": string, readonly "frequency": string }
export const RuletypesRollingWindow = Schema.Struct({ "evalWindow": Schema.String, "frequency": Schema.String })
export type RuletypesRuleType = "threshold_rule" | "promql_rule" | "anomaly_rule"
export const RuletypesRuleType = Schema.Literals(["threshold_rule", "promql_rule", "anomaly_rule"])
export type RuletypesScheduleType = "hourly" | "daily" | "weekly" | "monthly"
export const RuletypesScheduleType = Schema.Literals(["hourly", "daily", "weekly", "monthly"])
export type RuletypesSeasonality = "hourly" | "daily" | "weekly"
export const RuletypesSeasonality = Schema.Literals(["hourly", "daily", "weekly"])
export type RuletypesThresholdKind = "basic"
export const RuletypesThresholdKind = Schema.Literal("basic")
export type ServiceaccounttypesDeprecatedPostableServiceAccountRole = { readonly "id": string }
export const ServiceaccounttypesDeprecatedPostableServiceAccountRole = Schema.Struct({ "id": Schema.String })
export type ServiceaccounttypesGettableFactorAPIKey = { readonly "createdAt"?: string, readonly "expiresAt": number, readonly "id": string, readonly "lastObservedAt": string, readonly "name"?: string, readonly "serviceAccountId": string, readonly "updatedAt"?: string }
export const ServiceaccounttypesGettableFactorAPIKey = Schema.Struct({ "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "expiresAt": Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)), "id": Schema.String, "lastObservedAt": Schema.String.annotate({ "format": "date-time" }), "name": Schema.optionalKey(Schema.String), "serviceAccountId": Schema.String, "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })) })
export type ServiceaccounttypesGettableFactorAPIKeyWithKey = { readonly "id": string, readonly "key": string }
export const ServiceaccounttypesGettableFactorAPIKeyWithKey = Schema.Struct({ "id": Schema.String, "key": Schema.String })
export type ServiceaccounttypesPostableFactorAPIKey = { readonly "expiresAt": number, readonly "name": string }
export const ServiceaccounttypesPostableFactorAPIKey = Schema.Struct({ "expiresAt": Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)), "name": Schema.String })
export type ServiceaccounttypesPostableServiceAccount = { readonly "name": string }
export const ServiceaccounttypesPostableServiceAccount = Schema.Struct({ "name": Schema.String })
export type ServiceaccounttypesPostableServiceAccountRole = { readonly "roleId": string, readonly "serviceAccountId": string }
export const ServiceaccounttypesPostableServiceAccountRole = Schema.Struct({ "roleId": Schema.String, "serviceAccountId": Schema.String })
export type ServiceaccounttypesServiceAccount = { readonly "createdAt"?: string, readonly "email": string, readonly "id": string, readonly "name": string, readonly "orgId": string, readonly "status": string, readonly "updatedAt"?: string }
export const ServiceaccounttypesServiceAccount = Schema.Struct({ "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "email": Schema.String, "id": Schema.String, "name": Schema.String, "orgId": Schema.String, "status": Schema.String, "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })) })
export type ServiceaccounttypesUpdatableFactorAPIKey = { readonly "expiresAt": number, readonly "name": string }
export const ServiceaccounttypesUpdatableFactorAPIKey = Schema.Struct({ "expiresAt": Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)), "name": Schema.String })
export type Sigv4SigV4Config = {  }
export const Sigv4SigV4Config = Schema.Struct({  })
export type SpantypesFieldContext = "attribute" | "resource"
export const SpantypesFieldContext = Schema.Literals(["attribute", "resource"])
export type SpantypesGettableSpanMapperTest = { readonly "collectorLogs"?: ReadonlyArray<string>, readonly "spans"?: ReadonlyArray<{ readonly "attributes"?: {  }, readonly "resource"?: {  } }> }
export const SpantypesGettableSpanMapperTest = Schema.Struct({ "collectorLogs": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String)])), "spans": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "attributes": Schema.optionalKey(Schema.Union([Schema.Struct({  })])), "resource": Schema.optionalKey(Schema.Union([Schema.Struct({  })])) }))])) })
export type SpantypesOtelSpanRef = { readonly "refType"?: string, readonly "spanId"?: string, readonly "traceId"?: string }
export const SpantypesOtelSpanRef = Schema.Struct({ "refType": Schema.optionalKey(Schema.String), "spanId": Schema.optionalKey(Schema.String), "traceId": Schema.optionalKey(Schema.String) })
export type SpantypesPostableWaterfall = { readonly "selectedSpanId"?: string, readonly "uncollapsedSpans"?: ReadonlyArray<string> }
export const SpantypesPostableWaterfall = Schema.Struct({ "selectedSpanId": Schema.optionalKey(Schema.String), "uncollapsedSpans": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String)])) })
export type SpantypesSpanAggregationType = "span_count" | "execution_time_percentage" | "duration"
export const SpantypesSpanAggregationType = Schema.Literals(["span_count", "execution_time_percentage", "duration"])
export type SpantypesSpanMapperGroupCondition = { readonly "attributes": ReadonlyArray<string>, readonly "resource": ReadonlyArray<string> }
export const SpantypesSpanMapperGroupCondition = Schema.Union([Schema.Struct({ "attributes": Schema.Union([Schema.Array(Schema.String)]), "resource": Schema.Union([Schema.Array(Schema.String)]) })])
export type SpantypesSpanMapperOperation = "move" | "copy"
export const SpantypesSpanMapperOperation = Schema.Literals(["move", "copy"])
export type TagtypesGettableTag = { readonly "key": string, readonly "value": string }
export const TagtypesGettableTag = Schema.Struct({ "key": Schema.String, "value": Schema.String })
export type TelemetrystoretypesEstimateEntry = { readonly "database": string, readonly "marks": number, readonly "parts": number, readonly "rows": number, readonly "table": string }
export const TelemetrystoretypesEstimateEntry = Schema.Struct({ "database": Schema.String, "marks": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "parts": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "rows": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "table": Schema.String })
export type TelemetrystoretypesIndexStep = { readonly "condition": string, readonly "initialGranules": number, readonly "initialParts": number, readonly "keys": ReadonlyArray<string>, readonly "name": string, readonly "selectedGranules": number, readonly "selectedParts": number, readonly "type": string }
export const TelemetrystoretypesIndexStep = Schema.Struct({ "condition": Schema.String, "initialGranules": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "initialParts": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "keys": Schema.Array(Schema.String), "name": Schema.String, "selectedGranules": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "selectedParts": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "type": Schema.String })
export type TelemetrytypesFieldContext = "metric" | "log" | "span" | "resource" | "attribute" | "body" | ""
export const TelemetrytypesFieldContext = Schema.Literals(["metric", "log", "span", "resource", "attribute", "body", ""])
export type TelemetrytypesFieldDataType = "string" | "bool" | "float64" | "int64" | "number" | ""
export const TelemetrytypesFieldDataType = Schema.Literals(["string", "bool", "float64", "int64", "number", ""])
export type TelemetrytypesGettableFieldKeys = { readonly "complete": boolean, readonly "keys": {  } }
export const TelemetrytypesGettableFieldKeys = Schema.Struct({ "complete": Schema.Boolean, "keys": Schema.Union([Schema.Struct({  })]) })
export type TelemetrytypesSignal = "traces" | "logs" | "metrics" | ""
export const TelemetrytypesSignal = Schema.Literals(["traces", "logs", "metrics", ""])
export type TelemetrytypesSource = "meter" | ""
export const TelemetrytypesSource = Schema.Literals(["meter", ""])
export type TelemetrytypesTelemetryFieldValues = { readonly "boolValues"?: ReadonlyArray<boolean>, readonly "numberValues"?: ReadonlyArray<number>, readonly "relatedValues"?: ReadonlyArray<string>, readonly "stringValues"?: ReadonlyArray<string> }
export const TelemetrytypesTelemetryFieldValues = Schema.Struct({ "boolValues": Schema.optionalKey(Schema.Array(Schema.Boolean)), "numberValues": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()))), "relatedValues": Schema.optionalKey(Schema.Array(Schema.String)), "stringValues": Schema.optionalKey(Schema.Array(Schema.String)) })
export type TimeDuration = number
export const TimeDuration = Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())
export type TypesAlertStatus = { readonly "inhibitedBy"?: ReadonlyArray<string>, readonly "silencedBy"?: ReadonlyArray<string>, readonly "state"?: string }
export const TypesAlertStatus = Schema.Struct({ "inhibitedBy": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String)])), "silencedBy": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String)])), "state": Schema.optionalKey(Schema.String) })
export type TypesChangePasswordRequest = { readonly "newPassword"?: string, readonly "oldPassword"?: string }
export const TypesChangePasswordRequest = Schema.Struct({ "newPassword": Schema.optionalKey(Schema.String), "oldPassword": Schema.optionalKey(Schema.String) })
export type TypesDeprecatedUser = { readonly "createdAt"?: string, readonly "displayName"?: string, readonly "email"?: string, readonly "id": string, readonly "isRoot"?: boolean, readonly "orgId"?: string, readonly "role"?: string, readonly "status"?: string, readonly "updatedAt"?: string }
export const TypesDeprecatedUser = Schema.Struct({ "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "displayName": Schema.optionalKey(Schema.String), "email": Schema.optionalKey(Schema.String), "id": Schema.String, "isRoot": Schema.optionalKey(Schema.Boolean), "orgId": Schema.optionalKey(Schema.String), "role": Schema.optionalKey(Schema.String), "status": Schema.optionalKey(Schema.String), "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })) })
export type TypesIdentifiable = { readonly "id": string }
export const TypesIdentifiable = Schema.Struct({ "id": Schema.String })
export type TypesInvite = { readonly "createdAt"?: string, readonly "email"?: string, readonly "id": string, readonly "inviteLink"?: string, readonly "name"?: string, readonly "orgId"?: string, readonly "role"?: string, readonly "token"?: string, readonly "updatedAt"?: string }
export const TypesInvite = Schema.Struct({ "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "email": Schema.optionalKey(Schema.String), "id": Schema.String, "inviteLink": Schema.optionalKey(Schema.String), "name": Schema.optionalKey(Schema.String), "orgId": Schema.optionalKey(Schema.String), "role": Schema.optionalKey(Schema.String), "token": Schema.optionalKey(Schema.String), "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })) })
export type TypesOrganization = { readonly "alias"?: string, readonly "createdAt"?: string, readonly "displayName"?: string, readonly "id": string, readonly "key"?: number, readonly "name"?: string, readonly "updatedAt"?: string }
export const TypesOrganization = Schema.Struct({ "alias": Schema.optionalKey(Schema.String), "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "displayName": Schema.optionalKey(Schema.String), "id": Schema.String, "key": Schema.optionalKey(Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0))), "name": Schema.optionalKey(Schema.String), "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })) })
export type TypesPostableForgotPassword = { readonly "email": string, readonly "frontendBaseURL"?: string, readonly "orgId": string }
export const TypesPostableForgotPassword = Schema.Struct({ "email": Schema.String, "frontendBaseURL": Schema.optionalKey(Schema.String), "orgId": Schema.String })
export type TypesPostableInvite = { readonly "email"?: string, readonly "frontendBaseUrl"?: string, readonly "name"?: string, readonly "role"?: string }
export const TypesPostableInvite = Schema.Struct({ "email": Schema.optionalKey(Schema.String), "frontendBaseUrl": Schema.optionalKey(Schema.String), "name": Schema.optionalKey(Schema.String), "role": Schema.optionalKey(Schema.String) })
export type TypesPostableResetPassword = { readonly "password"?: string, readonly "token"?: string }
export const TypesPostableResetPassword = Schema.Struct({ "password": Schema.optionalKey(Schema.String), "token": Schema.optionalKey(Schema.String) })
export type TypesPostableRole = { readonly "name": string }
export const TypesPostableRole = Schema.Struct({ "name": Schema.String })
export type TypesPostableVerifyResetPasswordToken = { readonly "token": string }
export const TypesPostableVerifyResetPasswordToken = Schema.Struct({ "token": Schema.String })
export type TypesResetPasswordToken = { readonly "expiresAt"?: string, readonly "id": string, readonly "passwordId"?: string, readonly "token"?: string }
export const TypesResetPasswordToken = Schema.Struct({ "expiresAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "id": Schema.String, "passwordId": Schema.optionalKey(Schema.String), "token": Schema.optionalKey(Schema.String) })
export type TypesUpdatableUser = { readonly "displayName": string }
export const TypesUpdatableUser = Schema.Struct({ "displayName": Schema.String })
export type TypesUser = { readonly "createdAt"?: string, readonly "displayName"?: string, readonly "email"?: string, readonly "id": string, readonly "isRoot"?: boolean, readonly "orgId"?: string, readonly "status"?: string, readonly "updatedAt"?: string }
export const TypesUser = Schema.Struct({ "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "displayName": Schema.optionalKey(Schema.String), "email": Schema.optionalKey(Schema.String), "id": Schema.String, "isRoot": Schema.optionalKey(Schema.Boolean), "orgId": Schema.optionalKey(Schema.String), "status": Schema.optionalKey(Schema.String), "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })) })
export type ZeustypesGettableHost = { readonly "hosts": ReadonlyArray<{ readonly "is_default": boolean, readonly "name": string, readonly "url": string }>, readonly "name": string, readonly "state": string, readonly "tier": string }
export const ZeustypesGettableHost = Schema.Struct({ "hosts": Schema.Union([Schema.Array(Schema.Struct({ "is_default": Schema.Boolean, "name": Schema.String, "url": Schema.String }))]), "name": Schema.String, "state": Schema.String, "tier": Schema.String })
export type ZeustypesPostableHost = { readonly "name": string }
export const ZeustypesPostableHost = Schema.Struct({ "name": Schema.String })
export type ZeustypesPostableProfile = { readonly "existing_observability_tool": string, readonly "has_existing_observability_tool": boolean, readonly "logs_scale_per_day_in_gb": number, readonly "number_of_hosts": number, readonly "number_of_services": number, readonly "reasons_for_interest_in_signoz": ReadonlyArray<string>, readonly "timeline_for_migrating_to_signoz": string, readonly "uses_otel": boolean, readonly "where_did_you_discover_signoz": string }
export const ZeustypesPostableProfile = Schema.Struct({ "existing_observability_tool": Schema.String, "has_existing_observability_tool": Schema.Boolean, "logs_scale_per_day_in_gb": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "number_of_hosts": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "number_of_services": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "reasons_for_interest_in_signoz": Schema.Union([Schema.Array(Schema.String)]), "timeline_for_migrating_to_signoz": Schema.String, "uses_otel": Schema.Boolean, "where_did_you_discover_signoz": Schema.String })
export type SignoztypesInt64 = number | string
export const SignoztypesInt64 = Schema.Union([Schema.Number.check(Schema.isFinite()).check(Schema.isGreaterThanOrEqualTo(0)).check(Schema.isMultipleOf(1)), Schema.String.check(Schema.isPattern(new RegExp("^[0-9]+$")))], { mode: "oneOf" }).annotate({ "description": "A non-negative int64 value. JSON numbers may already have lost precision; strings preserve the exact value." })
export type SignoztypesFloat64 = number | "NaN" | "Inf" | "+Inf" | "-Inf" | "Infinity" | "+Infinity" | "-Infinity"
export const SignoztypesFloat64 = Schema.Union([Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), Schema.Literals(["NaN", "Inf", "+Inf", "-Inf", "Infinity", "+Infinity", "-Infinity"])], { mode: "oneOf" }).annotate({ "description": "A float64 value. Finite values are numbers; non-finite values are serialized by the SigNoz API as one of these JSON string tokens (JSON has no NaN/Infinity literal)." })
export type AlertmanagertypesGettableRoutePolicy = { readonly "channels": ReadonlyArray<string>, readonly "createdAt": string, readonly "createdBy"?: string | null, readonly "description"?: string, readonly "expression": string, readonly "id": string, readonly "kind"?: AlertmanagertypesExpressionKind, readonly "name": string, readonly "tags"?: ReadonlyArray<string>, readonly "updatedAt": string, readonly "updatedBy"?: string | null }
export const AlertmanagertypesGettableRoutePolicy = Schema.Struct({ "channels": Schema.Union([Schema.Array(Schema.String)]), "createdAt": Schema.String.annotate({ "format": "date-time" }), "createdBy": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "description": Schema.optionalKey(Schema.String), "expression": Schema.String, "id": Schema.String, "kind": Schema.optionalKey(AlertmanagertypesExpressionKind), "name": Schema.String, "tags": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String)])), "updatedAt": Schema.String.annotate({ "format": "date-time" }), "updatedBy": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type AlertmanagertypesPostableRoutePolicy = { readonly "channels": ReadonlyArray<string>, readonly "description"?: string, readonly "expression": string, readonly "kind"?: AlertmanagertypesExpressionKind, readonly "name": string, readonly "tags"?: ReadonlyArray<string> }
export const AlertmanagertypesPostableRoutePolicy = Schema.Struct({ "channels": Schema.Union([Schema.Array(Schema.String)]), "description": Schema.optionalKey(Schema.String), "expression": Schema.String, "kind": Schema.optionalKey(AlertmanagertypesExpressionKind), "name": Schema.String, "tags": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String)])) })
export type AlertmanagertypesRecurrence = { readonly "duration": string, readonly "repeatOn"?: ReadonlyArray<"sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday">, readonly "repeatType": AlertmanagertypesRepeatType }
export const AlertmanagertypesRecurrence = Schema.Struct({ "duration": Schema.String, "repeatOn": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Literals(["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]))])), "repeatType": AlertmanagertypesRepeatType })
export type AuthtypesOIDCConfig = { readonly "claimMapping"?: AuthtypesAttributeMapping, readonly "clientId"?: string, readonly "clientSecret"?: string, readonly "getUserInfo"?: boolean, readonly "insecureSkipEmailVerified"?: boolean, readonly "issuer"?: string, readonly "issuerAlias"?: string }
export const AuthtypesOIDCConfig = Schema.Struct({ "claimMapping": Schema.optionalKey(AuthtypesAttributeMapping), "clientId": Schema.optionalKey(Schema.String), "clientSecret": Schema.optionalKey(Schema.String), "getUserInfo": Schema.optionalKey(Schema.Boolean), "insecureSkipEmailVerified": Schema.optionalKey(Schema.Boolean), "issuer": Schema.optionalKey(Schema.String), "issuerAlias": Schema.optionalKey(Schema.String) })
export type AuthtypesSamlConfig = { readonly "attributeMapping"?: AuthtypesAttributeMapping, readonly "insecureSkipAuthNRequestsSigned"?: boolean, readonly "samlCert"?: string, readonly "samlEntity"?: string, readonly "samlIdp"?: string }
export const AuthtypesSamlConfig = Schema.Struct({ "attributeMapping": Schema.optionalKey(AuthtypesAttributeMapping), "insecureSkipAuthNRequestsSigned": Schema.optionalKey(Schema.Boolean), "samlCert": Schema.optionalKey(Schema.String), "samlEntity": Schema.optionalKey(Schema.String), "samlIdp": Schema.optionalKey(Schema.String) })
export type AuthtypesAuthNSupport = { readonly "callback"?: ReadonlyArray<{ readonly "provider"?: AuthtypesAuthNProvider, readonly "url"?: string }>, readonly "password"?: ReadonlyArray<{ readonly "provider"?: AuthtypesAuthNProvider }> }
export const AuthtypesAuthNSupport = Schema.Struct({ "callback": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "provider": Schema.optionalKey(AuthtypesAuthNProvider), "url": Schema.optionalKey(Schema.String) }))])), "password": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "provider": Schema.optionalKey(AuthtypesAuthNProvider) }))])) })
export type AuthtypesPostableUser = { readonly "displayName"?: string, readonly "email": string, readonly "frontendBaseUrl"?: string, readonly "userRoles"?: ReadonlyArray<AuthtypesDeprecatedPostableUserRole> }
export const AuthtypesPostableUser = Schema.Struct({ "displayName": Schema.optionalKey(Schema.String), "email": Schema.String, "frontendBaseUrl": Schema.optionalKey(Schema.String), "userRoles": Schema.optionalKey(Schema.Array(AuthtypesDeprecatedPostableUserRole)) })
export type CloudintegrationtypesAWSLogsCollectionStrategy = { readonly "subscriptions": ReadonlyArray<CloudintegrationtypesAWSCloudWatchLogsSubscription> }
export const CloudintegrationtypesAWSLogsCollectionStrategy = Schema.Struct({ "subscriptions": Schema.Array(CloudintegrationtypesAWSCloudWatchLogsSubscription) })
export type CloudintegrationtypesAWSMetricsCollectionStrategy = { readonly "streamFilters": ReadonlyArray<CloudintegrationtypesAWSCloudWatchMetricStreamFilter> }
export const CloudintegrationtypesAWSMetricsCollectionStrategy = Schema.Struct({ "streamFilters": Schema.Array(CloudintegrationtypesAWSCloudWatchMetricStreamFilter) })
export type CloudintegrationtypesAWSServiceConfig = { readonly "logs"?: CloudintegrationtypesAWSServiceLogsConfig, readonly "metrics"?: CloudintegrationtypesAWSServiceMetricsConfig }
export const CloudintegrationtypesAWSServiceConfig = Schema.Struct({ "logs": Schema.optionalKey(CloudintegrationtypesAWSServiceLogsConfig), "metrics": Schema.optionalKey(CloudintegrationtypesAWSServiceMetricsConfig) })
export type CloudintegrationtypesAzureTelemetryCollectionStrategy = { readonly "logs"?: CloudintegrationtypesAzureLogsCollectionStrategy, readonly "metrics"?: CloudintegrationtypesAzureMetricsCollectionStrategy, readonly "resourceProvider": string, readonly "resourceType": string }
export const CloudintegrationtypesAzureTelemetryCollectionStrategy = Schema.Struct({ "logs": Schema.optionalKey(CloudintegrationtypesAzureLogsCollectionStrategy), "metrics": Schema.optionalKey(CloudintegrationtypesAzureMetricsCollectionStrategy), "resourceProvider": Schema.String, "resourceType": Schema.String })
export type CloudintegrationtypesAzureServiceConfig = { readonly "logs": CloudintegrationtypesAzureServiceLogsConfig, readonly "metrics": CloudintegrationtypesAzureServiceMetricsConfig }
export const CloudintegrationtypesAzureServiceConfig = Schema.Struct({ "logs": CloudintegrationtypesAzureServiceLogsConfig, "metrics": CloudintegrationtypesAzureServiceMetricsConfig })
export type CloudintegrationtypesAccountConfig = { readonly "aws"?: CloudintegrationtypesAWSAccountConfig, readonly "azure"?: CloudintegrationtypesAzureAccountConfig, readonly "gcp"?: CloudintegrationtypesGCPAccountConfig }
export const CloudintegrationtypesAccountConfig = Schema.Struct({ "aws": Schema.optionalKey(CloudintegrationtypesAWSAccountConfig), "azure": Schema.optionalKey(CloudintegrationtypesAzureAccountConfig), "gcp": Schema.optionalKey(CloudintegrationtypesGCPAccountConfig) })
export type CloudintegrationtypesPostableAccountConfig = { readonly "aws"?: CloudintegrationtypesAWSPostableAccountConfig, readonly "azure"?: CloudintegrationtypesAzureAccountConfig, readonly "gcp"?: CloudintegrationtypesGCPAccountConfig }
export const CloudintegrationtypesPostableAccountConfig = Schema.Struct({ "aws": Schema.optionalKey(CloudintegrationtypesAWSPostableAccountConfig), "azure": Schema.optionalKey(CloudintegrationtypesAzureAccountConfig), "gcp": Schema.optionalKey(CloudintegrationtypesGCPAccountConfig) })
export type CloudintegrationtypesConnectionArtifact = { readonly "aws"?: CloudintegrationtypesAWSConnectionArtifact, readonly "azure"?: CloudintegrationtypesAzureConnectionArtifact, readonly "gcp"?: CloudintegrationtypesGCPConnectionArtifact }
export const CloudintegrationtypesConnectionArtifact = Schema.Struct({ "aws": Schema.optionalKey(CloudintegrationtypesAWSConnectionArtifact), "azure": Schema.optionalKey(CloudintegrationtypesAzureConnectionArtifact), "gcp": Schema.optionalKey(CloudintegrationtypesGCPConnectionArtifact) })
export type CloudintegrationtypesGCPServiceConfig = { readonly "logs"?: CloudintegrationtypesGCPServiceLogsConfig, readonly "metrics"?: CloudintegrationtypesGCPServiceMetricsConfig }
export const CloudintegrationtypesGCPServiceConfig = Schema.Struct({ "logs": Schema.optionalKey(CloudintegrationtypesGCPServiceLogsConfig), "metrics": Schema.optionalKey(CloudintegrationtypesGCPServiceMetricsConfig) })
export type CloudintegrationtypesOldAWSCollectionStrategy = { readonly "aws_logs"?: CloudintegrationtypesOldAWSLogsStrategy, readonly "aws_metrics"?: CloudintegrationtypesOldAWSMetricsStrategy, readonly "provider"?: string, readonly "s3_buckets"?: { readonly [x: string]: ReadonlyArray<string> } }
export const CloudintegrationtypesOldAWSCollectionStrategy = Schema.Struct({ "aws_logs": Schema.optionalKey(CloudintegrationtypesOldAWSLogsStrategy), "aws_metrics": Schema.optionalKey(CloudintegrationtypesOldAWSMetricsStrategy), "provider": Schema.optionalKey(Schema.String), "s3_buckets": Schema.optionalKey(Schema.Record(Schema.String, Schema.Array(Schema.String))) })
export type CloudintegrationtypesGettableServicesMetadata = { readonly "services": ReadonlyArray<CloudintegrationtypesServiceMetadata> }
export const CloudintegrationtypesGettableServicesMetadata = Schema.Struct({ "services": Schema.Array(CloudintegrationtypesServiceMetadata) })
export type CloudintegrationtypesServiceDashboard = { readonly "description": string, readonly "integrationDashboard"?: CloudintegrationtypesStorableIntegrationDashboard, readonly "title": string }
export const CloudintegrationtypesServiceDashboard = Schema.Struct({ "description": Schema.String, "integrationDashboard": Schema.optionalKey(CloudintegrationtypesStorableIntegrationDashboard), "title": Schema.String })
export type CloudintegrationtypesUpdatableAccountConfig = { readonly "aws"?: CloudintegrationtypesAWSAccountConfig, readonly "azure"?: CloudintegrationtypesUpdatableAzureAccountConfig, readonly "gcp"?: CloudintegrationtypesUpdatableGCPAccountConfig }
export const CloudintegrationtypesUpdatableAccountConfig = Schema.Struct({ "aws": Schema.optionalKey(CloudintegrationtypesAWSAccountConfig), "azure": Schema.optionalKey(CloudintegrationtypesUpdatableAzureAccountConfig), "gcp": Schema.optionalKey(CloudintegrationtypesUpdatableGCPAccountConfig) })
export type ConfigMattermostAttachment = { readonly "author_icon"?: string, readonly "author_link"?: string, readonly "author_name"?: string, readonly "color"?: string, readonly "fallback"?: string, readonly "fields"?: ReadonlyArray<ConfigMattermostField>, readonly "footer"?: string, readonly "footer_icon"?: string, readonly "image_url"?: string, readonly "pretext"?: string, readonly "text"?: string, readonly "thumb_url"?: string, readonly "title"?: string, readonly "title_link"?: string }
export const ConfigMattermostAttachment = Schema.Struct({ "author_icon": Schema.optionalKey(Schema.String), "author_link": Schema.optionalKey(Schema.String), "author_name": Schema.optionalKey(Schema.String), "color": Schema.optionalKey(Schema.String), "fallback": Schema.optionalKey(Schema.String), "fields": Schema.optionalKey(Schema.Array(ConfigMattermostField)), "footer": Schema.optionalKey(Schema.String), "footer_icon": Schema.optionalKey(Schema.String), "image_url": Schema.optionalKey(Schema.String), "pretext": Schema.optionalKey(Schema.String), "text": Schema.optionalKey(Schema.String), "thumb_url": Schema.optionalKey(Schema.String), "title": Schema.optionalKey(Schema.String), "title_link": Schema.optionalKey(Schema.String) })
export type ConfigSlackAction = { readonly "confirm"?: ConfigSlackConfirmationField, readonly "name"?: string, readonly "style"?: string, readonly "text"?: string, readonly "type"?: string, readonly "url"?: string, readonly "value"?: string }
export const ConfigSlackAction = Schema.Struct({ "confirm": Schema.optionalKey(ConfigSlackConfirmationField), "name": Schema.optionalKey(Schema.String), "style": Schema.optionalKey(Schema.String), "text": Schema.optionalKey(Schema.String), "type": Schema.optionalKey(Schema.String), "url": Schema.optionalKey(Schema.String), "value": Schema.optionalKey(Schema.String) })
export type ConfigEmailConfig = { readonly "auth_identity"?: string, readonly "auth_password"?: string, readonly "auth_password_file"?: string, readonly "auth_secret"?: string, readonly "auth_secret_file"?: string, readonly "auth_username"?: string, readonly "force_implicit_tls"?: boolean | null, readonly "from"?: string, readonly "headers"?: { readonly [x: string]: string }, readonly "hello"?: string, readonly "html"?: string, readonly "require_tls"?: boolean | null, readonly "send_resolved"?: boolean, readonly "smarthost"?: ConfigHostPort, readonly "text"?: string, readonly "threading"?: ConfigThreadingConfig, readonly "tls_config"?: ConfigTLSConfig, readonly "to"?: string }
export const ConfigEmailConfig = Schema.Struct({ "auth_identity": Schema.optionalKey(Schema.String), "auth_password": Schema.optionalKey(Schema.String), "auth_password_file": Schema.optionalKey(Schema.String), "auth_secret": Schema.optionalKey(Schema.String), "auth_secret_file": Schema.optionalKey(Schema.String), "auth_username": Schema.optionalKey(Schema.String), "force_implicit_tls": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "from": Schema.optionalKey(Schema.String), "headers": Schema.optionalKey(Schema.Record(Schema.String, Schema.String)), "hello": Schema.optionalKey(Schema.String), "html": Schema.optionalKey(Schema.String), "require_tls": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "send_resolved": Schema.optionalKey(Schema.Boolean), "smarthost": Schema.optionalKey(ConfigHostPort), "text": Schema.optionalKey(Schema.String), "threading": Schema.optionalKey(ConfigThreadingConfig), "tls_config": Schema.optionalKey(ConfigTLSConfig), "to": Schema.optionalKey(Schema.String) })
export type ConfigOAuth2 = { readonly "audience"?: string, readonly "claims"?: { readonly [x: string]: Schema.Json }, readonly "client_certificate_key"?: string, readonly "client_certificate_key_file"?: string, readonly "client_certificate_key_id"?: string, readonly "client_certificate_key_ref"?: string, readonly "client_id"?: string, readonly "client_secret"?: string, readonly "client_secret_file"?: string, readonly "client_secret_ref"?: string, readonly "endpoint_params"?: { readonly [x: string]: string }, readonly "grant_type"?: string, readonly "iss"?: string, readonly "no_proxy"?: string, readonly "proxy_connect_header"?: ConfigProxyHeader, readonly "proxy_from_environment"?: boolean, readonly "proxy_url"?: ConfigURL, readonly "scopes"?: ReadonlyArray<string>, readonly "signature_algorithm"?: string, readonly "token_url"?: string }
export const ConfigOAuth2 = Schema.Struct({ "audience": Schema.optionalKey(Schema.String), "claims": Schema.optionalKey(Schema.Record(Schema.String, Schema.Json)), "client_certificate_key": Schema.optionalKey(Schema.String), "client_certificate_key_file": Schema.optionalKey(Schema.String), "client_certificate_key_id": Schema.optionalKey(Schema.String), "client_certificate_key_ref": Schema.optionalKey(Schema.String), "client_id": Schema.optionalKey(Schema.String), "client_secret": Schema.optionalKey(Schema.String), "client_secret_file": Schema.optionalKey(Schema.String), "client_secret_ref": Schema.optionalKey(Schema.String), "endpoint_params": Schema.optionalKey(Schema.Record(Schema.String, Schema.String)), "grant_type": Schema.optionalKey(Schema.String), "iss": Schema.optionalKey(Schema.String), "no_proxy": Schema.optionalKey(Schema.String), "proxy_connect_header": Schema.optionalKey(ConfigProxyHeader), "proxy_from_environment": Schema.optionalKey(Schema.Boolean), "proxy_url": Schema.optionalKey(ConfigURL), "scopes": Schema.optionalKey(Schema.Array(Schema.String)), "signature_algorithm": Schema.optionalKey(Schema.String), "token_url": Schema.optionalKey(Schema.String) })
export type CoretypesResourceRef = { readonly "kind": CoretypesKind, readonly "type": CoretypesType }
export const CoretypesResourceRef = Schema.Struct({ "kind": CoretypesKind, "type": CoretypesType })
export type DashboardGridLayoutDisplay = { readonly "collapse"?: DashboardGridLayoutCollapse, readonly "title"?: string }
export const DashboardGridLayoutDisplay = Schema.Struct({ "collapse": Schema.optionalKey(DashboardGridLayoutCollapse), "title": Schema.optionalKey(Schema.String) })
export type DashboardtypesListedDashboardV2Spec = { readonly "display"?: DashboardtypesDisplay }
export const DashboardtypesListedDashboardV2Spec = Schema.Struct({ "display": Schema.optionalKey(DashboardtypesDisplay) })
export type DashboardtypesTextVariableSpec = { readonly "constant"?: boolean, readonly "display": DashboardtypesDisplay, readonly "name": string, readonly "value": string }
export const DashboardtypesTextVariableSpec = Schema.Struct({ "constant": Schema.optionalKey(Schema.Boolean), "display": DashboardtypesDisplay, "name": Schema.String.check(Schema.isMinLength(1)), "value": Schema.String })
export type DashboardtypesLegend = { readonly "customColors"?: {  }, readonly "mode"?: DashboardtypesLegendMode, readonly "position"?: DashboardtypesLegendPosition }
export const DashboardtypesLegend = Schema.Struct({ "customColors": Schema.optionalKey(Schema.Union([Schema.Struct({  })])), "mode": Schema.optionalKey(DashboardtypesLegendMode), "position": Schema.optionalKey(DashboardtypesLegendPosition) })
export type DashboardtypesDashboardViewData = { readonly "order"?: DashboardtypesListOrder, readonly "query"?: string, readonly "sort"?: DashboardtypesListSort, readonly "version": string }
export const DashboardtypesDashboardViewData = Schema.Struct({ "order": Schema.optionalKey(DashboardtypesListOrder), "query": Schema.optionalKey(Schema.String), "sort": Schema.optionalKey(DashboardtypesListSort), "version": Schema.String })
export type DashboardtypesPatchableDashboardV2 = ReadonlyArray<{ readonly "from"?: string, readonly "op": DashboardtypesPatchOp, readonly "path": string, readonly "value"?: Schema.Json }>
export const DashboardtypesPatchableDashboardV2 = Schema.Union([Schema.Array(Schema.Struct({ "from": Schema.optionalKey(Schema.String.annotate({ "description": "Source JSON Pointer for move/copy ops; ignored for other ops." })), "op": DashboardtypesPatchOp, "path": Schema.String.annotate({ "description": "JSON Pointer (RFC 6901) into the dashboard's postable shape — e.g. /spec/display/name, /spec/panels/<id>, /spec/panels/<id>/spec/queries/0, /tags/-." }), "value": Schema.optionalKey(Schema.Json.annotate({ "description": "Value to add/replace/test against. The expected type depends on the path. Common shapes (see referenced schemas for the exact field set): /spec/panels/<id> takes a DashboardtypesPanel; /spec/panels/<id>/spec/queries/N (or /-) takes a DashboardtypesQuery; /spec/variables/N takes a DashboardtypesVariable; /spec/layouts/N takes a DashboardtypesLayout; /tags/N (or /-) takes a TagtypesPostableTag; /spec/display/name and other leaf string fields take a string. Required for add/replace/test; ignored for remove/move/copy." })) }))])
export type DashboardtypesPanelFormatting = { readonly "decimalPrecision"?: DashboardtypesPrecisionOption, readonly "unit"?: string }
export const DashboardtypesPanelFormatting = Schema.Struct({ "decimalPrecision": Schema.optionalKey(DashboardtypesPrecisionOption), "unit": Schema.optionalKey(Schema.String) })
export type DashboardtypesTableFormatting = { readonly "columnUnits"?: {  }, readonly "decimalPrecision"?: DashboardtypesPrecisionOption }
export const DashboardtypesTableFormatting = Schema.Struct({ "columnUnits": Schema.optionalKey(Schema.Union([Schema.Struct({  })])), "decimalPrecision": Schema.optionalKey(DashboardtypesPrecisionOption) })
export type DashboardtypesDatasourcePlugin = { readonly "kind": "signoz/Datasource", readonly "spec": DashboardtypesSigNozDatasourceSpec }
export const DashboardtypesDatasourcePlugin = Schema.Union([Schema.Struct({ "kind": Schema.Literal("signoz/Datasource"), "spec": DashboardtypesSigNozDatasourceSpec })], { mode: "oneOf" })
export type DashboardtypesTimeSeriesChartAppearance = { readonly "fillMode"?: DashboardtypesFillMode, readonly "lineInterpolation"?: DashboardtypesLineInterpolation, readonly "lineStyle"?: DashboardtypesLineStyle, readonly "showPoints"?: boolean, readonly "spanGaps"?: DashboardtypesSpanGaps }
export const DashboardtypesTimeSeriesChartAppearance = Schema.Struct({ "fillMode": Schema.optionalKey(DashboardtypesFillMode), "lineInterpolation": Schema.optionalKey(DashboardtypesLineInterpolation), "lineStyle": Schema.optionalKey(DashboardtypesLineStyle), "showPoints": Schema.optionalKey(Schema.Boolean), "spanGaps": Schema.optionalKey(DashboardtypesSpanGaps) })
export type DashboardtypesDashboard = { readonly "createdAt"?: string, readonly "createdBy"?: string, readonly "data"?: DashboardtypesStorableDashboardData, readonly "id"?: string, readonly "locked"?: boolean, readonly "org_id"?: string, readonly "source"?: DashboardtypesSource, readonly "updatedAt"?: string, readonly "updatedBy"?: string }
export const DashboardtypesDashboard = Schema.Struct({ "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "createdBy": Schema.optionalKey(Schema.String), "data": Schema.optionalKey(DashboardtypesStorableDashboardData), "id": Schema.optionalKey(Schema.String), "locked": Schema.optionalKey(Schema.Boolean), "org_id": Schema.optionalKey(Schema.String), "source": Schema.optionalKey(DashboardtypesSource), "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "updatedBy": Schema.optionalKey(Schema.String) })
export type DashboardtypesBarChartVisualization = { readonly "fillSpans"?: boolean, readonly "stackedBarChart"?: boolean, readonly "timePreference"?: DashboardtypesTimePreference }
export const DashboardtypesBarChartVisualization = Schema.Struct({ "fillSpans": Schema.optionalKey(Schema.Boolean), "stackedBarChart": Schema.optionalKey(Schema.Boolean), "timePreference": Schema.optionalKey(DashboardtypesTimePreference) })
export type DashboardtypesBasicVisualization = { readonly "timePreference"?: DashboardtypesTimePreference }
export const DashboardtypesBasicVisualization = Schema.Struct({ "timePreference": Schema.optionalKey(DashboardtypesTimePreference) })
export type DashboardtypesTimeSeriesVisualization = { readonly "fillSpans"?: boolean, readonly "timePreference"?: DashboardtypesTimePreference }
export const DashboardtypesTimeSeriesVisualization = Schema.Struct({ "fillSpans": Schema.optionalKey(Schema.Boolean), "timePreference": Schema.optionalKey(DashboardtypesTimePreference) })
export type GatewaytypesLimitMetric = { readonly "day"?: GatewaytypesLimitMetricValue, readonly "second"?: GatewaytypesLimitMetricValue }
export const GatewaytypesLimitMetric = Schema.Struct({ "day": Schema.optionalKey(GatewaytypesLimitMetricValue), "second": Schema.optionalKey(GatewaytypesLimitMetricValue) })
export type GatewaytypesLimitConfig = { readonly "day"?: GatewaytypesLimitValue, readonly "second"?: GatewaytypesLimitValue }
export const GatewaytypesLimitConfig = Schema.Struct({ "day": Schema.optionalKey(GatewaytypesLimitValue), "second": Schema.optionalKey(GatewaytypesLimitValue) })
export type GlobaltypesIdentNConfig = { readonly "apikey"?: GlobaltypesAPIKeyConfig, readonly "impersonation"?: GlobaltypesImpersonationConfig, readonly "tokenizer"?: GlobaltypesTokenizerConfig }
export const GlobaltypesIdentNConfig = Schema.Struct({ "apikey": Schema.optionalKey(GlobaltypesAPIKeyConfig), "impersonation": Schema.optionalKey(GlobaltypesImpersonationConfig), "tokenizer": Schema.optionalKey(GlobaltypesTokenizerConfig) })
export type InframonitoringtypesAssociatedComponent = { readonly "name": string, readonly "type": InframonitoringtypesCheckComponentType }
export const InframonitoringtypesAssociatedComponent = Schema.Struct({ "name": Schema.String, "type": InframonitoringtypesCheckComponentType })
export type InframonitoringtypesContainerRecord = { readonly "containerCountsByReady": InframonitoringtypesContainerCountsByReady, readonly "containerCountsByStatus": InframonitoringtypesContainerCountsByStatus, readonly "containerName": string, readonly "cpu": number, readonly "cpuLimitUtilization": number, readonly "cpuRequestUtilization": number, readonly "memory": number, readonly "memoryLimitUtilization": number, readonly "memoryRequestUtilization": number, readonly "meta": {  }, readonly "podUID": string, readonly "ready": InframonitoringtypesContainerReady, readonly "restarts": number, readonly "status": InframonitoringtypesContainerStatus }
export const InframonitoringtypesContainerRecord = Schema.Struct({ "containerCountsByReady": InframonitoringtypesContainerCountsByReady, "containerCountsByStatus": InframonitoringtypesContainerCountsByStatus, "containerName": Schema.String, "cpu": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "cpuLimitUtilization": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "cpuRequestUtilization": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "memory": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "memoryLimitUtilization": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "memoryRequestUtilization": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "meta": Schema.Union([Schema.Struct({  })]), "podUID": Schema.String, "ready": InframonitoringtypesContainerReady, "restarts": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "status": InframonitoringtypesContainerStatus })
export type InframonitoringtypesHostFilter = { readonly "expression"?: string, readonly "filterByStatus"?: InframonitoringtypesHostStatus }
export const InframonitoringtypesHostFilter = Schema.Struct({ "expression": Schema.optionalKey(Schema.String), "filterByStatus": Schema.optionalKey(InframonitoringtypesHostStatus) })
export type InframonitoringtypesHostRecord = { readonly "activeHostCount": number, readonly "cpu": number, readonly "diskUsage": number, readonly "hostName": string, readonly "inactiveHostCount": number, readonly "load15": number, readonly "memory": number, readonly "meta": {  }, readonly "status": InframonitoringtypesHostStatus, readonly "wait": number }
export const InframonitoringtypesHostRecord = Schema.Struct({ "activeHostCount": Schema.Number.check(Schema.isInt()), "cpu": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "diskUsage": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "hostName": Schema.String, "inactiveHostCount": Schema.Number.check(Schema.isInt()), "load15": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "memory": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "meta": Schema.Union([Schema.Struct({  })]), "status": InframonitoringtypesHostStatus, "wait": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()) })
export type InframonitoringtypesClusterRecord = { readonly "clusterCPU": number, readonly "clusterCPUAllocatable": number, readonly "clusterMemory": number, readonly "clusterMemoryAllocatable": number, readonly "clusterName": string, readonly "counts": { readonly "daemonSets": number, readonly "deployments": number, readonly "jobs": number, readonly "namespaces": number, readonly "nodes": number, readonly "statefulSets": number }, readonly "meta": {  }, readonly "nodeCountsByReadiness": InframonitoringtypesNodeCountsByReadiness, readonly "podCountsByPhase": InframonitoringtypesPodCountsByPhase, readonly "podCountsByStatus": InframonitoringtypesPodCountsByStatus }
export const InframonitoringtypesClusterRecord = Schema.Struct({ "clusterCPU": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "clusterCPUAllocatable": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "clusterMemory": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "clusterMemoryAllocatable": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "clusterName": Schema.String, "counts": Schema.Struct({ "daemonSets": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "deployments": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "jobs": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "namespaces": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "nodes": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "statefulSets": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()) }), "meta": Schema.Union([Schema.Struct({  })]), "nodeCountsByReadiness": InframonitoringtypesNodeCountsByReadiness, "podCountsByPhase": InframonitoringtypesPodCountsByPhase, "podCountsByStatus": InframonitoringtypesPodCountsByStatus })
export type InframonitoringtypesDaemonSetRecord = { readonly "currentNodes": number, readonly "daemonSetCPU": number, readonly "daemonSetCPULimit": number, readonly "daemonSetCPURequest": number, readonly "daemonSetMemory": number, readonly "daemonSetMemoryLimit": number, readonly "daemonSetMemoryRequest": number, readonly "daemonSetName": string, readonly "desiredNodes": number, readonly "meta": {  }, readonly "misscheduledNodes": number, readonly "podCountsByPhase": InframonitoringtypesPodCountsByPhase, readonly "podCountsByStatus": InframonitoringtypesPodCountsByStatus, readonly "readyNodes": number }
export const InframonitoringtypesDaemonSetRecord = Schema.Struct({ "currentNodes": Schema.Number.check(Schema.isInt()), "daemonSetCPU": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "daemonSetCPULimit": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "daemonSetCPURequest": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "daemonSetMemory": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "daemonSetMemoryLimit": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "daemonSetMemoryRequest": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "daemonSetName": Schema.String, "desiredNodes": Schema.Number.check(Schema.isInt()), "meta": Schema.Union([Schema.Struct({  })]), "misscheduledNodes": Schema.Number.check(Schema.isInt()), "podCountsByPhase": InframonitoringtypesPodCountsByPhase, "podCountsByStatus": InframonitoringtypesPodCountsByStatus, "readyNodes": Schema.Number.check(Schema.isInt()) })
export type InframonitoringtypesDeploymentRecord = { readonly "availablePods": number, readonly "deploymentCPU": number, readonly "deploymentCPULimit": number, readonly "deploymentCPURequest": number, readonly "deploymentMemory": number, readonly "deploymentMemoryLimit": number, readonly "deploymentMemoryRequest": number, readonly "deploymentName": string, readonly "desiredPods": number, readonly "meta": {  }, readonly "podCountsByPhase": InframonitoringtypesPodCountsByPhase, readonly "podCountsByStatus": InframonitoringtypesPodCountsByStatus }
export const InframonitoringtypesDeploymentRecord = Schema.Struct({ "availablePods": Schema.Number.check(Schema.isInt()), "deploymentCPU": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "deploymentCPULimit": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "deploymentCPURequest": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "deploymentMemory": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "deploymentMemoryLimit": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "deploymentMemoryRequest": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "deploymentName": Schema.String, "desiredPods": Schema.Number.check(Schema.isInt()), "meta": Schema.Union([Schema.Struct({  })]), "podCountsByPhase": InframonitoringtypesPodCountsByPhase, "podCountsByStatus": InframonitoringtypesPodCountsByStatus })
export type InframonitoringtypesJobRecord = { readonly "activePods": number, readonly "desiredSuccessfulPods": number, readonly "failedPods": number, readonly "jobCPU": number, readonly "jobCPULimit": number, readonly "jobCPURequest": number, readonly "jobMemory": number, readonly "jobMemoryLimit": number, readonly "jobMemoryRequest": number, readonly "jobName": string, readonly "meta": {  }, readonly "podCountsByPhase": InframonitoringtypesPodCountsByPhase, readonly "podCountsByStatus": InframonitoringtypesPodCountsByStatus, readonly "successfulPods": number }
export const InframonitoringtypesJobRecord = Schema.Struct({ "activePods": Schema.Number.check(Schema.isInt()), "desiredSuccessfulPods": Schema.Number.check(Schema.isInt()), "failedPods": Schema.Number.check(Schema.isInt()), "jobCPU": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "jobCPULimit": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "jobCPURequest": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "jobMemory": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "jobMemoryLimit": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "jobMemoryRequest": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "jobName": Schema.String, "meta": Schema.Union([Schema.Struct({  })]), "podCountsByPhase": InframonitoringtypesPodCountsByPhase, "podCountsByStatus": InframonitoringtypesPodCountsByStatus, "successfulPods": Schema.Number.check(Schema.isInt()) })
export type InframonitoringtypesNamespaceRecord = { readonly "counts": { readonly "daemonSets": number, readonly "deployments": number, readonly "jobs": number, readonly "statefulSets": number }, readonly "meta": {  }, readonly "namespaceCPU": number, readonly "namespaceMemory": number, readonly "namespaceName": string, readonly "podCountsByPhase": InframonitoringtypesPodCountsByPhase, readonly "podCountsByStatus": InframonitoringtypesPodCountsByStatus }
export const InframonitoringtypesNamespaceRecord = Schema.Struct({ "counts": Schema.Struct({ "daemonSets": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "deployments": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "jobs": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "statefulSets": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()) }), "meta": Schema.Union([Schema.Struct({  })]), "namespaceCPU": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "namespaceMemory": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "namespaceName": Schema.String, "podCountsByPhase": InframonitoringtypesPodCountsByPhase, "podCountsByStatus": InframonitoringtypesPodCountsByStatus })
export type InframonitoringtypesNodeRecord = { readonly "condition": InframonitoringtypesNodeCondition, readonly "meta": {  }, readonly "nodeCPU": number, readonly "nodeCPUAllocatable": number, readonly "nodeCountsByReadiness": InframonitoringtypesNodeCountsByReadiness, readonly "nodeMemory": number, readonly "nodeMemoryAllocatable": number, readonly "nodeName": string, readonly "podCountsByPhase": InframonitoringtypesPodCountsByPhase, readonly "podCountsByStatus": InframonitoringtypesPodCountsByStatus }
export const InframonitoringtypesNodeRecord = Schema.Struct({ "condition": InframonitoringtypesNodeCondition, "meta": Schema.Union([Schema.Struct({  })]), "nodeCPU": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "nodeCPUAllocatable": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "nodeCountsByReadiness": InframonitoringtypesNodeCountsByReadiness, "nodeMemory": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "nodeMemoryAllocatable": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "nodeName": Schema.String, "podCountsByPhase": InframonitoringtypesPodCountsByPhase, "podCountsByStatus": InframonitoringtypesPodCountsByStatus })
export type InframonitoringtypesStatefulSetRecord = { readonly "currentPods": number, readonly "desiredPods": number, readonly "meta": {  }, readonly "podCountsByPhase": InframonitoringtypesPodCountsByPhase, readonly "podCountsByStatus": InframonitoringtypesPodCountsByStatus, readonly "statefulSetCPU": number, readonly "statefulSetCPULimit": number, readonly "statefulSetCPURequest": number, readonly "statefulSetMemory": number, readonly "statefulSetMemoryLimit": number, readonly "statefulSetMemoryRequest": number, readonly "statefulSetName": string }
export const InframonitoringtypesStatefulSetRecord = Schema.Struct({ "currentPods": Schema.Number.check(Schema.isInt()), "desiredPods": Schema.Number.check(Schema.isInt()), "meta": Schema.Union([Schema.Struct({  })]), "podCountsByPhase": InframonitoringtypesPodCountsByPhase, "podCountsByStatus": InframonitoringtypesPodCountsByStatus, "statefulSetCPU": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "statefulSetCPULimit": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "statefulSetCPURequest": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "statefulSetMemory": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "statefulSetMemoryLimit": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "statefulSetMemoryRequest": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "statefulSetName": Schema.String })
export type InframonitoringtypesPodRecord = { readonly "meta": {  }, readonly "podAge": number, readonly "podCPU": number, readonly "podCPULimit": number, readonly "podCPURequest": number, readonly "podCountsByPhase": InframonitoringtypesPodCountsByPhase, readonly "podCountsByStatus": InframonitoringtypesPodCountsByStatus, readonly "podMemory": number, readonly "podMemoryLimit": number, readonly "podMemoryRequest": number, readonly "podPhase": InframonitoringtypesPodPhase, readonly "podRestarts": number, readonly "podStatus": InframonitoringtypesPodStatus, readonly "podUID": string }
export const InframonitoringtypesPodRecord = Schema.Struct({ "meta": Schema.Union([Schema.Struct({  })]), "podAge": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "podCPU": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "podCPULimit": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "podCPURequest": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "podCountsByPhase": InframonitoringtypesPodCountsByPhase, "podCountsByStatus": InframonitoringtypesPodCountsByStatus, "podMemory": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "podMemoryLimit": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "podMemoryRequest": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "podPhase": InframonitoringtypesPodPhase, "podRestarts": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "podStatus": InframonitoringtypesPodStatus, "podUID": Schema.String })
export type LlmpricingruletypesLLMPricingCacheCosts = { readonly "mode": LlmpricingruletypesLLMPricingRuleCacheMode, readonly "read"?: number, readonly "write"?: number }
export const LlmpricingruletypesLLMPricingCacheCosts = Schema.Struct({ "mode": LlmpricingruletypesLLMPricingRuleCacheMode, "read": Schema.optionalKey(Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite())), "write": Schema.optionalKey(Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite())) })
export type MetricreductionruletypesGettableReductionRulePreview = { readonly "affectedAssets": ReadonlyArray<{ readonly "id": string, readonly "impactedLabels": ReadonlyArray<string>, readonly "name": string, readonly "type": MetricreductionruletypesAssetType, readonly "widget"?: MetricreductionruletypesAffectedWidget }>, readonly "currentRetainedSeries": number, readonly "droppedLabels": ReadonlyArray<string>, readonly "effectiveFrom": string, readonly "ingestedSeries": number, readonly "reductionPercent": number, readonly "retainedSeries": number }
export const MetricreductionruletypesGettableReductionRulePreview = Schema.Struct({ "affectedAssets": Schema.Union([Schema.Array(Schema.Struct({ "id": Schema.String, "impactedLabels": Schema.Union([Schema.Array(Schema.String)]), "name": Schema.String, "type": MetricreductionruletypesAssetType, "widget": Schema.optionalKey(MetricreductionruletypesAffectedWidget) }))]), "currentRetainedSeries": Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)), "droppedLabels": Schema.Union([Schema.Array(Schema.String)]), "effectiveFrom": Schema.String.annotate({ "format": "date-time" }), "ingestedSeries": Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)), "reductionPercent": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "retainedSeries": Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)) })
export type MetricreductionruletypesGettableReductionRule = { readonly "active": boolean, readonly "createdAt"?: string, readonly "createdBy"?: string, readonly "effectiveFrom": string, readonly "id": string, readonly "ingestedSamples": number, readonly "ingestedSeries": number, readonly "labels": ReadonlyArray<string>, readonly "matchType": MetricreductionruletypesMatchType, readonly "metricName": string, readonly "retainedSamples": number, readonly "retainedSeries": number, readonly "updatedAt"?: string, readonly "updatedBy"?: string }
export const MetricreductionruletypesGettableReductionRule = Schema.Struct({ "active": Schema.Boolean, "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "createdBy": Schema.optionalKey(Schema.String), "effectiveFrom": Schema.String.annotate({ "format": "date-time" }), "id": Schema.String, "ingestedSamples": Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)), "ingestedSeries": Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)), "labels": Schema.Union([Schema.Array(Schema.String)]), "matchType": MetricreductionruletypesMatchType, "metricName": Schema.String, "retainedSamples": Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)), "retainedSeries": Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)), "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "updatedBy": Schema.optionalKey(Schema.String) })
export type MetricreductionruletypesGettableReductionRules = { readonly "rules": ReadonlyArray<{ readonly "active": boolean, readonly "createdAt"?: string, readonly "createdBy"?: string, readonly "effectiveFrom": string, readonly "id": string, readonly "ingestedSamples": number, readonly "ingestedSeries": number, readonly "labels": ReadonlyArray<string>, readonly "matchType": MetricreductionruletypesMatchType, readonly "metricName": string, readonly "retainedSamples": number, readonly "retainedSeries": number, readonly "updatedAt"?: string, readonly "updatedBy"?: string }>, readonly "total": number }
export const MetricreductionruletypesGettableReductionRules = Schema.Struct({ "rules": Schema.Union([Schema.Array(Schema.Struct({ "active": Schema.Boolean, "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "createdBy": Schema.optionalKey(Schema.String), "effectiveFrom": Schema.String.annotate({ "format": "date-time" }), "id": Schema.String, "ingestedSamples": Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)), "ingestedSeries": Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)), "labels": Schema.Union([Schema.Array(Schema.String)]), "matchType": MetricreductionruletypesMatchType, "metricName": Schema.String, "retainedSamples": Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)), "retainedSeries": Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)), "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "updatedBy": Schema.optionalKey(Schema.String) }))]), "total": Schema.Number.check(Schema.isInt()) })
export type MetricreductionruletypesPostableReductionRule = { readonly "labels": ReadonlyArray<string>, readonly "matchType": MetricreductionruletypesMatchType, readonly "metricName": string }
export const MetricreductionruletypesPostableReductionRule = Schema.Struct({ "labels": Schema.Union([Schema.Array(Schema.String)]), "matchType": MetricreductionruletypesMatchType, "metricName": Schema.String })
export type MetricreductionruletypesPostableReductionRulePreview = { readonly "labels": ReadonlyArray<string>, readonly "lookbackMs"?: number, readonly "matchType": MetricreductionruletypesMatchType, readonly "metricName": string }
export const MetricreductionruletypesPostableReductionRulePreview = Schema.Struct({ "labels": Schema.Union([Schema.Array(Schema.String)]), "lookbackMs": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "matchType": MetricreductionruletypesMatchType, "metricName": Schema.String })
export type MetricreductionruletypesUpdatableReductionRule = { readonly "labels": ReadonlyArray<string>, readonly "matchType": MetricreductionruletypesMatchType }
export const MetricreductionruletypesUpdatableReductionRule = Schema.Struct({ "labels": Schema.Union([Schema.Array(Schema.String)]), "matchType": MetricreductionruletypesMatchType })
export type MetricsexplorertypesListMetricsResponse = { readonly "metrics": ReadonlyArray<{ readonly "description": string, readonly "isMonotonic": boolean, readonly "metricName": string, readonly "temporality": MetrictypesTemporality, readonly "type": MetrictypesType, readonly "unit": string }> }
export const MetricsexplorertypesListMetricsResponse = Schema.Struct({ "metrics": Schema.Union([Schema.Array(Schema.Struct({ "description": Schema.String, "isMonotonic": Schema.Boolean, "metricName": Schema.String, "temporality": MetrictypesTemporality, "type": MetrictypesType, "unit": Schema.String }))]) })
export type MetricsexplorertypesMetricMetadata = { readonly "description": string, readonly "isMonotonic": boolean, readonly "temporality": MetrictypesTemporality, readonly "type": MetrictypesType, readonly "unit": string }
export const MetricsexplorertypesMetricMetadata = Schema.Struct({ "description": Schema.String, "isMonotonic": Schema.Boolean, "temporality": MetrictypesTemporality, "type": MetrictypesType, "unit": Schema.String })
export type MetricsexplorertypesStatsResponse = { readonly "metrics": ReadonlyArray<{ readonly "description": string, readonly "metricName": string, readonly "samples": number, readonly "timeseries": number, readonly "type": MetrictypesType, readonly "unit": string }>, readonly "total": number }
export const MetricsexplorertypesStatsResponse = Schema.Struct({ "metrics": Schema.Union([Schema.Array(Schema.Struct({ "description": Schema.String, "metricName": Schema.String, "samples": Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)), "timeseries": Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)), "type": MetrictypesType, "unit": Schema.String }))]), "total": Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)) })
export type MetricsexplorertypesUpdateMetricMetadataRequest = { readonly "description": string, readonly "isMonotonic": boolean, readonly "metricName": string, readonly "temporality": MetrictypesTemporality, readonly "type": MetrictypesType, readonly "unit": string }
export const MetricsexplorertypesUpdateMetricMetadataRequest = Schema.Struct({ "description": Schema.String, "isMonotonic": Schema.Boolean, "metricName": Schema.String, "temporality": MetrictypesTemporality, "type": MetrictypesType, "unit": Schema.String })
export type PreferencetypesPreference = { readonly "allowedScopes"?: ReadonlyArray<string>, readonly "allowedValues"?: ReadonlyArray<string>, readonly "defaultValue"?: PreferencetypesValue, readonly "description"?: string, readonly "name"?: string, readonly "value"?: PreferencetypesValue, readonly "valueType"?: string }
export const PreferencetypesPreference = Schema.Struct({ "allowedScopes": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String)])), "allowedValues": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String)])), "defaultValue": Schema.optionalKey(PreferencetypesValue), "description": Schema.optionalKey(Schema.String), "name": Schema.optionalKey(Schema.String), "value": Schema.optionalKey(PreferencetypesValue), "valueType": Schema.optionalKey(Schema.String) })
export type MetricsexplorertypesInspectMetricsRequest = { readonly "end": number, readonly "filter"?: Querybuildertypesv5Filter, readonly "metricName": string, readonly "start": number }
export const MetricsexplorertypesInspectMetricsRequest = Schema.Struct({ "end": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "filter": Schema.optionalKey(Querybuildertypesv5Filter), "metricName": Schema.String, "start": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()) })
export type MetricsexplorertypesTreemapRequest = { readonly "end": number, readonly "filter"?: Querybuildertypesv5Filter, readonly "limit": number, readonly "mode": MetricsexplorertypesTreemapMode, readonly "start": number }
export const MetricsexplorertypesTreemapRequest = Schema.Struct({ "end": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "filter": Schema.optionalKey(Querybuildertypesv5Filter), "limit": Schema.Number.check(Schema.isInt()), "mode": MetricsexplorertypesTreemapMode, "start": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()) })
export type Querybuildertypesv5QueryWarnData = { readonly "message"?: string, readonly "url"?: string, readonly "warnings"?: ReadonlyArray<Querybuildertypesv5QueryWarnDataAdditional> }
export const Querybuildertypesv5QueryWarnData = Schema.Struct({ "message": Schema.optionalKey(Schema.String), "url": Schema.optionalKey(Schema.String), "warnings": Schema.optionalKey(Schema.Array(Querybuildertypesv5QueryWarnDataAdditional)) })
export type Querybuildertypesv5RawData = { readonly "nextCursor"?: string, readonly "queryName"?: string, readonly "rows"?: ReadonlyArray<Querybuildertypesv5RawRow> | null }
export const Querybuildertypesv5RawData = Schema.Struct({ "nextCursor": Schema.optionalKey(Schema.String), "queryName": Schema.optionalKey(Schema.String), "rows": Schema.optionalKey(Schema.Union([Schema.Array(Querybuildertypesv5RawRow), Schema.Null], { mode: "oneOf" })) })
export type Querybuildertypesv5PromQuery = { readonly "disabled"?: boolean, readonly "legend"?: string, readonly "name"?: string, readonly "query"?: string, readonly "stats"?: boolean, readonly "step"?: Querybuildertypesv5Step }
export const Querybuildertypesv5PromQuery = Schema.Struct({ "disabled": Schema.optionalKey(Schema.Boolean), "legend": Schema.optionalKey(Schema.String), "name": Schema.optionalKey(Schema.String), "query": Schema.optionalKey(Schema.String), "stats": Schema.optionalKey(Schema.Boolean), "step": Schema.optionalKey(Querybuildertypesv5Step) })
export type Querybuildertypesv5VariableItem = { readonly "type"?: Querybuildertypesv5VariableType, readonly "value"?: string | number | boolean | ReadonlyArray<string | number | boolean> }
export const Querybuildertypesv5VariableItem = Schema.Struct({ "type": Schema.optionalKey(Querybuildertypesv5VariableType), "value": Schema.optionalKey(Schema.Union([Schema.String, Schema.Number.check(Schema.isFinite()), Schema.Boolean, Schema.Array(Schema.Union([Schema.String, Schema.Number.check(Schema.isFinite()), Schema.Boolean], { mode: "oneOf" }))], { mode: "oneOf" })) })
export type RuletypesBasicRuleThresholds = ReadonlyArray<{ readonly "channels"?: ReadonlyArray<string>, readonly "matchType": RuletypesMatchType, readonly "name": string, readonly "op": RuletypesCompareOperator, readonly "recoveryTarget"?: never, readonly "target": never, readonly "targetUnit"?: string }>
export const RuletypesBasicRuleThresholds = Schema.Union([Schema.Array(Schema.Struct({ "channels": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String)])), "matchType": RuletypesMatchType, "name": Schema.String, "op": RuletypesCompareOperator, "recoveryTarget": Schema.optionalKey(Schema.Never), "target": Schema.Never, "targetUnit": Schema.optionalKey(Schema.String) }))])
export type RuletypesNotificationSettings = { readonly "groupBy"?: ReadonlyArray<string>, readonly "newGroupEvalDelay"?: string, readonly "renotify"?: RuletypesRenotify, readonly "usePolicy"?: boolean }
export const RuletypesNotificationSettings = Schema.Struct({ "groupBy": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String)])), "newGroupEvalDelay": Schema.optionalKey(Schema.String), "renotify": Schema.optionalKey(RuletypesRenotify), "usePolicy": Schema.optionalKey(Schema.Boolean) })
export type RuletypesCumulativeSchedule = { readonly "day"?: number | null, readonly "hour"?: number | null, readonly "minute"?: number | null, readonly "type": RuletypesScheduleType, readonly "weekday"?: number | null }
export const RuletypesCumulativeSchedule = Schema.Struct({ "day": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isInt()), Schema.Null])), "hour": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isInt()), Schema.Null])), "minute": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isInt()), Schema.Null])), "type": RuletypesScheduleType, "weekday": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isInt()), Schema.Null])) })
export type SpantypesPostableSpanMapperGroup = { readonly "condition": SpantypesSpanMapperGroupCondition, readonly "enabled"?: boolean, readonly "name": string }
export const SpantypesPostableSpanMapperGroup = Schema.Struct({ "condition": SpantypesSpanMapperGroupCondition, "enabled": Schema.optionalKey(Schema.Boolean), "name": Schema.String })
export type SpantypesSpanMapperGroup = { readonly "condition": SpantypesSpanMapperGroupCondition, readonly "createdAt"?: string, readonly "createdBy"?: string, readonly "enabled": boolean, readonly "id": string, readonly "name": string, readonly "orgId": string, readonly "updatedAt"?: string, readonly "updatedBy"?: string }
export const SpantypesSpanMapperGroup = Schema.Struct({ "condition": SpantypesSpanMapperGroupCondition, "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "createdBy": Schema.optionalKey(Schema.String), "enabled": Schema.Boolean, "id": Schema.String, "name": Schema.String, "orgId": Schema.String, "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "updatedBy": Schema.optionalKey(Schema.String) })
export type SpantypesUpdatableSpanMapperGroup = { readonly "condition"?: SpantypesSpanMapperGroupCondition, readonly "enabled"?: boolean | null, readonly "name"?: string | null }
export const SpantypesUpdatableSpanMapperGroup = Schema.Struct({ "condition": Schema.optionalKey(SpantypesSpanMapperGroupCondition), "enabled": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "name": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type SpantypesSpanMapperConfig = { readonly "sources": ReadonlyArray<{ readonly "context": SpantypesFieldContext, readonly "key": string, readonly "operation": SpantypesSpanMapperOperation, readonly "priority": number }> }
export const SpantypesSpanMapperConfig = Schema.Struct({ "sources": Schema.Union([Schema.Array(Schema.Struct({ "context": SpantypesFieldContext, "key": Schema.String, "operation": SpantypesSpanMapperOperation, "priority": Schema.Number.check(Schema.isInt()) }))]) })
export type TelemetrystoretypesMergeTreeRead = { readonly "steps": ReadonlyArray<TelemetrystoretypesIndexStep>, readonly "table": string }
export const TelemetrystoretypesMergeTreeRead = Schema.Struct({ "steps": Schema.Array(TelemetrystoretypesIndexStep), "table": Schema.String })
export type PromotetypesWrappedIndex = { readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "granularity"?: number, readonly "type"?: string }
export const PromotetypesWrappedIndex = Schema.Struct({ "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "granularity": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "type": Schema.optionalKey(Schema.String) })
export type DashboardtypesDynamicVariableSpec = { readonly "name": string, readonly "signal"?: TelemetrytypesSignal }
export const DashboardtypesDynamicVariableSpec = Schema.Struct({ "name": Schema.String, "signal": Schema.optionalKey(TelemetrytypesSignal) })
export type DashboardtypesListPanelSpec = { readonly "selectFields"?: ReadonlyArray<{ readonly "description"?: string, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "name": string, readonly "signal"?: TelemetrytypesSignal, readonly "unit"?: string }> }
export const DashboardtypesListPanelSpec = Schema.Struct({ "selectFields": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "description": Schema.optionalKey(Schema.String), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "name": Schema.String, "signal": Schema.optionalKey(TelemetrytypesSignal), "unit": Schema.optionalKey(Schema.String) }))])) })
export type Querybuildertypesv5ColumnDescriptor = { readonly "aggregationIndex"?: number, readonly "columnType"?: Querybuildertypesv5ColumnType, readonly "description"?: string, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "meta"?: { readonly "unit"?: string }, readonly "name": string, readonly "queryName"?: string, readonly "signal"?: TelemetrytypesSignal, readonly "unit"?: string }
export const Querybuildertypesv5ColumnDescriptor = Schema.Struct({ "aggregationIndex": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "columnType": Schema.optionalKey(Querybuildertypesv5ColumnType), "description": Schema.optionalKey(Schema.String), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "meta": Schema.optionalKey(Schema.Struct({ "unit": Schema.optionalKey(Schema.String) })), "name": Schema.String, "queryName": Schema.optionalKey(Schema.String), "signal": Schema.optionalKey(TelemetrytypesSignal), "unit": Schema.optionalKey(Schema.String) })
export type Querybuildertypesv5OrderByKey = { readonly "description"?: string, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "name": string, readonly "signal"?: TelemetrytypesSignal, readonly "unit"?: string }
export const Querybuildertypesv5OrderByKey = Schema.Struct({ "description": Schema.optionalKey(Schema.String), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "name": Schema.String, "signal": Schema.optionalKey(TelemetrytypesSignal), "unit": Schema.optionalKey(Schema.String) })
export type TelemetrytypesTelemetryFieldKey = { readonly "description"?: string, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "name": string, readonly "signal"?: TelemetrytypesSignal, readonly "unit"?: string }
export const TelemetrytypesTelemetryFieldKey = Schema.Struct({ "description": Schema.optionalKey(Schema.String), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "name": Schema.String, "signal": Schema.optionalKey(TelemetrytypesSignal), "unit": Schema.optionalKey(Schema.String) })
export type TelemetrytypesGettableFieldValues = { readonly "complete": boolean, readonly "values": TelemetrytypesTelemetryFieldValues }
export const TelemetrytypesGettableFieldValues = Schema.Struct({ "complete": Schema.Boolean, "values": TelemetrytypesTelemetryFieldValues })
export type ErrorsResponseretryjson = { readonly "delay": TimeDuration }
export const ErrorsResponseretryjson = Schema.Struct({ "delay": TimeDuration })
export type AlertmanagertypesDeprecatedGettableAlert = { readonly "annotations"?: ModelLabelSet, readonly "endsAt"?: string, readonly "fingerprint"?: string, readonly "generatorURL"?: string, readonly "labels"?: ModelLabelSet, readonly "receivers"?: ReadonlyArray<string>, readonly "startsAt"?: string, readonly "status"?: TypesAlertStatus }
export const AlertmanagertypesDeprecatedGettableAlert = Schema.Struct({ "annotations": Schema.optionalKey(ModelLabelSet), "endsAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "fingerprint": Schema.optionalKey(Schema.String), "generatorURL": Schema.optionalKey(Schema.String), "labels": Schema.optionalKey(ModelLabelSet), "receivers": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String)])), "startsAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "status": Schema.optionalKey(TypesAlertStatus) })
export type TypesPostableBulkInviteRequest = { readonly "invites": ReadonlyArray<TypesPostableInvite> }
export const TypesPostableBulkInviteRequest = Schema.Struct({ "invites": Schema.Array(TypesPostableInvite) })
export type SpantypesEvent = { readonly "attributeMap"?: { readonly [x: string]: Schema.Json }, readonly "isError"?: boolean, readonly "name"?: string, readonly "timeUnixNano"?: SignoztypesInt64 }
export const SpantypesEvent = Schema.Struct({ "attributeMap": Schema.optionalKey(Schema.Record(Schema.String, Schema.Json)), "isError": Schema.optionalKey(Schema.Boolean), "name": Schema.optionalKey(Schema.String), "timeUnixNano": Schema.optionalKey(SignoztypesInt64) })
export type AlertmanagertypesSchedule = { readonly "endTime"?: string, readonly "recurrence"?: AlertmanagertypesRecurrence, readonly "startTime": string, readonly "timezone": string }
export const AlertmanagertypesSchedule = Schema.Struct({ "endTime": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "recurrence": Schema.optionalKey(AlertmanagertypesRecurrence), "startTime": Schema.String.annotate({ "format": "date-time" }), "timezone": Schema.String })
export type AuthtypesAuthDomainConfig = { readonly "attributeMapping"?: AuthtypesAttributeMapping, readonly "insecureSkipAuthNRequestsSigned"?: boolean, readonly "samlCert"?: string, readonly "samlEntity"?: string, readonly "samlIdp"?: string, readonly "googleAuthConfig"?: AuthtypesGoogleConfig, readonly "oidcConfig"?: AuthtypesOIDCConfig, readonly "roleMapping"?: AuthtypesRoleMapping, readonly "samlConfig"?: AuthtypesSamlConfig, readonly "ssoEnabled"?: boolean, readonly "ssoType"?: AuthtypesAuthNProvider } | { readonly "allowedGroups"?: ReadonlyArray<string>, readonly "clientId"?: string, readonly "clientSecret"?: string, readonly "domainToAdminEmail"?: { readonly [x: string]: string }, readonly "fetchGroups"?: boolean, readonly "fetchTransitiveGroupMembership"?: boolean, readonly "insecureSkipEmailVerified"?: boolean, readonly "redirectURI"?: string, readonly "serviceAccountJson"?: string, readonly "googleAuthConfig"?: AuthtypesGoogleConfig, readonly "oidcConfig"?: AuthtypesOIDCConfig, readonly "roleMapping"?: AuthtypesRoleMapping, readonly "samlConfig"?: AuthtypesSamlConfig, readonly "ssoEnabled"?: boolean, readonly "ssoType"?: AuthtypesAuthNProvider } | { readonly "claimMapping"?: AuthtypesAttributeMapping, readonly "clientId"?: string, readonly "clientSecret"?: string, readonly "getUserInfo"?: boolean, readonly "insecureSkipEmailVerified"?: boolean, readonly "issuer"?: string, readonly "issuerAlias"?: string, readonly "googleAuthConfig"?: AuthtypesGoogleConfig, readonly "oidcConfig"?: AuthtypesOIDCConfig, readonly "roleMapping"?: AuthtypesRoleMapping, readonly "samlConfig"?: AuthtypesSamlConfig, readonly "ssoEnabled"?: boolean, readonly "ssoType"?: AuthtypesAuthNProvider }
export const AuthtypesAuthDomainConfig = Schema.Union([Schema.Struct({ "attributeMapping": Schema.optionalKey(AuthtypesAttributeMapping), "insecureSkipAuthNRequestsSigned": Schema.optionalKey(Schema.Boolean), "samlCert": Schema.optionalKey(Schema.String), "samlEntity": Schema.optionalKey(Schema.String), "samlIdp": Schema.optionalKey(Schema.String), "googleAuthConfig": Schema.optionalKey(AuthtypesGoogleConfig), "oidcConfig": Schema.optionalKey(AuthtypesOIDCConfig), "roleMapping": Schema.optionalKey(AuthtypesRoleMapping), "samlConfig": Schema.optionalKey(AuthtypesSamlConfig), "ssoEnabled": Schema.optionalKey(Schema.Boolean), "ssoType": Schema.optionalKey(AuthtypesAuthNProvider) }), Schema.Struct({ "allowedGroups": Schema.optionalKey(Schema.Array(Schema.String)), "clientId": Schema.optionalKey(Schema.String), "clientSecret": Schema.optionalKey(Schema.String), "domainToAdminEmail": Schema.optionalKey(Schema.Record(Schema.String, Schema.String)), "fetchGroups": Schema.optionalKey(Schema.Boolean), "fetchTransitiveGroupMembership": Schema.optionalKey(Schema.Boolean), "insecureSkipEmailVerified": Schema.optionalKey(Schema.Boolean), "redirectURI": Schema.optionalKey(Schema.String), "serviceAccountJson": Schema.optionalKey(Schema.String), "googleAuthConfig": Schema.optionalKey(AuthtypesGoogleConfig), "oidcConfig": Schema.optionalKey(AuthtypesOIDCConfig), "roleMapping": Schema.optionalKey(AuthtypesRoleMapping), "samlConfig": Schema.optionalKey(AuthtypesSamlConfig), "ssoEnabled": Schema.optionalKey(Schema.Boolean), "ssoType": Schema.optionalKey(AuthtypesAuthNProvider) }), Schema.Struct({ "claimMapping": Schema.optionalKey(AuthtypesAttributeMapping), "clientId": Schema.optionalKey(Schema.String), "clientSecret": Schema.optionalKey(Schema.String), "getUserInfo": Schema.optionalKey(Schema.Boolean), "insecureSkipEmailVerified": Schema.optionalKey(Schema.Boolean), "issuer": Schema.optionalKey(Schema.String), "issuerAlias": Schema.optionalKey(Schema.String), "googleAuthConfig": Schema.optionalKey(AuthtypesGoogleConfig), "oidcConfig": Schema.optionalKey(AuthtypesOIDCConfig), "roleMapping": Schema.optionalKey(AuthtypesRoleMapping), "samlConfig": Schema.optionalKey(AuthtypesSamlConfig), "ssoEnabled": Schema.optionalKey(Schema.Boolean), "ssoType": Schema.optionalKey(AuthtypesAuthNProvider) })], { mode: "oneOf" })
export type CloudintegrationtypesAWSTelemetryCollectionStrategy = { readonly "logs"?: CloudintegrationtypesAWSLogsCollectionStrategy, readonly "metrics"?: CloudintegrationtypesAWSMetricsCollectionStrategy, readonly "s3Buckets"?: { readonly [x: string]: ReadonlyArray<string> } }
export const CloudintegrationtypesAWSTelemetryCollectionStrategy = Schema.Struct({ "logs": Schema.optionalKey(CloudintegrationtypesAWSLogsCollectionStrategy), "metrics": Schema.optionalKey(CloudintegrationtypesAWSMetricsCollectionStrategy), "s3Buckets": Schema.optionalKey(Schema.Record(Schema.String, Schema.Array(Schema.String))) })
export type CloudintegrationtypesAzureIntegrationConfig = { readonly "deploymentRegion": string, readonly "resourceGroups": ReadonlyArray<string>, readonly "telemetryCollectionStrategy": ReadonlyArray<CloudintegrationtypesAzureTelemetryCollectionStrategy> }
export const CloudintegrationtypesAzureIntegrationConfig = Schema.Struct({ "deploymentRegion": Schema.String, "resourceGroups": Schema.Array(Schema.String), "telemetryCollectionStrategy": Schema.Array(CloudintegrationtypesAzureTelemetryCollectionStrategy) })
export type CloudintegrationtypesAccount = { readonly "agentReport": CloudintegrationtypesAgentReport, readonly "config": CloudintegrationtypesAccountConfig, readonly "createdAt"?: string, readonly "id": string, readonly "orgId": string, readonly "provider": string, readonly "providerAccountId": string | null, readonly "removedAt": string, readonly "updatedAt"?: string }
export const CloudintegrationtypesAccount = Schema.Struct({ "agentReport": CloudintegrationtypesAgentReport, "config": CloudintegrationtypesAccountConfig, "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "id": Schema.String, "orgId": Schema.String, "provider": Schema.String, "providerAccountId": Schema.Union([Schema.String, Schema.Null]), "removedAt": Schema.Union([Schema.String.annotate({ "format": "date-time" })]), "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })) })
export type CloudintegrationtypesPostableAccount = { readonly "config": CloudintegrationtypesPostableAccountConfig, readonly "credentials": CloudintegrationtypesCredentials }
export const CloudintegrationtypesPostableAccount = Schema.Struct({ "config": CloudintegrationtypesPostableAccountConfig, "credentials": CloudintegrationtypesCredentials })
export type CloudintegrationtypesGettableAccountWithConnectionArtifact = { readonly "connectionArtifact": CloudintegrationtypesConnectionArtifact, readonly "id": string }
export const CloudintegrationtypesGettableAccountWithConnectionArtifact = Schema.Struct({ "connectionArtifact": CloudintegrationtypesConnectionArtifact, "id": Schema.String })
export type CloudintegrationtypesServiceConfig = { readonly "aws"?: CloudintegrationtypesAWSServiceConfig, readonly "azure"?: CloudintegrationtypesAzureServiceConfig, readonly "gcp"?: CloudintegrationtypesGCPServiceConfig }
export const CloudintegrationtypesServiceConfig = Schema.Struct({ "aws": Schema.optionalKey(CloudintegrationtypesAWSServiceConfig), "azure": Schema.optionalKey(CloudintegrationtypesAzureServiceConfig), "gcp": Schema.optionalKey(CloudintegrationtypesGCPServiceConfig) })
export type CloudintegrationtypesIntegrationConfig = { readonly "enabled_regions": ReadonlyArray<string>, readonly "telemetry": CloudintegrationtypesOldAWSCollectionStrategy }
export const CloudintegrationtypesIntegrationConfig = Schema.Union([Schema.Struct({ "enabled_regions": Schema.Array(Schema.String), "telemetry": CloudintegrationtypesOldAWSCollectionStrategy })])
export type CloudintegrationtypesServiceAssets = { readonly "dashboards": ReadonlyArray<CloudintegrationtypesServiceDashboard> }
export const CloudintegrationtypesServiceAssets = Schema.Struct({ "dashboards": Schema.Array(CloudintegrationtypesServiceDashboard) })
export type CloudintegrationtypesUpdatableAccount = { readonly "config": CloudintegrationtypesUpdatableAccountConfig }
export const CloudintegrationtypesUpdatableAccount = Schema.Struct({ "config": CloudintegrationtypesUpdatableAccountConfig })
export type ConfigHTTPClientConfig = { readonly "authorization"?: ConfigAuthorization, readonly "basic_auth"?: ConfigBasicAuth, readonly "bearer_token"?: string, readonly "bearer_token_file"?: string, readonly "enable_http2"?: boolean, readonly "follow_redirects"?: boolean, readonly "http_headers"?: ConfigHeaders, readonly "no_proxy"?: string, readonly "oauth2"?: ConfigOAuth2, readonly "proxy_connect_header"?: ConfigProxyHeader, readonly "proxy_from_environment"?: boolean, readonly "proxy_url"?: ConfigURL, readonly "tls_config"?: ConfigTLSConfig }
export const ConfigHTTPClientConfig = Schema.Struct({ "authorization": Schema.optionalKey(ConfigAuthorization), "basic_auth": Schema.optionalKey(ConfigBasicAuth), "bearer_token": Schema.optionalKey(Schema.String), "bearer_token_file": Schema.optionalKey(Schema.String), "enable_http2": Schema.optionalKey(Schema.Boolean), "follow_redirects": Schema.optionalKey(Schema.Boolean), "http_headers": Schema.optionalKey(ConfigHeaders), "no_proxy": Schema.optionalKey(Schema.String), "oauth2": Schema.optionalKey(ConfigOAuth2), "proxy_connect_header": Schema.optionalKey(ConfigProxyHeader), "proxy_from_environment": Schema.optionalKey(Schema.Boolean), "proxy_url": Schema.optionalKey(ConfigURL), "tls_config": Schema.optionalKey(ConfigTLSConfig) })
export type CoretypesObject = { readonly "resource": CoretypesResourceRef, readonly "selector": string }
export const CoretypesObject = Schema.Struct({ "resource": CoretypesResourceRef, "selector": Schema.String })
export type CoretypesObjectGroup = { readonly "resource": CoretypesResourceRef, readonly "selectors": ReadonlyArray<string> }
export const CoretypesObjectGroup = Schema.Struct({ "resource": CoretypesResourceRef, "selectors": Schema.Array(Schema.String) })
export type DashboardGridLayoutSpec = { readonly "display"?: DashboardGridLayoutDisplay, readonly "items"?: ReadonlyArray<{ readonly "content"?: CommonJSONRef, readonly "height"?: number, readonly "width"?: number, readonly "x"?: number, readonly "y"?: number }>, readonly "repeatVariable"?: string }
export const DashboardGridLayoutSpec = Schema.Struct({ "display": Schema.optionalKey(DashboardGridLayoutDisplay), "items": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "content": Schema.optionalKey(CommonJSONRef), "height": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "width": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "x": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "y": Schema.optionalKey(Schema.Number.check(Schema.isInt())) }))])), "repeatVariable": Schema.optionalKey(Schema.String) })
export type DashboardtypesListedDashboardForUserV2 = { readonly "createdAt"?: string, readonly "createdBy"?: string, readonly "id": string, readonly "image"?: string, readonly "legacy": boolean, readonly "locked": boolean, readonly "name": string, readonly "orgId": string, readonly "pinned": boolean, readonly "schemaVersion": string, readonly "source": DashboardtypesSource, readonly "spec": DashboardtypesListedDashboardV2Spec, readonly "tags": ReadonlyArray<TagtypesGettableTag>, readonly "updatedAt"?: string, readonly "updatedBy"?: string }
export const DashboardtypesListedDashboardForUserV2 = Schema.Struct({ "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "createdBy": Schema.optionalKey(Schema.String), "id": Schema.String, "image": Schema.optionalKey(Schema.String), "legacy": Schema.Boolean, "locked": Schema.Boolean, "name": Schema.String, "orgId": Schema.String, "pinned": Schema.Boolean, "schemaVersion": Schema.String, "source": DashboardtypesSource, "spec": DashboardtypesListedDashboardV2Spec, "tags": Schema.Array(TagtypesGettableTag), "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "updatedBy": Schema.optionalKey(Schema.String) })
export type DashboardtypesListedDashboardV2 = { readonly "createdAt"?: string, readonly "createdBy"?: string, readonly "id": string, readonly "image"?: string, readonly "legacy": boolean, readonly "locked": boolean, readonly "name": string, readonly "orgId": string, readonly "schemaVersion": string, readonly "source": DashboardtypesSource, readonly "spec": DashboardtypesListedDashboardV2Spec, readonly "tags": ReadonlyArray<TagtypesGettableTag>, readonly "updatedAt"?: string, readonly "updatedBy"?: string }
export const DashboardtypesListedDashboardV2 = Schema.Struct({ "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "createdBy": Schema.optionalKey(Schema.String), "id": Schema.String, "image": Schema.optionalKey(Schema.String), "legacy": Schema.Boolean, "locked": Schema.Boolean, "name": Schema.String, "orgId": Schema.String, "schemaVersion": Schema.String, "source": DashboardtypesSource, "spec": DashboardtypesListedDashboardV2Spec, "tags": Schema.Array(TagtypesGettableTag), "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "updatedBy": Schema.optionalKey(Schema.String) })
export type DashboardtypesHistogramPanelSpec = { readonly "histogramBuckets"?: DashboardtypesHistogramBuckets, readonly "legend"?: DashboardtypesLegend }
export const DashboardtypesHistogramPanelSpec = Schema.Struct({ "histogramBuckets": Schema.optionalKey(DashboardtypesHistogramBuckets), "legend": Schema.optionalKey(DashboardtypesLegend) })
export type DashboardtypesDashboardView = { readonly "createdAt"?: string, readonly "data": DashboardtypesDashboardViewData, readonly "id": string, readonly "name": string, readonly "orgId": string, readonly "updatedAt"?: string }
export const DashboardtypesDashboardView = Schema.Struct({ "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "data": DashboardtypesDashboardViewData, "id": Schema.String, "name": Schema.String, "orgId": Schema.String, "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })) })
export type DashboardtypesPostableDashboardView = { readonly "data": DashboardtypesDashboardViewData, readonly "name": string }
export const DashboardtypesPostableDashboardView = Schema.Struct({ "data": DashboardtypesDashboardViewData, "name": Schema.String })
export type DashboardtypesGettablePublicDashboardData = { readonly "dashboard"?: DashboardtypesDashboard, readonly "publicDashboard"?: DashboardtypesGettablePublicDasbhboard }
export const DashboardtypesGettablePublicDashboardData = Schema.Struct({ "dashboard": Schema.optionalKey(DashboardtypesDashboard), "publicDashboard": Schema.optionalKey(DashboardtypesGettablePublicDasbhboard) })
export type DashboardtypesBarChartPanelSpec = { readonly "axes"?: DashboardtypesAxes, readonly "formatting"?: DashboardtypesPanelFormatting, readonly "legend"?: DashboardtypesLegend, readonly "thresholds"?: ReadonlyArray<{ readonly "color": string, readonly "label"?: string, readonly "unit"?: string, readonly "value": number }>, readonly "visualization"?: DashboardtypesBarChartVisualization }
export const DashboardtypesBarChartPanelSpec = Schema.Struct({ "axes": Schema.optionalKey(DashboardtypesAxes), "formatting": Schema.optionalKey(DashboardtypesPanelFormatting), "legend": Schema.optionalKey(DashboardtypesLegend), "thresholds": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "color": Schema.String, "label": Schema.optionalKey(Schema.String), "unit": Schema.optionalKey(Schema.String), "value": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()) }))])), "visualization": Schema.optionalKey(DashboardtypesBarChartVisualization) })
export type DashboardtypesNumberPanelSpec = { readonly "formatting"?: DashboardtypesPanelFormatting, readonly "thresholds"?: ReadonlyArray<{ readonly "color": string, readonly "format"?: DashboardtypesThresholdFormat, readonly "operator"?: DashboardtypesComparisonOperator, readonly "unit"?: string, readonly "value": number }>, readonly "visualization"?: DashboardtypesBasicVisualization }
export const DashboardtypesNumberPanelSpec = Schema.Struct({ "formatting": Schema.optionalKey(DashboardtypesPanelFormatting), "thresholds": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "color": Schema.String, "format": Schema.optionalKey(DashboardtypesThresholdFormat), "operator": Schema.optionalKey(DashboardtypesComparisonOperator), "unit": Schema.optionalKey(Schema.String), "value": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()) }))])), "visualization": Schema.optionalKey(DashboardtypesBasicVisualization) })
export type DashboardtypesPieChartPanelSpec = { readonly "formatting"?: DashboardtypesPanelFormatting, readonly "legend"?: DashboardtypesLegend, readonly "visualization"?: DashboardtypesBasicVisualization }
export const DashboardtypesPieChartPanelSpec = Schema.Struct({ "formatting": Schema.optionalKey(DashboardtypesPanelFormatting), "legend": Schema.optionalKey(DashboardtypesLegend), "visualization": Schema.optionalKey(DashboardtypesBasicVisualization) })
export type DashboardtypesTablePanelSpec = { readonly "formatting"?: DashboardtypesTableFormatting, readonly "thresholds"?: ReadonlyArray<{ readonly "color": string, readonly "columnName": string, readonly "format"?: DashboardtypesThresholdFormat, readonly "operator"?: DashboardtypesComparisonOperator, readonly "unit"?: string, readonly "value": number }>, readonly "visualization"?: DashboardtypesBasicVisualization }
export const DashboardtypesTablePanelSpec = Schema.Struct({ "formatting": Schema.optionalKey(DashboardtypesTableFormatting), "thresholds": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "color": Schema.String, "columnName": Schema.String, "format": Schema.optionalKey(DashboardtypesThresholdFormat), "operator": Schema.optionalKey(DashboardtypesComparisonOperator), "unit": Schema.optionalKey(Schema.String), "value": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()) }))])), "visualization": Schema.optionalKey(DashboardtypesBasicVisualization) })
export type DashboardtypesTimeSeriesPanelSpec = { readonly "axes"?: DashboardtypesAxes, readonly "chartAppearance"?: DashboardtypesTimeSeriesChartAppearance, readonly "formatting"?: DashboardtypesPanelFormatting, readonly "legend"?: DashboardtypesLegend, readonly "thresholds"?: ReadonlyArray<{ readonly "color": string, readonly "label"?: string, readonly "unit"?: string, readonly "value": number }>, readonly "visualization"?: DashboardtypesTimeSeriesVisualization }
export const DashboardtypesTimeSeriesPanelSpec = Schema.Struct({ "axes": Schema.optionalKey(DashboardtypesAxes), "chartAppearance": Schema.optionalKey(DashboardtypesTimeSeriesChartAppearance), "formatting": Schema.optionalKey(DashboardtypesPanelFormatting), "legend": Schema.optionalKey(DashboardtypesLegend), "thresholds": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "color": Schema.String, "label": Schema.optionalKey(Schema.String), "unit": Schema.optionalKey(Schema.String), "value": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()) }))])), "visualization": Schema.optionalKey(DashboardtypesTimeSeriesVisualization) })
export type GatewaytypesGettableIngestionKeys = { readonly "_pagination"?: GatewaytypesPagination, readonly "keys"?: ReadonlyArray<{ readonly "created_at"?: string, readonly "expires_at"?: string, readonly "id"?: string, readonly "limits"?: ReadonlyArray<{ readonly "config"?: GatewaytypesLimitConfig, readonly "created_at"?: string, readonly "id"?: string, readonly "key_id"?: string, readonly "metric"?: GatewaytypesLimitMetric, readonly "signal"?: string, readonly "tags"?: ReadonlyArray<string>, readonly "updated_at"?: string }>, readonly "name"?: string, readonly "tags"?: ReadonlyArray<string>, readonly "updated_at"?: string, readonly "value"?: string, readonly "workspace_id"?: string }> }
export const GatewaytypesGettableIngestionKeys = Schema.Struct({ "_pagination": Schema.optionalKey(GatewaytypesPagination), "keys": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "created_at": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "expires_at": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "id": Schema.optionalKey(Schema.String), "limits": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "config": Schema.optionalKey(GatewaytypesLimitConfig), "created_at": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "id": Schema.optionalKey(Schema.String), "key_id": Schema.optionalKey(Schema.String), "metric": Schema.optionalKey(GatewaytypesLimitMetric), "signal": Schema.optionalKey(Schema.String), "tags": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String)])), "updated_at": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })) }))])), "name": Schema.optionalKey(Schema.String), "tags": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String)])), "updated_at": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "value": Schema.optionalKey(Schema.String), "workspace_id": Schema.optionalKey(Schema.String) }))])) })
export type GatewaytypesPostableIngestionKeyLimit = { readonly "config"?: GatewaytypesLimitConfig, readonly "signal"?: string, readonly "tags"?: ReadonlyArray<string> }
export const GatewaytypesPostableIngestionKeyLimit = Schema.Struct({ "config": Schema.optionalKey(GatewaytypesLimitConfig), "signal": Schema.optionalKey(Schema.String), "tags": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String)])) })
export type GatewaytypesUpdatableIngestionKeyLimit = { readonly "config": GatewaytypesLimitConfig, readonly "tags"?: ReadonlyArray<string> }
export const GatewaytypesUpdatableIngestionKeyLimit = Schema.Struct({ "config": GatewaytypesLimitConfig, "tags": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String)])) })
export type GlobaltypesConfig = { readonly "ai_assistant_url": string | null, readonly "external_url": string, readonly "identN"?: GlobaltypesIdentNConfig, readonly "ingestion_url": string, readonly "mcp_url": string | null }
export const GlobaltypesConfig = Schema.Struct({ "ai_assistant_url": Schema.Union([Schema.String, Schema.Null]), "external_url": Schema.String, "identN": Schema.optionalKey(GlobaltypesIdentNConfig), "ingestion_url": Schema.String, "mcp_url": Schema.Union([Schema.String, Schema.Null]) })
export type InframonitoringtypesChecks = { readonly "missingDefaultEnabledMetrics": ReadonlyArray<{ readonly "associatedComponent": InframonitoringtypesAssociatedComponent, readonly "documentationLink": string, readonly "message": string, readonly "metrics": ReadonlyArray<string> }>, readonly "missingOptionalMetrics": ReadonlyArray<{ readonly "associatedComponent": InframonitoringtypesAssociatedComponent, readonly "documentationLink": string, readonly "message": string, readonly "metrics": ReadonlyArray<string> }>, readonly "missingRequiredAttributes": ReadonlyArray<{ readonly "associatedComponent": InframonitoringtypesAssociatedComponent, readonly "attributes": ReadonlyArray<string>, readonly "documentationLink": string, readonly "message": string }>, readonly "presentDefaultEnabledMetrics": ReadonlyArray<{ readonly "associatedComponent": InframonitoringtypesAssociatedComponent, readonly "metrics": ReadonlyArray<string> }>, readonly "presentOptionalMetrics": ReadonlyArray<{ readonly "associatedComponent": InframonitoringtypesAssociatedComponent, readonly "metrics": ReadonlyArray<string> }>, readonly "presentRequiredAttributes": ReadonlyArray<{ readonly "associatedComponent": InframonitoringtypesAssociatedComponent, readonly "attributes": ReadonlyArray<string> }>, readonly "ready": boolean, readonly "type": InframonitoringtypesCheckType }
export const InframonitoringtypesChecks = Schema.Struct({ "missingDefaultEnabledMetrics": Schema.Union([Schema.Array(Schema.Struct({ "associatedComponent": InframonitoringtypesAssociatedComponent, "documentationLink": Schema.String, "message": Schema.String, "metrics": Schema.Union([Schema.Array(Schema.String)]) }))]), "missingOptionalMetrics": Schema.Union([Schema.Array(Schema.Struct({ "associatedComponent": InframonitoringtypesAssociatedComponent, "documentationLink": Schema.String, "message": Schema.String, "metrics": Schema.Union([Schema.Array(Schema.String)]) }))]), "missingRequiredAttributes": Schema.Union([Schema.Array(Schema.Struct({ "associatedComponent": InframonitoringtypesAssociatedComponent, "attributes": Schema.Union([Schema.Array(Schema.String)]), "documentationLink": Schema.String, "message": Schema.String }))]), "presentDefaultEnabledMetrics": Schema.Union([Schema.Array(Schema.Struct({ "associatedComponent": InframonitoringtypesAssociatedComponent, "metrics": Schema.Union([Schema.Array(Schema.String)]) }))]), "presentOptionalMetrics": Schema.Union([Schema.Array(Schema.Struct({ "associatedComponent": InframonitoringtypesAssociatedComponent, "metrics": Schema.Union([Schema.Array(Schema.String)]) }))]), "presentRequiredAttributes": Schema.Union([Schema.Array(Schema.Struct({ "associatedComponent": InframonitoringtypesAssociatedComponent, "attributes": Schema.Union([Schema.Array(Schema.String)]) }))]), "ready": Schema.Boolean, "type": InframonitoringtypesCheckType })
export type LlmpricingruletypesLLMRulePricing = { readonly "cache"?: LlmpricingruletypesLLMPricingCacheCosts, readonly "input": number, readonly "output": number }
export const LlmpricingruletypesLLMRulePricing = Schema.Struct({ "cache": Schema.optionalKey(LlmpricingruletypesLLMPricingCacheCosts), "input": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "output": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()) })
export type InframonitoringtypesClusters = { readonly "endTimeBeforeRetention": boolean, readonly "records": ReadonlyArray<InframonitoringtypesClusterRecord>, readonly "total": number, readonly "type": InframonitoringtypesResponseType, readonly "warning"?: Querybuildertypesv5QueryWarnData }
export const InframonitoringtypesClusters = Schema.Struct({ "endTimeBeforeRetention": Schema.Boolean, "records": Schema.Array(InframonitoringtypesClusterRecord), "total": Schema.Number.check(Schema.isInt()), "type": InframonitoringtypesResponseType, "warning": Schema.optionalKey(Querybuildertypesv5QueryWarnData) })
export type InframonitoringtypesContainers = { readonly "endTimeBeforeRetention": boolean, readonly "records": ReadonlyArray<InframonitoringtypesContainerRecord>, readonly "total": number, readonly "type": InframonitoringtypesResponseType, readonly "warning"?: Querybuildertypesv5QueryWarnData }
export const InframonitoringtypesContainers = Schema.Struct({ "endTimeBeforeRetention": Schema.Boolean, "records": Schema.Array(InframonitoringtypesContainerRecord), "total": Schema.Number.check(Schema.isInt()), "type": InframonitoringtypesResponseType, "warning": Schema.optionalKey(Querybuildertypesv5QueryWarnData) })
export type InframonitoringtypesDaemonSets = { readonly "endTimeBeforeRetention": boolean, readonly "records": ReadonlyArray<InframonitoringtypesDaemonSetRecord>, readonly "total": number, readonly "type": InframonitoringtypesResponseType, readonly "warning"?: Querybuildertypesv5QueryWarnData }
export const InframonitoringtypesDaemonSets = Schema.Struct({ "endTimeBeforeRetention": Schema.Boolean, "records": Schema.Array(InframonitoringtypesDaemonSetRecord), "total": Schema.Number.check(Schema.isInt()), "type": InframonitoringtypesResponseType, "warning": Schema.optionalKey(Querybuildertypesv5QueryWarnData) })
export type InframonitoringtypesDeployments = { readonly "endTimeBeforeRetention": boolean, readonly "records": ReadonlyArray<InframonitoringtypesDeploymentRecord>, readonly "total": number, readonly "type": InframonitoringtypesResponseType, readonly "warning"?: Querybuildertypesv5QueryWarnData }
export const InframonitoringtypesDeployments = Schema.Struct({ "endTimeBeforeRetention": Schema.Boolean, "records": Schema.Array(InframonitoringtypesDeploymentRecord), "total": Schema.Number.check(Schema.isInt()), "type": InframonitoringtypesResponseType, "warning": Schema.optionalKey(Querybuildertypesv5QueryWarnData) })
export type InframonitoringtypesHosts = { readonly "endTimeBeforeRetention": boolean, readonly "records": ReadonlyArray<InframonitoringtypesHostRecord>, readonly "total": number, readonly "type": InframonitoringtypesResponseType, readonly "warning"?: Querybuildertypesv5QueryWarnData }
export const InframonitoringtypesHosts = Schema.Struct({ "endTimeBeforeRetention": Schema.Boolean, "records": Schema.Array(InframonitoringtypesHostRecord), "total": Schema.Number.check(Schema.isInt()), "type": InframonitoringtypesResponseType, "warning": Schema.optionalKey(Querybuildertypesv5QueryWarnData) })
export type InframonitoringtypesJobs = { readonly "endTimeBeforeRetention": boolean, readonly "records": ReadonlyArray<InframonitoringtypesJobRecord>, readonly "total": number, readonly "type": InframonitoringtypesResponseType, readonly "warning"?: Querybuildertypesv5QueryWarnData }
export const InframonitoringtypesJobs = Schema.Struct({ "endTimeBeforeRetention": Schema.Boolean, "records": Schema.Array(InframonitoringtypesJobRecord), "total": Schema.Number.check(Schema.isInt()), "type": InframonitoringtypesResponseType, "warning": Schema.optionalKey(Querybuildertypesv5QueryWarnData) })
export type InframonitoringtypesNamespaces = { readonly "endTimeBeforeRetention": boolean, readonly "records": ReadonlyArray<InframonitoringtypesNamespaceRecord>, readonly "total": number, readonly "type": InframonitoringtypesResponseType, readonly "warning"?: Querybuildertypesv5QueryWarnData }
export const InframonitoringtypesNamespaces = Schema.Struct({ "endTimeBeforeRetention": Schema.Boolean, "records": Schema.Array(InframonitoringtypesNamespaceRecord), "total": Schema.Number.check(Schema.isInt()), "type": InframonitoringtypesResponseType, "warning": Schema.optionalKey(Querybuildertypesv5QueryWarnData) })
export type InframonitoringtypesNodes = { readonly "endTimeBeforeRetention": boolean, readonly "records": ReadonlyArray<InframonitoringtypesNodeRecord>, readonly "total": number, readonly "type": InframonitoringtypesResponseType, readonly "warning"?: Querybuildertypesv5QueryWarnData }
export const InframonitoringtypesNodes = Schema.Struct({ "endTimeBeforeRetention": Schema.Boolean, "records": Schema.Array(InframonitoringtypesNodeRecord), "total": Schema.Number.check(Schema.isInt()), "type": InframonitoringtypesResponseType, "warning": Schema.optionalKey(Querybuildertypesv5QueryWarnData) })
export type InframonitoringtypesPods = { readonly "endTimeBeforeRetention": boolean, readonly "records": ReadonlyArray<InframonitoringtypesPodRecord>, readonly "total": number, readonly "type": InframonitoringtypesResponseType, readonly "warning"?: Querybuildertypesv5QueryWarnData }
export const InframonitoringtypesPods = Schema.Struct({ "endTimeBeforeRetention": Schema.Boolean, "records": Schema.Array(InframonitoringtypesPodRecord), "total": Schema.Number.check(Schema.isInt()), "type": InframonitoringtypesResponseType, "warning": Schema.optionalKey(Querybuildertypesv5QueryWarnData) })
export type InframonitoringtypesStatefulSets = { readonly "endTimeBeforeRetention": boolean, readonly "records": ReadonlyArray<InframonitoringtypesStatefulSetRecord>, readonly "total": number, readonly "type": InframonitoringtypesResponseType, readonly "warning"?: Querybuildertypesv5QueryWarnData }
export const InframonitoringtypesStatefulSets = Schema.Struct({ "endTimeBeforeRetention": Schema.Boolean, "records": Schema.Array(InframonitoringtypesStatefulSetRecord), "total": Schema.Number.check(Schema.isInt()), "type": InframonitoringtypesResponseType, "warning": Schema.optionalKey(Querybuildertypesv5QueryWarnData) })
export type InframonitoringtypesVolumes = { readonly "endTimeBeforeRetention": boolean, readonly "records": ReadonlyArray<InframonitoringtypesVolumeRecord>, readonly "total": number, readonly "type": InframonitoringtypesResponseType, readonly "warning"?: Querybuildertypesv5QueryWarnData }
export const InframonitoringtypesVolumes = Schema.Struct({ "endTimeBeforeRetention": Schema.Boolean, "records": Schema.Array(InframonitoringtypesVolumeRecord), "total": Schema.Number.check(Schema.isInt()), "type": InframonitoringtypesResponseType, "warning": Schema.optionalKey(Querybuildertypesv5QueryWarnData) })
export type RuletypesRuleThresholdData = { readonly "kind": RuletypesThresholdKind, readonly "spec": RuletypesBasicRuleThresholds }
export const RuletypesRuleThresholdData = Schema.Union([Schema.Struct({ "kind": RuletypesThresholdKind, "spec": RuletypesBasicRuleThresholds })], { mode: "oneOf" })
export type RuletypesCumulativeWindow = { readonly "frequency": string, readonly "schedule": RuletypesCumulativeSchedule, readonly "timezone": string }
export const RuletypesCumulativeWindow = Schema.Struct({ "frequency": Schema.String, "schedule": RuletypesCumulativeSchedule, "timezone": Schema.String })
export type SpantypesGettableSpanMapperGroups = { readonly "items": ReadonlyArray<SpantypesSpanMapperGroup> }
export const SpantypesGettableSpanMapperGroups = Schema.Struct({ "items": Schema.Array(SpantypesSpanMapperGroup) })
export type SpantypesPostableSpanMapper = { readonly "config": SpantypesSpanMapperConfig, readonly "enabled"?: boolean, readonly "fieldContext": SpantypesFieldContext, readonly "name": string }
export const SpantypesPostableSpanMapper = Schema.Struct({ "config": SpantypesSpanMapperConfig, "enabled": Schema.optionalKey(Schema.Boolean), "fieldContext": SpantypesFieldContext, "name": Schema.String })
export type SpantypesPostableSpanMapperTest = { readonly "groups": ReadonlyArray<{ readonly "condition": SpantypesSpanMapperGroupCondition, readonly "enabled"?: boolean, readonly "mappers"?: ReadonlyArray<{ readonly "config": SpantypesSpanMapperConfig, readonly "enabled"?: boolean, readonly "fieldContext": SpantypesFieldContext, readonly "name": string }>, readonly "name": string }>, readonly "spans": ReadonlyArray<{ readonly "attributes"?: {  }, readonly "resource"?: {  } }> }
export const SpantypesPostableSpanMapperTest = Schema.Struct({ "groups": Schema.Union([Schema.Array(Schema.Struct({ "condition": SpantypesSpanMapperGroupCondition, "enabled": Schema.optionalKey(Schema.Boolean), "mappers": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "config": SpantypesSpanMapperConfig, "enabled": Schema.optionalKey(Schema.Boolean), "fieldContext": SpantypesFieldContext, "name": Schema.String }))])), "name": Schema.String }))]), "spans": Schema.Union([Schema.Array(Schema.Struct({ "attributes": Schema.optionalKey(Schema.Union([Schema.Struct({  })])), "resource": Schema.optionalKey(Schema.Union([Schema.Struct({  })])) }))]) })
export type SpantypesSpanMapper = { readonly "config": SpantypesSpanMapperConfig, readonly "createdAt"?: string, readonly "createdBy"?: string, readonly "enabled": boolean, readonly "fieldContext": SpantypesFieldContext, readonly "groupId": string, readonly "id": string, readonly "name": string, readonly "updatedAt"?: string, readonly "updatedBy"?: string }
export const SpantypesSpanMapper = Schema.Struct({ "config": SpantypesSpanMapperConfig, "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "createdBy": Schema.optionalKey(Schema.String), "enabled": Schema.Boolean, "fieldContext": SpantypesFieldContext, "groupId": Schema.String, "id": Schema.String, "name": Schema.String, "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "updatedBy": Schema.optionalKey(Schema.String) })
export type SpantypesUpdatableSpanMapper = { readonly "config"?: SpantypesSpanMapperConfig, readonly "enabled"?: boolean | null, readonly "fieldContext"?: SpantypesFieldContext }
export const SpantypesUpdatableSpanMapper = Schema.Struct({ "config": Schema.optionalKey(SpantypesSpanMapperConfig), "enabled": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "fieldContext": Schema.optionalKey(SpantypesFieldContext) })
export type TelemetrystoretypesGranules = { readonly "initial": number, readonly "reads": ReadonlyArray<TelemetrystoretypesMergeTreeRead>, readonly "selected": number, readonly "skipped": number }
export const TelemetrystoretypesGranules = Schema.Union([Schema.Struct({ "initial": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "reads": Schema.Array(TelemetrystoretypesMergeTreeRead), "selected": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "skipped": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()) })])
export type DashboardtypesVariablePlugin = { readonly "kind": "signoz/DynamicVariable", readonly "spec": DashboardtypesDynamicVariableSpec } | { readonly "kind": "signoz/QueryVariable", readonly "spec": DashboardtypesQueryVariableSpec } | { readonly "kind": "signoz/CustomVariable", readonly "spec": DashboardtypesCustomVariableSpec }
export const DashboardtypesVariablePlugin = Schema.Union([Schema.Struct({ "kind": Schema.Literal("signoz/DynamicVariable"), "spec": DashboardtypesDynamicVariableSpec }), Schema.Struct({ "kind": Schema.Literal("signoz/QueryVariable"), "spec": DashboardtypesQueryVariableSpec }), Schema.Struct({ "kind": Schema.Literal("signoz/CustomVariable"), "spec": DashboardtypesCustomVariableSpec })], { mode: "oneOf" })
export type Querybuildertypesv5ScalarData = { readonly "columns"?: ReadonlyArray<Querybuildertypesv5ColumnDescriptor> | null, readonly "data"?: ReadonlyArray<ReadonlyArray<Schema.Json>> | null, readonly "queryName"?: string }
export const Querybuildertypesv5ScalarData = Schema.Struct({ "columns": Schema.optionalKey(Schema.Union([Schema.Array(Querybuildertypesv5ColumnDescriptor), Schema.Null], { mode: "oneOf" })), "data": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Array(Schema.Json)), Schema.Null], { mode: "oneOf" })), "queryName": Schema.optionalKey(Schema.String) })
export type DashboardtypesBuilderQuerySpec = { readonly "aggregations"?: ReadonlyArray<{ readonly "alias"?: string, readonly "expression"?: string }>, readonly "cursor"?: string, readonly "disabled"?: boolean, readonly "filter"?: Querybuildertypesv5Filter, readonly "functions"?: ReadonlyArray<{ readonly "args"?: ReadonlyArray<{ readonly "name"?: string, readonly "value"?: number | string }>, readonly "name"?: Querybuildertypesv5FunctionName }>, readonly "groupBy"?: ReadonlyArray<{ readonly "description"?: string, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "name": string, readonly "signal"?: TelemetrytypesSignal, readonly "unit"?: string }>, readonly "having"?: Querybuildertypesv5Having, readonly "legend"?: string, readonly "limit"?: number, readonly "limitBy"?: Querybuildertypesv5LimitBy, readonly "name"?: string, readonly "offset"?: number, readonly "order"?: ReadonlyArray<{ readonly "direction"?: Querybuildertypesv5OrderDirection, readonly "key"?: Querybuildertypesv5OrderByKey }>, readonly "secondaryAggregations"?: ReadonlyArray<{ readonly "alias"?: string, readonly "expression"?: string, readonly "groupBy"?: ReadonlyArray<{ readonly "description"?: string, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "name": string, readonly "signal"?: TelemetrytypesSignal, readonly "unit"?: string }>, readonly "limit"?: number, readonly "limitBy"?: Querybuildertypesv5LimitBy, readonly "order"?: ReadonlyArray<{ readonly "direction"?: Querybuildertypesv5OrderDirection, readonly "key"?: Querybuildertypesv5OrderByKey }>, readonly "stepInterval"?: Querybuildertypesv5Step }>, readonly "selectFields"?: ReadonlyArray<{ readonly "description"?: string, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "name": string, readonly "signal"?: TelemetrytypesSignal, readonly "unit"?: string }>, readonly "signal": "logs", readonly "source"?: TelemetrytypesSource, readonly "stepInterval"?: Querybuildertypesv5Step } | { readonly "aggregations"?: ReadonlyArray<{ readonly "comparisonSpaceAggregationParam"?: MetrictypesComparisonSpaceAggregationParam, readonly "metricName"?: string, readonly "reduceTo"?: Querybuildertypesv5ReduceTo, readonly "spaceAggregation"?: MetrictypesSpaceAggregation, readonly "temporality"?: MetrictypesTemporality, readonly "timeAggregation"?: MetrictypesTimeAggregation }>, readonly "cursor"?: string, readonly "disabled"?: boolean, readonly "filter"?: Querybuildertypesv5Filter, readonly "functions"?: ReadonlyArray<{ readonly "args"?: ReadonlyArray<{ readonly "name"?: string, readonly "value"?: number | string }>, readonly "name"?: Querybuildertypesv5FunctionName }>, readonly "groupBy"?: ReadonlyArray<{ readonly "description"?: string, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "name": string, readonly "signal"?: TelemetrytypesSignal, readonly "unit"?: string }>, readonly "having"?: Querybuildertypesv5Having, readonly "legend"?: string, readonly "limit"?: number, readonly "limitBy"?: Querybuildertypesv5LimitBy, readonly "name"?: string, readonly "offset"?: number, readonly "order"?: ReadonlyArray<{ readonly "direction"?: Querybuildertypesv5OrderDirection, readonly "key"?: Querybuildertypesv5OrderByKey }>, readonly "secondaryAggregations"?: ReadonlyArray<{ readonly "alias"?: string, readonly "expression"?: string, readonly "groupBy"?: ReadonlyArray<{ readonly "description"?: string, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "name": string, readonly "signal"?: TelemetrytypesSignal, readonly "unit"?: string }>, readonly "limit"?: number, readonly "limitBy"?: Querybuildertypesv5LimitBy, readonly "order"?: ReadonlyArray<{ readonly "direction"?: Querybuildertypesv5OrderDirection, readonly "key"?: Querybuildertypesv5OrderByKey }>, readonly "stepInterval"?: Querybuildertypesv5Step }>, readonly "selectFields"?: ReadonlyArray<{ readonly "description"?: string, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "name": string, readonly "signal"?: TelemetrytypesSignal, readonly "unit"?: string }>, readonly "signal": "metrics", readonly "source"?: TelemetrytypesSource, readonly "stepInterval"?: Querybuildertypesv5Step } | { readonly "aggregations"?: ReadonlyArray<{ readonly "alias"?: string, readonly "expression"?: string }>, readonly "cursor"?: string, readonly "disabled"?: boolean, readonly "filter"?: Querybuildertypesv5Filter, readonly "functions"?: ReadonlyArray<{ readonly "args"?: ReadonlyArray<{ readonly "name"?: string, readonly "value"?: number | string }>, readonly "name"?: Querybuildertypesv5FunctionName }>, readonly "groupBy"?: ReadonlyArray<{ readonly "description"?: string, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "name": string, readonly "signal"?: TelemetrytypesSignal, readonly "unit"?: string }>, readonly "having"?: Querybuildertypesv5Having, readonly "legend"?: string, readonly "limit"?: number, readonly "limitBy"?: Querybuildertypesv5LimitBy, readonly "name"?: string, readonly "offset"?: number, readonly "order"?: ReadonlyArray<{ readonly "direction"?: Querybuildertypesv5OrderDirection, readonly "key"?: Querybuildertypesv5OrderByKey }>, readonly "secondaryAggregations"?: ReadonlyArray<{ readonly "alias"?: string, readonly "expression"?: string, readonly "groupBy"?: ReadonlyArray<{ readonly "description"?: string, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "name": string, readonly "signal"?: TelemetrytypesSignal, readonly "unit"?: string }>, readonly "limit"?: number, readonly "limitBy"?: Querybuildertypesv5LimitBy, readonly "order"?: ReadonlyArray<{ readonly "direction"?: Querybuildertypesv5OrderDirection, readonly "key"?: Querybuildertypesv5OrderByKey }>, readonly "stepInterval"?: Querybuildertypesv5Step }>, readonly "selectFields"?: ReadonlyArray<{ readonly "description"?: string, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "name": string, readonly "signal"?: TelemetrytypesSignal, readonly "unit"?: string }>, readonly "signal": "traces", readonly "source"?: TelemetrytypesSource, readonly "stepInterval"?: Querybuildertypesv5Step }
export const DashboardtypesBuilderQuerySpec = Schema.Union([Schema.Struct({ "aggregations": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "alias": Schema.optionalKey(Schema.String), "expression": Schema.optionalKey(Schema.String) }))])), "cursor": Schema.optionalKey(Schema.String), "disabled": Schema.optionalKey(Schema.Boolean), "filter": Schema.optionalKey(Querybuildertypesv5Filter), "functions": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "args": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "name": Schema.optionalKey(Schema.String), "value": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.String], { mode: "oneOf" })) }))])), "name": Schema.optionalKey(Querybuildertypesv5FunctionName) }))])), "groupBy": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "description": Schema.optionalKey(Schema.String), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "name": Schema.String, "signal": Schema.optionalKey(TelemetrytypesSignal), "unit": Schema.optionalKey(Schema.String) }))])), "having": Schema.optionalKey(Querybuildertypesv5Having), "legend": Schema.optionalKey(Schema.String), "limit": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "limitBy": Schema.optionalKey(Querybuildertypesv5LimitBy), "name": Schema.optionalKey(Schema.String), "offset": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "order": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "direction": Schema.optionalKey(Querybuildertypesv5OrderDirection), "key": Schema.optionalKey(Querybuildertypesv5OrderByKey) }))])), "secondaryAggregations": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "alias": Schema.optionalKey(Schema.String), "expression": Schema.optionalKey(Schema.String), "groupBy": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "description": Schema.optionalKey(Schema.String), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "name": Schema.String, "signal": Schema.optionalKey(TelemetrytypesSignal), "unit": Schema.optionalKey(Schema.String) }))])), "limit": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "limitBy": Schema.optionalKey(Querybuildertypesv5LimitBy), "order": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "direction": Schema.optionalKey(Querybuildertypesv5OrderDirection), "key": Schema.optionalKey(Querybuildertypesv5OrderByKey) }))])), "stepInterval": Schema.optionalKey(Querybuildertypesv5Step) }))])), "selectFields": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "description": Schema.optionalKey(Schema.String), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "name": Schema.String, "signal": Schema.optionalKey(TelemetrytypesSignal), "unit": Schema.optionalKey(Schema.String) }))])), "signal": Schema.Literal("logs"), "source": Schema.optionalKey(TelemetrytypesSource), "stepInterval": Schema.optionalKey(Querybuildertypesv5Step) }), Schema.Struct({ "aggregations": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "comparisonSpaceAggregationParam": Schema.optionalKey(MetrictypesComparisonSpaceAggregationParam), "metricName": Schema.optionalKey(Schema.String), "reduceTo": Schema.optionalKey(Querybuildertypesv5ReduceTo), "spaceAggregation": Schema.optionalKey(MetrictypesSpaceAggregation), "temporality": Schema.optionalKey(MetrictypesTemporality), "timeAggregation": Schema.optionalKey(MetrictypesTimeAggregation) }))])), "cursor": Schema.optionalKey(Schema.String), "disabled": Schema.optionalKey(Schema.Boolean), "filter": Schema.optionalKey(Querybuildertypesv5Filter), "functions": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "args": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "name": Schema.optionalKey(Schema.String), "value": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.String], { mode: "oneOf" })) }))])), "name": Schema.optionalKey(Querybuildertypesv5FunctionName) }))])), "groupBy": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "description": Schema.optionalKey(Schema.String), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "name": Schema.String, "signal": Schema.optionalKey(TelemetrytypesSignal), "unit": Schema.optionalKey(Schema.String) }))])), "having": Schema.optionalKey(Querybuildertypesv5Having), "legend": Schema.optionalKey(Schema.String), "limit": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "limitBy": Schema.optionalKey(Querybuildertypesv5LimitBy), "name": Schema.optionalKey(Schema.String), "offset": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "order": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "direction": Schema.optionalKey(Querybuildertypesv5OrderDirection), "key": Schema.optionalKey(Querybuildertypesv5OrderByKey) }))])), "secondaryAggregations": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "alias": Schema.optionalKey(Schema.String), "expression": Schema.optionalKey(Schema.String), "groupBy": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "description": Schema.optionalKey(Schema.String), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "name": Schema.String, "signal": Schema.optionalKey(TelemetrytypesSignal), "unit": Schema.optionalKey(Schema.String) }))])), "limit": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "limitBy": Schema.optionalKey(Querybuildertypesv5LimitBy), "order": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "direction": Schema.optionalKey(Querybuildertypesv5OrderDirection), "key": Schema.optionalKey(Querybuildertypesv5OrderByKey) }))])), "stepInterval": Schema.optionalKey(Querybuildertypesv5Step) }))])), "selectFields": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "description": Schema.optionalKey(Schema.String), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "name": Schema.String, "signal": Schema.optionalKey(TelemetrytypesSignal), "unit": Schema.optionalKey(Schema.String) }))])), "signal": Schema.Literal("metrics"), "source": Schema.optionalKey(TelemetrytypesSource), "stepInterval": Schema.optionalKey(Querybuildertypesv5Step) }), Schema.Struct({ "aggregations": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "alias": Schema.optionalKey(Schema.String), "expression": Schema.optionalKey(Schema.String) }))])), "cursor": Schema.optionalKey(Schema.String), "disabled": Schema.optionalKey(Schema.Boolean), "filter": Schema.optionalKey(Querybuildertypesv5Filter), "functions": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "args": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "name": Schema.optionalKey(Schema.String), "value": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.String], { mode: "oneOf" })) }))])), "name": Schema.optionalKey(Querybuildertypesv5FunctionName) }))])), "groupBy": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "description": Schema.optionalKey(Schema.String), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "name": Schema.String, "signal": Schema.optionalKey(TelemetrytypesSignal), "unit": Schema.optionalKey(Schema.String) }))])), "having": Schema.optionalKey(Querybuildertypesv5Having), "legend": Schema.optionalKey(Schema.String), "limit": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "limitBy": Schema.optionalKey(Querybuildertypesv5LimitBy), "name": Schema.optionalKey(Schema.String), "offset": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "order": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "direction": Schema.optionalKey(Querybuildertypesv5OrderDirection), "key": Schema.optionalKey(Querybuildertypesv5OrderByKey) }))])), "secondaryAggregations": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "alias": Schema.optionalKey(Schema.String), "expression": Schema.optionalKey(Schema.String), "groupBy": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "description": Schema.optionalKey(Schema.String), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "name": Schema.String, "signal": Schema.optionalKey(TelemetrytypesSignal), "unit": Schema.optionalKey(Schema.String) }))])), "limit": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "limitBy": Schema.optionalKey(Querybuildertypesv5LimitBy), "order": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "direction": Schema.optionalKey(Querybuildertypesv5OrderDirection), "key": Schema.optionalKey(Querybuildertypesv5OrderByKey) }))])), "stepInterval": Schema.optionalKey(Querybuildertypesv5Step) }))])), "selectFields": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "description": Schema.optionalKey(Schema.String), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "name": Schema.String, "signal": Schema.optionalKey(TelemetrytypesSignal), "unit": Schema.optionalKey(Schema.String) }))])), "signal": Schema.Literal("traces"), "source": Schema.optionalKey(TelemetrytypesSource), "stepInterval": Schema.optionalKey(Querybuildertypesv5Step) })], { mode: "oneOf" })
export type Querybuildertypesv5BuilderQuerySpec = { readonly "aggregations"?: ReadonlyArray<{ readonly "alias"?: string, readonly "expression"?: string }>, readonly "cursor"?: string, readonly "disabled"?: boolean, readonly "filter"?: Querybuildertypesv5Filter, readonly "functions"?: ReadonlyArray<{ readonly "args"?: ReadonlyArray<{ readonly "name"?: string, readonly "value"?: number | string }>, readonly "name"?: Querybuildertypesv5FunctionName }>, readonly "groupBy"?: ReadonlyArray<{ readonly "description"?: string, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "name": string, readonly "signal"?: TelemetrytypesSignal, readonly "unit"?: string }>, readonly "having"?: Querybuildertypesv5Having, readonly "legend"?: string, readonly "limit"?: number, readonly "limitBy"?: Querybuildertypesv5LimitBy, readonly "name"?: string, readonly "offset"?: number, readonly "order"?: ReadonlyArray<{ readonly "direction"?: Querybuildertypesv5OrderDirection, readonly "key"?: Querybuildertypesv5OrderByKey }>, readonly "secondaryAggregations"?: ReadonlyArray<{ readonly "alias"?: string, readonly "expression"?: string, readonly "groupBy"?: ReadonlyArray<{ readonly "description"?: string, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "name": string, readonly "signal"?: TelemetrytypesSignal, readonly "unit"?: string }>, readonly "limit"?: number, readonly "limitBy"?: Querybuildertypesv5LimitBy, readonly "order"?: ReadonlyArray<{ readonly "direction"?: Querybuildertypesv5OrderDirection, readonly "key"?: Querybuildertypesv5OrderByKey }>, readonly "stepInterval"?: Querybuildertypesv5Step }>, readonly "selectFields"?: ReadonlyArray<{ readonly "description"?: string, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "name": string, readonly "signal"?: TelemetrytypesSignal, readonly "unit"?: string }>, readonly "signal": "traces", readonly "source"?: TelemetrytypesSource, readonly "stepInterval"?: Querybuildertypesv5Step } | { readonly "aggregations"?: ReadonlyArray<{ readonly "alias"?: string, readonly "expression"?: string }>, readonly "cursor"?: string, readonly "disabled"?: boolean, readonly "filter"?: Querybuildertypesv5Filter, readonly "functions"?: ReadonlyArray<{ readonly "args"?: ReadonlyArray<{ readonly "name"?: string, readonly "value"?: number | string }>, readonly "name"?: Querybuildertypesv5FunctionName }>, readonly "groupBy"?: ReadonlyArray<{ readonly "description"?: string, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "name": string, readonly "signal"?: TelemetrytypesSignal, readonly "unit"?: string }>, readonly "having"?: Querybuildertypesv5Having, readonly "legend"?: string, readonly "limit"?: number, readonly "limitBy"?: Querybuildertypesv5LimitBy, readonly "name"?: string, readonly "offset"?: number, readonly "order"?: ReadonlyArray<{ readonly "direction"?: Querybuildertypesv5OrderDirection, readonly "key"?: Querybuildertypesv5OrderByKey }>, readonly "secondaryAggregations"?: ReadonlyArray<{ readonly "alias"?: string, readonly "expression"?: string, readonly "groupBy"?: ReadonlyArray<{ readonly "description"?: string, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "name": string, readonly "signal"?: TelemetrytypesSignal, readonly "unit"?: string }>, readonly "limit"?: number, readonly "limitBy"?: Querybuildertypesv5LimitBy, readonly "order"?: ReadonlyArray<{ readonly "direction"?: Querybuildertypesv5OrderDirection, readonly "key"?: Querybuildertypesv5OrderByKey }>, readonly "stepInterval"?: Querybuildertypesv5Step }>, readonly "selectFields"?: ReadonlyArray<{ readonly "description"?: string, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "name": string, readonly "signal"?: TelemetrytypesSignal, readonly "unit"?: string }>, readonly "signal": "logs", readonly "source"?: TelemetrytypesSource, readonly "stepInterval"?: Querybuildertypesv5Step } | { readonly "aggregations"?: ReadonlyArray<{ readonly "comparisonSpaceAggregationParam"?: MetrictypesComparisonSpaceAggregationParam, readonly "metricName"?: string, readonly "reduceTo"?: Querybuildertypesv5ReduceTo, readonly "spaceAggregation"?: MetrictypesSpaceAggregation, readonly "temporality"?: MetrictypesTemporality, readonly "timeAggregation"?: MetrictypesTimeAggregation }>, readonly "cursor"?: string, readonly "disabled"?: boolean, readonly "filter"?: Querybuildertypesv5Filter, readonly "functions"?: ReadonlyArray<{ readonly "args"?: ReadonlyArray<{ readonly "name"?: string, readonly "value"?: number | string }>, readonly "name"?: Querybuildertypesv5FunctionName }>, readonly "groupBy"?: ReadonlyArray<{ readonly "description"?: string, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "name": string, readonly "signal"?: TelemetrytypesSignal, readonly "unit"?: string }>, readonly "having"?: Querybuildertypesv5Having, readonly "legend"?: string, readonly "limit"?: number, readonly "limitBy"?: Querybuildertypesv5LimitBy, readonly "name"?: string, readonly "offset"?: number, readonly "order"?: ReadonlyArray<{ readonly "direction"?: Querybuildertypesv5OrderDirection, readonly "key"?: Querybuildertypesv5OrderByKey }>, readonly "secondaryAggregations"?: ReadonlyArray<{ readonly "alias"?: string, readonly "expression"?: string, readonly "groupBy"?: ReadonlyArray<{ readonly "description"?: string, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "name": string, readonly "signal"?: TelemetrytypesSignal, readonly "unit"?: string }>, readonly "limit"?: number, readonly "limitBy"?: Querybuildertypesv5LimitBy, readonly "order"?: ReadonlyArray<{ readonly "direction"?: Querybuildertypesv5OrderDirection, readonly "key"?: Querybuildertypesv5OrderByKey }>, readonly "stepInterval"?: Querybuildertypesv5Step }>, readonly "selectFields"?: ReadonlyArray<{ readonly "description"?: string, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "name": string, readonly "signal"?: TelemetrytypesSignal, readonly "unit"?: string }>, readonly "signal": "metrics", readonly "source"?: TelemetrytypesSource, readonly "stepInterval"?: Querybuildertypesv5Step }
export const Querybuildertypesv5BuilderQuerySpec = Schema.Union([Schema.Struct({ "aggregations": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "alias": Schema.optionalKey(Schema.String), "expression": Schema.optionalKey(Schema.String) }))])), "cursor": Schema.optionalKey(Schema.String), "disabled": Schema.optionalKey(Schema.Boolean), "filter": Schema.optionalKey(Querybuildertypesv5Filter), "functions": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "args": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "name": Schema.optionalKey(Schema.String), "value": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.String], { mode: "oneOf" })) }))])), "name": Schema.optionalKey(Querybuildertypesv5FunctionName) }))])), "groupBy": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "description": Schema.optionalKey(Schema.String), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "name": Schema.String, "signal": Schema.optionalKey(TelemetrytypesSignal), "unit": Schema.optionalKey(Schema.String) }))])), "having": Schema.optionalKey(Querybuildertypesv5Having), "legend": Schema.optionalKey(Schema.String), "limit": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "limitBy": Schema.optionalKey(Querybuildertypesv5LimitBy), "name": Schema.optionalKey(Schema.String), "offset": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "order": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "direction": Schema.optionalKey(Querybuildertypesv5OrderDirection), "key": Schema.optionalKey(Querybuildertypesv5OrderByKey) }))])), "secondaryAggregations": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "alias": Schema.optionalKey(Schema.String), "expression": Schema.optionalKey(Schema.String), "groupBy": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "description": Schema.optionalKey(Schema.String), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "name": Schema.String, "signal": Schema.optionalKey(TelemetrytypesSignal), "unit": Schema.optionalKey(Schema.String) }))])), "limit": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "limitBy": Schema.optionalKey(Querybuildertypesv5LimitBy), "order": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "direction": Schema.optionalKey(Querybuildertypesv5OrderDirection), "key": Schema.optionalKey(Querybuildertypesv5OrderByKey) }))])), "stepInterval": Schema.optionalKey(Querybuildertypesv5Step) }))])), "selectFields": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "description": Schema.optionalKey(Schema.String), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "name": Schema.String, "signal": Schema.optionalKey(TelemetrytypesSignal), "unit": Schema.optionalKey(Schema.String) }))])), "signal": Schema.Literal("traces"), "source": Schema.optionalKey(TelemetrytypesSource), "stepInterval": Schema.optionalKey(Querybuildertypesv5Step) }), Schema.Struct({ "aggregations": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "alias": Schema.optionalKey(Schema.String), "expression": Schema.optionalKey(Schema.String) }))])), "cursor": Schema.optionalKey(Schema.String), "disabled": Schema.optionalKey(Schema.Boolean), "filter": Schema.optionalKey(Querybuildertypesv5Filter), "functions": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "args": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "name": Schema.optionalKey(Schema.String), "value": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.String], { mode: "oneOf" })) }))])), "name": Schema.optionalKey(Querybuildertypesv5FunctionName) }))])), "groupBy": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "description": Schema.optionalKey(Schema.String), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "name": Schema.String, "signal": Schema.optionalKey(TelemetrytypesSignal), "unit": Schema.optionalKey(Schema.String) }))])), "having": Schema.optionalKey(Querybuildertypesv5Having), "legend": Schema.optionalKey(Schema.String), "limit": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "limitBy": Schema.optionalKey(Querybuildertypesv5LimitBy), "name": Schema.optionalKey(Schema.String), "offset": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "order": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "direction": Schema.optionalKey(Querybuildertypesv5OrderDirection), "key": Schema.optionalKey(Querybuildertypesv5OrderByKey) }))])), "secondaryAggregations": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "alias": Schema.optionalKey(Schema.String), "expression": Schema.optionalKey(Schema.String), "groupBy": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "description": Schema.optionalKey(Schema.String), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "name": Schema.String, "signal": Schema.optionalKey(TelemetrytypesSignal), "unit": Schema.optionalKey(Schema.String) }))])), "limit": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "limitBy": Schema.optionalKey(Querybuildertypesv5LimitBy), "order": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "direction": Schema.optionalKey(Querybuildertypesv5OrderDirection), "key": Schema.optionalKey(Querybuildertypesv5OrderByKey) }))])), "stepInterval": Schema.optionalKey(Querybuildertypesv5Step) }))])), "selectFields": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "description": Schema.optionalKey(Schema.String), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "name": Schema.String, "signal": Schema.optionalKey(TelemetrytypesSignal), "unit": Schema.optionalKey(Schema.String) }))])), "signal": Schema.Literal("logs"), "source": Schema.optionalKey(TelemetrytypesSource), "stepInterval": Schema.optionalKey(Querybuildertypesv5Step) }), Schema.Struct({ "aggregations": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "comparisonSpaceAggregationParam": Schema.optionalKey(MetrictypesComparisonSpaceAggregationParam), "metricName": Schema.optionalKey(Schema.String), "reduceTo": Schema.optionalKey(Querybuildertypesv5ReduceTo), "spaceAggregation": Schema.optionalKey(MetrictypesSpaceAggregation), "temporality": Schema.optionalKey(MetrictypesTemporality), "timeAggregation": Schema.optionalKey(MetrictypesTimeAggregation) }))])), "cursor": Schema.optionalKey(Schema.String), "disabled": Schema.optionalKey(Schema.Boolean), "filter": Schema.optionalKey(Querybuildertypesv5Filter), "functions": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "args": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "name": Schema.optionalKey(Schema.String), "value": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.String], { mode: "oneOf" })) }))])), "name": Schema.optionalKey(Querybuildertypesv5FunctionName) }))])), "groupBy": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "description": Schema.optionalKey(Schema.String), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "name": Schema.String, "signal": Schema.optionalKey(TelemetrytypesSignal), "unit": Schema.optionalKey(Schema.String) }))])), "having": Schema.optionalKey(Querybuildertypesv5Having), "legend": Schema.optionalKey(Schema.String), "limit": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "limitBy": Schema.optionalKey(Querybuildertypesv5LimitBy), "name": Schema.optionalKey(Schema.String), "offset": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "order": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "direction": Schema.optionalKey(Querybuildertypesv5OrderDirection), "key": Schema.optionalKey(Querybuildertypesv5OrderByKey) }))])), "secondaryAggregations": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "alias": Schema.optionalKey(Schema.String), "expression": Schema.optionalKey(Schema.String), "groupBy": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "description": Schema.optionalKey(Schema.String), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "name": Schema.String, "signal": Schema.optionalKey(TelemetrytypesSignal), "unit": Schema.optionalKey(Schema.String) }))])), "limit": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "limitBy": Schema.optionalKey(Querybuildertypesv5LimitBy), "order": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "direction": Schema.optionalKey(Querybuildertypesv5OrderDirection), "key": Schema.optionalKey(Querybuildertypesv5OrderByKey) }))])), "stepInterval": Schema.optionalKey(Querybuildertypesv5Step) }))])), "selectFields": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "description": Schema.optionalKey(Schema.String), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "name": Schema.String, "signal": Schema.optionalKey(TelemetrytypesSignal), "unit": Schema.optionalKey(Schema.String) }))])), "signal": Schema.Literal("metrics"), "source": Schema.optionalKey(TelemetrytypesSource), "stepInterval": Schema.optionalKey(Querybuildertypesv5Step) })], { mode: "oneOf" })
export type Querybuildertypesv5OrderBy = { readonly "direction"?: Querybuildertypesv5OrderDirection, readonly "key"?: Querybuildertypesv5OrderByKey }
export const Querybuildertypesv5OrderBy = Schema.Struct({ "direction": Schema.optionalKey(Querybuildertypesv5OrderDirection), "key": Schema.optionalKey(Querybuildertypesv5OrderByKey) })
export type Querybuildertypesv5QueryBuilderFormula = { readonly "disabled"?: boolean, readonly "expression"?: string, readonly "functions"?: ReadonlyArray<{ readonly "args"?: ReadonlyArray<{ readonly "name"?: string, readonly "value"?: number | string }>, readonly "name"?: Querybuildertypesv5FunctionName }>, readonly "having"?: Querybuildertypesv5Having, readonly "legend"?: string, readonly "limit"?: number, readonly "name"?: string, readonly "order"?: ReadonlyArray<{ readonly "direction"?: Querybuildertypesv5OrderDirection, readonly "key"?: Querybuildertypesv5OrderByKey }> }
export const Querybuildertypesv5QueryBuilderFormula = Schema.Struct({ "disabled": Schema.optionalKey(Schema.Boolean), "expression": Schema.optionalKey(Schema.String), "functions": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "args": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "name": Schema.optionalKey(Schema.String), "value": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.String], { mode: "oneOf" })) }))])), "name": Schema.optionalKey(Querybuildertypesv5FunctionName) }))])), "having": Schema.optionalKey(Querybuildertypesv5Having), "legend": Schema.optionalKey(Schema.String), "limit": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "name": Schema.optionalKey(Schema.String), "order": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "direction": Schema.optionalKey(Querybuildertypesv5OrderDirection), "key": Schema.optionalKey(Querybuildertypesv5OrderByKey) }))])) })
export type Querybuildertypesv5QueryBuilderTraceOperator = { readonly "aggregations"?: ReadonlyArray<{ readonly "alias"?: string, readonly "expression"?: string }>, readonly "cursor"?: string, readonly "disabled"?: boolean, readonly "expression"?: string, readonly "filter"?: Querybuildertypesv5Filter, readonly "functions"?: ReadonlyArray<{ readonly "args"?: ReadonlyArray<{ readonly "name"?: string, readonly "value"?: number | string }>, readonly "name"?: Querybuildertypesv5FunctionName }>, readonly "groupBy"?: ReadonlyArray<{ readonly "description"?: string, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "name": string, readonly "signal"?: TelemetrytypesSignal, readonly "unit"?: string }>, readonly "having"?: Querybuildertypesv5Having, readonly "legend"?: string, readonly "limit"?: number, readonly "name"?: string, readonly "offset"?: number, readonly "order"?: ReadonlyArray<{ readonly "direction"?: Querybuildertypesv5OrderDirection, readonly "key"?: Querybuildertypesv5OrderByKey }>, readonly "returnSpansFrom"?: string, readonly "selectFields"?: ReadonlyArray<{ readonly "description"?: string, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "name": string, readonly "signal"?: TelemetrytypesSignal, readonly "unit"?: string }>, readonly "stepInterval"?: Querybuildertypesv5Step }
export const Querybuildertypesv5QueryBuilderTraceOperator = Schema.Struct({ "aggregations": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "alias": Schema.optionalKey(Schema.String), "expression": Schema.optionalKey(Schema.String) }))])), "cursor": Schema.optionalKey(Schema.String), "disabled": Schema.optionalKey(Schema.Boolean), "expression": Schema.optionalKey(Schema.String), "filter": Schema.optionalKey(Querybuildertypesv5Filter), "functions": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "args": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "name": Schema.optionalKey(Schema.String), "value": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.String], { mode: "oneOf" })) }))])), "name": Schema.optionalKey(Querybuildertypesv5FunctionName) }))])), "groupBy": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "description": Schema.optionalKey(Schema.String), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "name": Schema.String, "signal": Schema.optionalKey(TelemetrytypesSignal), "unit": Schema.optionalKey(Schema.String) }))])), "having": Schema.optionalKey(Querybuildertypesv5Having), "legend": Schema.optionalKey(Schema.String), "limit": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "name": Schema.optionalKey(Schema.String), "offset": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "order": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "direction": Schema.optionalKey(Querybuildertypesv5OrderDirection), "key": Schema.optionalKey(Querybuildertypesv5OrderByKey) }))])), "returnSpansFrom": Schema.optionalKey(Schema.String), "selectFields": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "description": Schema.optionalKey(Schema.String), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "name": Schema.String, "signal": Schema.optionalKey(TelemetrytypesSignal), "unit": Schema.optionalKey(Schema.String) }))])), "stepInterval": Schema.optionalKey(Querybuildertypesv5Step) })
export type Querybuildertypesv5Label = { readonly "key"?: TelemetrytypesTelemetryFieldKey, readonly "value"?: string | number | boolean }
export const Querybuildertypesv5Label = Schema.Struct({ "key": Schema.optionalKey(TelemetrytypesTelemetryFieldKey), "value": Schema.optionalKey(Schema.Union([Schema.String, Schema.Number.check(Schema.isFinite()), Schema.Boolean], { mode: "oneOf" })) })
export type RulestatehistorytypesGettableRuleStateTimeline = { readonly "items": ReadonlyArray<{ readonly "fingerprint": number, readonly "labels": ReadonlyArray<{ readonly "key"?: TelemetrytypesTelemetryFieldKey, readonly "value"?: string | number | boolean }>, readonly "overallState": RuletypesAlertState, readonly "overallStateChanged": boolean, readonly "ruleId": string, readonly "ruleName": string, readonly "state": RuletypesAlertState, readonly "stateChanged": boolean, readonly "unixMilli": number, readonly "value": number }>, readonly "nextCursor"?: string, readonly "total": number }
export const RulestatehistorytypesGettableRuleStateTimeline = Schema.Struct({ "items": Schema.Union([Schema.Array(Schema.Struct({ "fingerprint": Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)), "labels": Schema.Union([Schema.Array(Schema.Struct({ "key": Schema.optionalKey(TelemetrytypesTelemetryFieldKey), "value": Schema.optionalKey(Schema.Union([Schema.String, Schema.Number.check(Schema.isFinite()), Schema.Boolean], { mode: "oneOf" })) }))]), "overallState": RuletypesAlertState, "overallStateChanged": Schema.Boolean, "ruleId": Schema.String, "ruleName": Schema.String, "state": RuletypesAlertState, "stateChanged": Schema.Boolean, "unixMilli": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "value": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()) }))]), "nextCursor": Schema.optionalKey(Schema.String), "total": Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)) })
export type SpantypesPostableFlamegraph = { readonly "selectFields"?: ReadonlyArray<TelemetrytypesTelemetryFieldKey>, readonly "selectedSpanId"?: string }
export const SpantypesPostableFlamegraph = Schema.Struct({ "selectFields": Schema.optionalKey(Schema.Array(TelemetrytypesTelemetryFieldKey)), "selectedSpanId": Schema.optionalKey(Schema.String) })
export type SpantypesSpanAggregation = { readonly "aggregation": SpantypesSpanAggregationType, readonly "field": TelemetrytypesTelemetryFieldKey }
export const SpantypesSpanAggregation = Schema.Struct({ "aggregation": SpantypesSpanAggregationType, "field": TelemetrytypesTelemetryFieldKey })
export type SpantypesSpanAggregationResult = { readonly "aggregation": SpantypesSpanAggregationType, readonly "field": TelemetrytypesTelemetryFieldKey, readonly "value": {  } }
export const SpantypesSpanAggregationResult = Schema.Struct({ "aggregation": SpantypesSpanAggregationType, "field": TelemetrytypesTelemetryFieldKey, "value": Schema.Union([Schema.Struct({  })]) })
export type ErrorsJSON = { readonly "code": string, readonly "errors": ReadonlyArray<ErrorsResponseerroradditional>, readonly "message": string, readonly "retry"?: ErrorsResponseretryjson, readonly "suggestions": ReadonlyArray<string>, readonly "type": string, readonly "url"?: string }
export const ErrorsJSON = Schema.Struct({ "code": Schema.String, "errors": Schema.Array(ErrorsResponseerroradditional), "message": Schema.String, "retry": Schema.optionalKey(ErrorsResponseretryjson), "suggestions": Schema.Array(Schema.String), "type": Schema.String, "url": Schema.optionalKey(Schema.String) })
export type SpantypesFlamegraphSpan = { readonly "attributes": { readonly [x: string]: Schema.Json }, readonly "durationNano": number, readonly "event": ReadonlyArray<SpantypesEvent>, readonly "hasError": boolean, readonly "level": number, readonly "name": string, readonly "parentSpanId": string, readonly "resource": { readonly [x: string]: string }, readonly "spanId": string, readonly "timestamp": number }
export const SpantypesFlamegraphSpan = Schema.Struct({ "attributes": Schema.Record(Schema.String, Schema.Json), "durationNano": Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)), "event": Schema.Array(SpantypesEvent), "hasError": Schema.Boolean, "level": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "name": Schema.String, "parentSpanId": Schema.String, "resource": Schema.Record(Schema.String, Schema.String), "spanId": Schema.String, "timestamp": Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)) })
export type SpantypesWaterfallSpan = { readonly "attributes"?: { readonly [x: string]: Schema.Json } | null, readonly "db_name"?: string, readonly "db_operation"?: string, readonly "duration_nano"?: SignoztypesInt64, readonly "events"?: ReadonlyArray<SpantypesEvent> | null, readonly "external_http_method"?: string, readonly "external_http_url"?: string, readonly "flags"?: number, readonly "has_children"?: boolean, readonly "has_error"?: boolean, readonly "http_host"?: string, readonly "http_method"?: string, readonly "http_url"?: string, readonly "is_remote"?: string, readonly "kind_string"?: string, readonly "level"?: number, readonly "name"?: string, readonly "parent_span_id"?: string, readonly "references"?: ReadonlyArray<SpantypesOtelSpanRef> | null, readonly "resource"?: { readonly [x: string]: string } | null, readonly "response_status_code"?: string, readonly "span_id"?: string, readonly "status_code"?: number, readonly "status_code_string"?: string, readonly "status_message"?: string, readonly "sub_tree_node_count"?: number, readonly "time_unix"?: SignoztypesInt64, readonly "trace_id"?: string, readonly "trace_state"?: string }
export const SpantypesWaterfallSpan = Schema.Struct({ "attributes": Schema.optionalKey(Schema.Union([Schema.Record(Schema.String, Schema.Json), Schema.Null], { mode: "oneOf" })), "db_name": Schema.optionalKey(Schema.String), "db_operation": Schema.optionalKey(Schema.String), "duration_nano": Schema.optionalKey(SignoztypesInt64), "events": Schema.optionalKey(Schema.Union([Schema.Array(SpantypesEvent), Schema.Null], { mode: "oneOf" })), "external_http_method": Schema.optionalKey(Schema.String), "external_http_url": Schema.optionalKey(Schema.String), "flags": Schema.optionalKey(Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0))), "has_children": Schema.optionalKey(Schema.Boolean), "has_error": Schema.optionalKey(Schema.Boolean), "http_host": Schema.optionalKey(Schema.String), "http_method": Schema.optionalKey(Schema.String), "http_url": Schema.optionalKey(Schema.String), "is_remote": Schema.optionalKey(Schema.String), "kind_string": Schema.optionalKey(Schema.String), "level": Schema.optionalKey(Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0))), "name": Schema.optionalKey(Schema.String), "parent_span_id": Schema.optionalKey(Schema.String), "references": Schema.optionalKey(Schema.Union([Schema.Array(SpantypesOtelSpanRef), Schema.Null], { mode: "oneOf" })), "resource": Schema.optionalKey(Schema.Union([Schema.Record(Schema.String, Schema.String), Schema.Null], { mode: "oneOf" })), "response_status_code": Schema.optionalKey(Schema.String), "span_id": Schema.optionalKey(Schema.String), "status_code": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "status_code_string": Schema.optionalKey(Schema.String), "status_message": Schema.optionalKey(Schema.String), "sub_tree_node_count": Schema.optionalKey(Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0))), "time_unix": Schema.optionalKey(SignoztypesInt64), "trace_id": Schema.optionalKey(Schema.String), "trace_state": Schema.optionalKey(Schema.String) })
export type AlertmanagertypesPlannedMaintenance = { readonly "alertIds"?: ReadonlyArray<string>, readonly "createdAt"?: string, readonly "createdBy"?: string, readonly "description"?: string, readonly "id": string, readonly "kind": AlertmanagertypesMaintenanceKind, readonly "name": string, readonly "schedule": AlertmanagertypesSchedule, readonly "scope"?: string, readonly "status": AlertmanagertypesMaintenanceStatus, readonly "updatedAt"?: string, readonly "updatedBy"?: string }
export const AlertmanagertypesPlannedMaintenance = Schema.Struct({ "alertIds": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String)])), "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "createdBy": Schema.optionalKey(Schema.String), "description": Schema.optionalKey(Schema.String), "id": Schema.String, "kind": AlertmanagertypesMaintenanceKind, "name": Schema.String, "schedule": AlertmanagertypesSchedule, "scope": Schema.optionalKey(Schema.String), "status": AlertmanagertypesMaintenanceStatus, "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "updatedBy": Schema.optionalKey(Schema.String) })
export type AlertmanagertypesPostablePlannedMaintenance = { readonly "alertIds"?: ReadonlyArray<string>, readonly "description"?: string, readonly "name": string, readonly "schedule": AlertmanagertypesSchedule, readonly "scope"?: string }
export const AlertmanagertypesPostablePlannedMaintenance = Schema.Struct({ "alertIds": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String)])), "description": Schema.optionalKey(Schema.String), "name": Schema.String, "schedule": AlertmanagertypesSchedule, "scope": Schema.optionalKey(Schema.String) })
export type AuthtypesGettableAuthDomain = { readonly "authNProviderInfo"?: AuthtypesAuthNProviderInfo, readonly "config"?: AuthtypesAuthDomainConfig, readonly "createdAt"?: string, readonly "id": string, readonly "name"?: string, readonly "orgId"?: string, readonly "updatedAt"?: string }
export const AuthtypesGettableAuthDomain = Schema.Struct({ "authNProviderInfo": Schema.optionalKey(AuthtypesAuthNProviderInfo), "config": Schema.optionalKey(AuthtypesAuthDomainConfig), "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "id": Schema.String, "name": Schema.optionalKey(Schema.String), "orgId": Schema.optionalKey(Schema.String), "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })) })
export type AuthtypesPostableAuthDomain = { readonly "config"?: AuthtypesAuthDomainConfig, readonly "name"?: string }
export const AuthtypesPostableAuthDomain = Schema.Struct({ "config": Schema.optionalKey(AuthtypesAuthDomainConfig), "name": Schema.optionalKey(Schema.String) })
export type AuthtypesUpdatableAuthDomain = { readonly "config"?: AuthtypesAuthDomainConfig }
export const AuthtypesUpdatableAuthDomain = Schema.Struct({ "config": Schema.optionalKey(AuthtypesAuthDomainConfig) })
export type CloudintegrationtypesAWSIntegrationConfig = { readonly "enabledRegions": ReadonlyArray<string>, readonly "telemetryCollectionStrategy": CloudintegrationtypesAWSTelemetryCollectionStrategy }
export const CloudintegrationtypesAWSIntegrationConfig = Schema.Struct({ "enabledRegions": Schema.Array(Schema.String), "telemetryCollectionStrategy": CloudintegrationtypesAWSTelemetryCollectionStrategy })
export type CloudintegrationtypesGettableAccounts = { readonly "accounts": ReadonlyArray<CloudintegrationtypesAccount> }
export const CloudintegrationtypesGettableAccounts = Schema.Struct({ "accounts": Schema.Array(CloudintegrationtypesAccount) })
export type CloudintegrationtypesCloudIntegrationService = { readonly "cloudIntegrationId"?: string, readonly "config"?: CloudintegrationtypesServiceConfig, readonly "createdAt"?: string, readonly "id": string, readonly "type"?: CloudintegrationtypesServiceID, readonly "updatedAt"?: string }
export const CloudintegrationtypesCloudIntegrationService = Schema.Union([Schema.Struct({ "cloudIntegrationId": Schema.optionalKey(Schema.String), "config": Schema.optionalKey(CloudintegrationtypesServiceConfig), "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "id": Schema.String, "type": Schema.optionalKey(CloudintegrationtypesServiceID), "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })) })])
export type CloudintegrationtypesUpdatableService = { readonly "config": CloudintegrationtypesServiceConfig }
export const CloudintegrationtypesUpdatableService = Schema.Struct({ "config": CloudintegrationtypesServiceConfig })
export type AlertmanagertypesGoogleChatReceiverConfig = { readonly "http_config"?: ConfigHTTPClientConfig, readonly "send_resolved"?: boolean, readonly "text"?: string, readonly "title"?: string, readonly "webhook_url"?: ConfigSecretURL }
export const AlertmanagertypesGoogleChatReceiverConfig = Schema.Struct({ "http_config": Schema.optionalKey(ConfigHTTPClientConfig), "send_resolved": Schema.optionalKey(Schema.Boolean), "text": Schema.optionalKey(Schema.String), "title": Schema.optionalKey(Schema.String), "webhook_url": Schema.optionalKey(ConfigSecretURL) })
export type ConfigDiscordConfig = { readonly "avatar_url"?: string, readonly "content"?: string, readonly "http_config"?: ConfigHTTPClientConfig, readonly "message"?: string, readonly "send_resolved"?: boolean, readonly "title"?: string, readonly "username"?: string, readonly "webhook_url"?: ConfigSecretURL, readonly "webhook_url_file"?: string }
export const ConfigDiscordConfig = Schema.Struct({ "avatar_url": Schema.optionalKey(Schema.String), "content": Schema.optionalKey(Schema.String), "http_config": Schema.optionalKey(ConfigHTTPClientConfig), "message": Schema.optionalKey(Schema.String), "send_resolved": Schema.optionalKey(Schema.Boolean), "title": Schema.optionalKey(Schema.String), "username": Schema.optionalKey(Schema.String), "webhook_url": Schema.optionalKey(ConfigSecretURL), "webhook_url_file": Schema.optionalKey(Schema.String) })
export type ConfigIncidentioConfig = { readonly "alert_source_token"?: string, readonly "alert_source_token_file"?: string, readonly "http_config"?: ConfigHTTPClientConfig, readonly "max_alerts"?: number, readonly "send_resolved"?: boolean, readonly "timeout"?: TimeDuration, readonly "url"?: ConfigURLType2, readonly "url_file"?: string }
export const ConfigIncidentioConfig = Schema.Struct({ "alert_source_token": Schema.optionalKey(Schema.String), "alert_source_token_file": Schema.optionalKey(Schema.String), "http_config": Schema.optionalKey(ConfigHTTPClientConfig), "max_alerts": Schema.optionalKey(Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0))), "send_resolved": Schema.optionalKey(Schema.Boolean), "timeout": Schema.optionalKey(TimeDuration), "url": Schema.optionalKey(ConfigURLType2), "url_file": Schema.optionalKey(Schema.String) })
export type ConfigJiraConfig = { readonly "api_type"?: string, readonly "api_url"?: ConfigURLType2, readonly "custom_fields"?: { readonly [x: string]: Schema.Json }, readonly "description"?: ConfigJiraFieldConfig, readonly "http_config"?: ConfigHTTPClientConfig, readonly "issue_type"?: string, readonly "labels"?: ReadonlyArray<string>, readonly "priority"?: string, readonly "project"?: string, readonly "reopen_duration"?: ModelDuration, readonly "reopen_transition"?: string, readonly "resolve_transition"?: string, readonly "send_resolved"?: boolean, readonly "summary"?: ConfigJiraFieldConfig, readonly "wont_fix_resolution"?: string }
export const ConfigJiraConfig = Schema.Struct({ "api_type": Schema.optionalKey(Schema.String), "api_url": Schema.optionalKey(ConfigURLType2), "custom_fields": Schema.optionalKey(Schema.Record(Schema.String, Schema.Json)), "description": Schema.optionalKey(ConfigJiraFieldConfig), "http_config": Schema.optionalKey(ConfigHTTPClientConfig), "issue_type": Schema.optionalKey(Schema.String), "labels": Schema.optionalKey(Schema.Array(Schema.String)), "priority": Schema.optionalKey(Schema.String), "project": Schema.optionalKey(Schema.String), "reopen_duration": Schema.optionalKey(ModelDuration), "reopen_transition": Schema.optionalKey(Schema.String), "resolve_transition": Schema.optionalKey(Schema.String), "send_resolved": Schema.optionalKey(Schema.Boolean), "summary": Schema.optionalKey(ConfigJiraFieldConfig), "wont_fix_resolution": Schema.optionalKey(Schema.String) })
export type ConfigMSTeamsConfig = { readonly "http_config"?: ConfigHTTPClientConfig, readonly "send_resolved"?: boolean, readonly "summary"?: string, readonly "text"?: string, readonly "title"?: string, readonly "webhook_url"?: ConfigSecretURL, readonly "webhook_url_file"?: string }
export const ConfigMSTeamsConfig = Schema.Struct({ "http_config": Schema.optionalKey(ConfigHTTPClientConfig), "send_resolved": Schema.optionalKey(Schema.Boolean), "summary": Schema.optionalKey(Schema.String), "text": Schema.optionalKey(Schema.String), "title": Schema.optionalKey(Schema.String), "webhook_url": Schema.optionalKey(ConfigSecretURL), "webhook_url_file": Schema.optionalKey(Schema.String) })
export type ConfigMSTeamsV2Config = { readonly "http_config"?: ConfigHTTPClientConfig, readonly "send_resolved"?: boolean, readonly "text"?: string, readonly "title"?: string, readonly "webhook_url"?: ConfigSecretURL, readonly "webhook_url_file"?: string }
export const ConfigMSTeamsV2Config = Schema.Struct({ "http_config": Schema.optionalKey(ConfigHTTPClientConfig), "send_resolved": Schema.optionalKey(Schema.Boolean), "text": Schema.optionalKey(Schema.String), "title": Schema.optionalKey(Schema.String), "webhook_url": Schema.optionalKey(ConfigSecretURL), "webhook_url_file": Schema.optionalKey(Schema.String) })
export type ConfigMattermostConfig = { readonly "attachments"?: ReadonlyArray<ConfigMattermostAttachment>, readonly "channel"?: string, readonly "http_config"?: ConfigHTTPClientConfig, readonly "icon_emoji"?: string, readonly "icon_url"?: string, readonly "priority"?: ConfigMattermostPriority, readonly "props"?: ConfigMattermostProps, readonly "send_resolved"?: boolean, readonly "text"?: string, readonly "type"?: string, readonly "username"?: string, readonly "webhook_url"?: ConfigSecretURL, readonly "webhook_url_file"?: string }
export const ConfigMattermostConfig = Schema.Struct({ "attachments": Schema.optionalKey(Schema.Array(ConfigMattermostAttachment)), "channel": Schema.optionalKey(Schema.String), "http_config": Schema.optionalKey(ConfigHTTPClientConfig), "icon_emoji": Schema.optionalKey(Schema.String), "icon_url": Schema.optionalKey(Schema.String), "priority": Schema.optionalKey(ConfigMattermostPriority), "props": Schema.optionalKey(ConfigMattermostProps), "send_resolved": Schema.optionalKey(Schema.Boolean), "text": Schema.optionalKey(Schema.String), "type": Schema.optionalKey(Schema.String), "username": Schema.optionalKey(Schema.String), "webhook_url": Schema.optionalKey(ConfigSecretURL), "webhook_url_file": Schema.optionalKey(Schema.String) })
export type ConfigOpsGenieConfig = { readonly "actions"?: string, readonly "api_key"?: string, readonly "api_key_file"?: string, readonly "api_url"?: ConfigURLType2, readonly "description"?: string, readonly "details"?: { readonly [x: string]: string }, readonly "entity"?: string, readonly "http_config"?: ConfigHTTPClientConfig, readonly "message"?: string, readonly "note"?: string, readonly "priority"?: string, readonly "responders"?: ReadonlyArray<ConfigOpsGenieConfigResponder>, readonly "send_resolved"?: boolean, readonly "source"?: string, readonly "tags"?: string, readonly "update_alerts"?: boolean }
export const ConfigOpsGenieConfig = Schema.Struct({ "actions": Schema.optionalKey(Schema.String), "api_key": Schema.optionalKey(Schema.String), "api_key_file": Schema.optionalKey(Schema.String), "api_url": Schema.optionalKey(ConfigURLType2), "description": Schema.optionalKey(Schema.String), "details": Schema.optionalKey(Schema.Record(Schema.String, Schema.String)), "entity": Schema.optionalKey(Schema.String), "http_config": Schema.optionalKey(ConfigHTTPClientConfig), "message": Schema.optionalKey(Schema.String), "note": Schema.optionalKey(Schema.String), "priority": Schema.optionalKey(Schema.String), "responders": Schema.optionalKey(Schema.Array(ConfigOpsGenieConfigResponder)), "send_resolved": Schema.optionalKey(Schema.Boolean), "source": Schema.optionalKey(Schema.String), "tags": Schema.optionalKey(Schema.String), "update_alerts": Schema.optionalKey(Schema.Boolean) })
export type ConfigPagerdutyConfig = { readonly "class"?: string, readonly "client"?: string, readonly "client_url"?: string, readonly "component"?: string, readonly "description"?: string, readonly "details"?: { readonly [x: string]: Schema.Json }, readonly "group"?: string, readonly "http_config"?: ConfigHTTPClientConfig, readonly "images"?: ReadonlyArray<ConfigPagerdutyImage>, readonly "links"?: ReadonlyArray<ConfigPagerdutyLink>, readonly "routing_key"?: string, readonly "routing_key_file"?: string, readonly "send_resolved"?: boolean, readonly "service_key"?: string, readonly "service_key_file"?: string, readonly "severity"?: string, readonly "source"?: string, readonly "timeout"?: TimeDuration, readonly "url"?: ConfigURLType2 }
export const ConfigPagerdutyConfig = Schema.Struct({ "class": Schema.optionalKey(Schema.String), "client": Schema.optionalKey(Schema.String), "client_url": Schema.optionalKey(Schema.String), "component": Schema.optionalKey(Schema.String), "description": Schema.optionalKey(Schema.String), "details": Schema.optionalKey(Schema.Record(Schema.String, Schema.Json)), "group": Schema.optionalKey(Schema.String), "http_config": Schema.optionalKey(ConfigHTTPClientConfig), "images": Schema.optionalKey(Schema.Array(ConfigPagerdutyImage)), "links": Schema.optionalKey(Schema.Array(ConfigPagerdutyLink)), "routing_key": Schema.optionalKey(Schema.String), "routing_key_file": Schema.optionalKey(Schema.String), "send_resolved": Schema.optionalKey(Schema.Boolean), "service_key": Schema.optionalKey(Schema.String), "service_key_file": Schema.optionalKey(Schema.String), "severity": Schema.optionalKey(Schema.String), "source": Schema.optionalKey(Schema.String), "timeout": Schema.optionalKey(TimeDuration), "url": Schema.optionalKey(ConfigURLType2) })
export type ConfigPushoverConfig = { readonly "device"?: string, readonly "expire"?: ConfigDuration, readonly "html"?: boolean, readonly "http_config"?: ConfigHTTPClientConfig, readonly "message"?: string, readonly "monospace"?: boolean, readonly "priority"?: string, readonly "retry"?: ConfigDuration, readonly "send_resolved"?: boolean, readonly "sound"?: string, readonly "title"?: string, readonly "token"?: string, readonly "token_file"?: string, readonly "ttl"?: ConfigDuration, readonly "url"?: string, readonly "url_title"?: string, readonly "user_key"?: string, readonly "user_key_file"?: string }
export const ConfigPushoverConfig = Schema.Struct({ "device": Schema.optionalKey(Schema.String), "expire": Schema.optionalKey(ConfigDuration), "html": Schema.optionalKey(Schema.Boolean), "http_config": Schema.optionalKey(ConfigHTTPClientConfig), "message": Schema.optionalKey(Schema.String), "monospace": Schema.optionalKey(Schema.Boolean), "priority": Schema.optionalKey(Schema.String), "retry": Schema.optionalKey(ConfigDuration), "send_resolved": Schema.optionalKey(Schema.Boolean), "sound": Schema.optionalKey(Schema.String), "title": Schema.optionalKey(Schema.String), "token": Schema.optionalKey(Schema.String), "token_file": Schema.optionalKey(Schema.String), "ttl": Schema.optionalKey(ConfigDuration), "url": Schema.optionalKey(Schema.String), "url_title": Schema.optionalKey(Schema.String), "user_key": Schema.optionalKey(Schema.String), "user_key_file": Schema.optionalKey(Schema.String) })
export type ConfigRocketchatConfig = { readonly "actions"?: ReadonlyArray<ConfigRocketchatAttachmentAction>, readonly "api_url"?: ConfigURLType2, readonly "channel"?: string, readonly "color"?: string, readonly "emoji"?: string, readonly "fields"?: ReadonlyArray<ConfigRocketchatAttachmentField>, readonly "http_config"?: ConfigHTTPClientConfig, readonly "icon_url"?: string, readonly "image_url"?: string, readonly "link_names"?: boolean, readonly "send_resolved"?: boolean, readonly "short_fields"?: boolean, readonly "text"?: string, readonly "thumb_url"?: string, readonly "title"?: string, readonly "title_link"?: string, readonly "token"?: string, readonly "token_file"?: string, readonly "token_id"?: string, readonly "token_id_file"?: string }
export const ConfigRocketchatConfig = Schema.Struct({ "actions": Schema.optionalKey(Schema.Array(ConfigRocketchatAttachmentAction)), "api_url": Schema.optionalKey(ConfigURLType2), "channel": Schema.optionalKey(Schema.String), "color": Schema.optionalKey(Schema.String), "emoji": Schema.optionalKey(Schema.String), "fields": Schema.optionalKey(Schema.Array(ConfigRocketchatAttachmentField)), "http_config": Schema.optionalKey(ConfigHTTPClientConfig), "icon_url": Schema.optionalKey(Schema.String), "image_url": Schema.optionalKey(Schema.String), "link_names": Schema.optionalKey(Schema.Boolean), "send_resolved": Schema.optionalKey(Schema.Boolean), "short_fields": Schema.optionalKey(Schema.Boolean), "text": Schema.optionalKey(Schema.String), "thumb_url": Schema.optionalKey(Schema.String), "title": Schema.optionalKey(Schema.String), "title_link": Schema.optionalKey(Schema.String), "token": Schema.optionalKey(Schema.String), "token_file": Schema.optionalKey(Schema.String), "token_id": Schema.optionalKey(Schema.String), "token_id_file": Schema.optionalKey(Schema.String) })
export type ConfigSNSConfig = { readonly "api_url"?: string, readonly "attributes"?: { readonly [x: string]: string }, readonly "http_config"?: ConfigHTTPClientConfig, readonly "message"?: string, readonly "phone_number"?: string, readonly "send_resolved"?: boolean, readonly "sigv4"?: Sigv4SigV4Config, readonly "subject"?: string, readonly "target_arn"?: string, readonly "topic_arn"?: string }
export const ConfigSNSConfig = Schema.Struct({ "api_url": Schema.optionalKey(Schema.String), "attributes": Schema.optionalKey(Schema.Record(Schema.String, Schema.String)), "http_config": Schema.optionalKey(ConfigHTTPClientConfig), "message": Schema.optionalKey(Schema.String), "phone_number": Schema.optionalKey(Schema.String), "send_resolved": Schema.optionalKey(Schema.Boolean), "sigv4": Schema.optionalKey(Sigv4SigV4Config), "subject": Schema.optionalKey(Schema.String), "target_arn": Schema.optionalKey(Schema.String), "topic_arn": Schema.optionalKey(Schema.String) })
export type ConfigSlackConfig = { readonly "actions"?: ReadonlyArray<ConfigSlackAction>, readonly "api_url"?: ConfigSecretURL, readonly "api_url_file"?: string, readonly "app_token"?: string, readonly "app_token_file"?: string, readonly "app_url"?: ConfigURLType2, readonly "callback_id"?: string, readonly "channel"?: string, readonly "color"?: string, readonly "fallback"?: string, readonly "fields"?: ReadonlyArray<ConfigSlackField>, readonly "footer"?: string, readonly "http_config"?: ConfigHTTPClientConfig, readonly "icon_emoji"?: string, readonly "icon_url"?: string, readonly "image_url"?: string, readonly "link_names"?: boolean, readonly "message_text"?: string, readonly "mrkdwn_in"?: ReadonlyArray<string>, readonly "pretext"?: string, readonly "send_resolved"?: boolean, readonly "short_fields"?: boolean, readonly "text"?: string, readonly "thumb_url"?: string, readonly "timeout"?: TimeDuration, readonly "title"?: string, readonly "title_link"?: string, readonly "username"?: string }
export const ConfigSlackConfig = Schema.Struct({ "actions": Schema.optionalKey(Schema.Array(ConfigSlackAction)), "api_url": Schema.optionalKey(ConfigSecretURL), "api_url_file": Schema.optionalKey(Schema.String), "app_token": Schema.optionalKey(Schema.String), "app_token_file": Schema.optionalKey(Schema.String), "app_url": Schema.optionalKey(ConfigURLType2), "callback_id": Schema.optionalKey(Schema.String), "channel": Schema.optionalKey(Schema.String), "color": Schema.optionalKey(Schema.String), "fallback": Schema.optionalKey(Schema.String), "fields": Schema.optionalKey(Schema.Array(ConfigSlackField)), "footer": Schema.optionalKey(Schema.String), "http_config": Schema.optionalKey(ConfigHTTPClientConfig), "icon_emoji": Schema.optionalKey(Schema.String), "icon_url": Schema.optionalKey(Schema.String), "image_url": Schema.optionalKey(Schema.String), "link_names": Schema.optionalKey(Schema.Boolean), "message_text": Schema.optionalKey(Schema.String), "mrkdwn_in": Schema.optionalKey(Schema.Array(Schema.String)), "pretext": Schema.optionalKey(Schema.String), "send_resolved": Schema.optionalKey(Schema.Boolean), "short_fields": Schema.optionalKey(Schema.Boolean), "text": Schema.optionalKey(Schema.String), "thumb_url": Schema.optionalKey(Schema.String), "timeout": Schema.optionalKey(TimeDuration), "title": Schema.optionalKey(Schema.String), "title_link": Schema.optionalKey(Schema.String), "username": Schema.optionalKey(Schema.String) })
export type ConfigTelegramConfig = { readonly "api_url"?: ConfigURLType2, readonly "chat"?: number, readonly "chat_file"?: string, readonly "disable_notifications"?: boolean, readonly "http_config"?: ConfigHTTPClientConfig, readonly "message"?: string, readonly "message_thread_id"?: number, readonly "parse_mode"?: string, readonly "send_resolved"?: boolean, readonly "token"?: string, readonly "token_file"?: string }
export const ConfigTelegramConfig = Schema.Struct({ "api_url": Schema.optionalKey(ConfigURLType2), "chat": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "chat_file": Schema.optionalKey(Schema.String), "disable_notifications": Schema.optionalKey(Schema.Boolean), "http_config": Schema.optionalKey(ConfigHTTPClientConfig), "message": Schema.optionalKey(Schema.String), "message_thread_id": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "parse_mode": Schema.optionalKey(Schema.String), "send_resolved": Schema.optionalKey(Schema.Boolean), "token": Schema.optionalKey(Schema.String), "token_file": Schema.optionalKey(Schema.String) })
export type ConfigVictorOpsConfig = { readonly "api_key"?: string, readonly "api_key_file"?: string, readonly "api_url"?: ConfigURLType2, readonly "custom_fields"?: { readonly [x: string]: string }, readonly "entity_display_name"?: string, readonly "http_config"?: ConfigHTTPClientConfig, readonly "message_type"?: string, readonly "monitoring_tool"?: string, readonly "routing_key"?: string, readonly "send_resolved"?: boolean, readonly "state_message"?: string }
export const ConfigVictorOpsConfig = Schema.Struct({ "api_key": Schema.optionalKey(Schema.String), "api_key_file": Schema.optionalKey(Schema.String), "api_url": Schema.optionalKey(ConfigURLType2), "custom_fields": Schema.optionalKey(Schema.Record(Schema.String, Schema.String)), "entity_display_name": Schema.optionalKey(Schema.String), "http_config": Schema.optionalKey(ConfigHTTPClientConfig), "message_type": Schema.optionalKey(Schema.String), "monitoring_tool": Schema.optionalKey(Schema.String), "routing_key": Schema.optionalKey(Schema.String), "send_resolved": Schema.optionalKey(Schema.Boolean), "state_message": Schema.optionalKey(Schema.String) })
export type ConfigWebexConfig = { readonly "api_url"?: ConfigURLType2, readonly "http_config"?: ConfigHTTPClientConfig, readonly "message"?: string, readonly "room_id"?: string, readonly "send_resolved"?: boolean }
export const ConfigWebexConfig = Schema.Struct({ "api_url": Schema.optionalKey(ConfigURLType2), "http_config": Schema.optionalKey(ConfigHTTPClientConfig), "message": Schema.optionalKey(Schema.String), "room_id": Schema.optionalKey(Schema.String), "send_resolved": Schema.optionalKey(Schema.Boolean) })
export type ConfigWebhookConfig = { readonly "http_config"?: ConfigHTTPClientConfig, readonly "max_alerts"?: number, readonly "send_resolved"?: boolean, readonly "timeout"?: TimeDuration, readonly "url"?: string, readonly "url_file"?: string }
export const ConfigWebhookConfig = Schema.Struct({ "http_config": Schema.optionalKey(ConfigHTTPClientConfig), "max_alerts": Schema.optionalKey(Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0))), "send_resolved": Schema.optionalKey(Schema.Boolean), "timeout": Schema.optionalKey(TimeDuration), "url": Schema.optionalKey(Schema.String), "url_file": Schema.optionalKey(Schema.String) })
export type ConfigWechatConfig = { readonly "agent_id"?: string, readonly "api_secret"?: string, readonly "api_secret_file"?: string, readonly "api_url"?: ConfigURLType2, readonly "corp_id"?: string, readonly "http_config"?: ConfigHTTPClientConfig, readonly "message"?: string, readonly "message_type"?: string, readonly "send_resolved"?: boolean, readonly "to_party"?: string, readonly "to_tag"?: string, readonly "to_user"?: string }
export const ConfigWechatConfig = Schema.Struct({ "agent_id": Schema.optionalKey(Schema.String), "api_secret": Schema.optionalKey(Schema.String), "api_secret_file": Schema.optionalKey(Schema.String), "api_url": Schema.optionalKey(ConfigURLType2), "corp_id": Schema.optionalKey(Schema.String), "http_config": Schema.optionalKey(ConfigHTTPClientConfig), "message": Schema.optionalKey(Schema.String), "message_type": Schema.optionalKey(Schema.String), "send_resolved": Schema.optionalKey(Schema.Boolean), "to_party": Schema.optionalKey(Schema.String), "to_tag": Schema.optionalKey(Schema.String), "to_user": Schema.optionalKey(Schema.String) })
export type AuthtypesGettableTransaction = { readonly "authorized": boolean, readonly "object": CoretypesObject, readonly "relation": AuthtypesRelation }
export const AuthtypesGettableTransaction = Schema.Struct({ "authorized": Schema.Boolean, "object": CoretypesObject, "relation": AuthtypesRelation })
export type AuthtypesTransaction = { readonly "object": CoretypesObject, readonly "relation": AuthtypesRelation }
export const AuthtypesTransaction = Schema.Struct({ "object": CoretypesObject, "relation": AuthtypesRelation })
export type AuthtypesTransactionGroup = { readonly "objectGroup": CoretypesObjectGroup, readonly "relation": AuthtypesRelation }
export const AuthtypesTransactionGroup = Schema.Struct({ "objectGroup": CoretypesObjectGroup, "relation": AuthtypesRelation })
export type DashboardtypesLayout = { readonly "kind": "Grid", readonly "spec": DashboardGridLayoutSpec }
export const DashboardtypesLayout = Schema.Union([Schema.Struct({ "kind": Schema.Literal("Grid"), "spec": DashboardGridLayoutSpec })], { mode: "oneOf" })
export type DashboardtypesListableDashboardForUserV2 = { readonly "dashboards": ReadonlyArray<DashboardtypesListedDashboardForUserV2>, readonly "reservedKeywords": ReadonlyArray<string>, readonly "tags": ReadonlyArray<TagtypesGettableTag>, readonly "total": number }
export const DashboardtypesListableDashboardForUserV2 = Schema.Struct({ "dashboards": Schema.Array(DashboardtypesListedDashboardForUserV2), "reservedKeywords": Schema.Array(Schema.String), "tags": Schema.Array(TagtypesGettableTag), "total": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()) })
export type DashboardtypesListableDashboardV2 = { readonly "dashboards": ReadonlyArray<DashboardtypesListedDashboardV2>, readonly "reservedKeywords": ReadonlyArray<string>, readonly "tags": ReadonlyArray<TagtypesGettableTag>, readonly "total": number }
export const DashboardtypesListableDashboardV2 = Schema.Struct({ "dashboards": Schema.Array(DashboardtypesListedDashboardV2), "reservedKeywords": Schema.Array(Schema.String), "tags": Schema.Array(TagtypesGettableTag), "total": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()) })
export type DashboardtypesListableDashboardView = { readonly "views": ReadonlyArray<DashboardtypesDashboardView> }
export const DashboardtypesListableDashboardView = Schema.Struct({ "views": Schema.Array(DashboardtypesDashboardView) })
export type DashboardtypesPanelPlugin = { readonly "kind": "signoz/TimeSeriesPanel", readonly "spec": DashboardtypesTimeSeriesPanelSpec } | { readonly "kind": "signoz/BarChartPanel", readonly "spec": DashboardtypesBarChartPanelSpec } | { readonly "kind": "signoz/NumberPanel", readonly "spec": DashboardtypesNumberPanelSpec } | { readonly "kind": "signoz/PieChartPanel", readonly "spec": DashboardtypesPieChartPanelSpec } | { readonly "kind": "signoz/TablePanel", readonly "spec": DashboardtypesTablePanelSpec } | { readonly "kind": "signoz/HistogramPanel", readonly "spec": DashboardtypesHistogramPanelSpec } | { readonly "kind": "signoz/ListPanel", readonly "spec": DashboardtypesListPanelSpec }
export const DashboardtypesPanelPlugin = Schema.Union([Schema.Struct({ "kind": Schema.Literal("signoz/TimeSeriesPanel"), "spec": DashboardtypesTimeSeriesPanelSpec }), Schema.Struct({ "kind": Schema.Literal("signoz/BarChartPanel"), "spec": DashboardtypesBarChartPanelSpec }), Schema.Struct({ "kind": Schema.Literal("signoz/NumberPanel"), "spec": DashboardtypesNumberPanelSpec }), Schema.Struct({ "kind": Schema.Literal("signoz/PieChartPanel"), "spec": DashboardtypesPieChartPanelSpec }), Schema.Struct({ "kind": Schema.Literal("signoz/TablePanel"), "spec": DashboardtypesTablePanelSpec }), Schema.Struct({ "kind": Schema.Literal("signoz/HistogramPanel"), "spec": DashboardtypesHistogramPanelSpec }), Schema.Struct({ "kind": Schema.Literal("signoz/ListPanel"), "spec": DashboardtypesListPanelSpec })], { mode: "oneOf" })
export type LlmpricingruletypesGettablePricingRules = { readonly "items": ReadonlyArray<{ readonly "createdAt"?: string, readonly "createdBy"?: string, readonly "enabled": boolean, readonly "id": string, readonly "isOverride": boolean, readonly "modelName": string, readonly "modelPattern": LlmpricingruletypesStringSlice, readonly "orgId": string, readonly "pricing": LlmpricingruletypesLLMRulePricing, readonly "provider": string, readonly "sourceId"?: string, readonly "syncedAt"?: string, readonly "unit": LlmpricingruletypesLLMPricingRuleUnit, readonly "updatedAt"?: string, readonly "updatedBy"?: string }>, readonly "limit": number, readonly "offset": number, readonly "total": number }
export const LlmpricingruletypesGettablePricingRules = Schema.Struct({ "items": Schema.Union([Schema.Array(Schema.Struct({ "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "createdBy": Schema.optionalKey(Schema.String), "enabled": Schema.Boolean, "id": Schema.String, "isOverride": Schema.Boolean, "modelName": Schema.String, "modelPattern": LlmpricingruletypesStringSlice, "orgId": Schema.String, "pricing": LlmpricingruletypesLLMRulePricing, "provider": Schema.String, "sourceId": Schema.optionalKey(Schema.String), "syncedAt": Schema.optionalKey(Schema.Union([Schema.String.annotate({ "format": "date-time" })])), "unit": LlmpricingruletypesLLMPricingRuleUnit, "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "updatedBy": Schema.optionalKey(Schema.String) }))]), "limit": Schema.Number.check(Schema.isInt()), "offset": Schema.Number.check(Schema.isInt()), "total": Schema.Number.check(Schema.isInt()) })
export type LlmpricingruletypesLLMPricingRule = { readonly "createdAt"?: string, readonly "createdBy"?: string, readonly "enabled": boolean, readonly "id": string, readonly "isOverride": boolean, readonly "modelName": string, readonly "modelPattern": LlmpricingruletypesStringSlice, readonly "orgId": string, readonly "pricing": LlmpricingruletypesLLMRulePricing, readonly "provider": string, readonly "sourceId"?: string, readonly "syncedAt"?: string, readonly "unit": LlmpricingruletypesLLMPricingRuleUnit, readonly "updatedAt"?: string, readonly "updatedBy"?: string }
export const LlmpricingruletypesLLMPricingRule = Schema.Struct({ "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "createdBy": Schema.optionalKey(Schema.String), "enabled": Schema.Boolean, "id": Schema.String, "isOverride": Schema.Boolean, "modelName": Schema.String, "modelPattern": LlmpricingruletypesStringSlice, "orgId": Schema.String, "pricing": LlmpricingruletypesLLMRulePricing, "provider": Schema.String, "sourceId": Schema.optionalKey(Schema.String), "syncedAt": Schema.optionalKey(Schema.Union([Schema.String.annotate({ "format": "date-time" })])), "unit": LlmpricingruletypesLLMPricingRuleUnit, "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "updatedBy": Schema.optionalKey(Schema.String) })
export type LlmpricingruletypesUpdatableLLMPricingRules = { readonly "rules": ReadonlyArray<{ readonly "enabled": boolean, readonly "id"?: string | null, readonly "isOverride"?: boolean | null, readonly "modelName": string, readonly "modelPattern": ReadonlyArray<string>, readonly "pricing": LlmpricingruletypesLLMRulePricing, readonly "provider": string, readonly "sourceId"?: string | null, readonly "unit": LlmpricingruletypesLLMPricingRuleUnit }> }
export const LlmpricingruletypesUpdatableLLMPricingRules = Schema.Struct({ "rules": Schema.Union([Schema.Array(Schema.Struct({ "enabled": Schema.Boolean, "id": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "isOverride": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "modelName": Schema.String, "modelPattern": Schema.Union([Schema.Array(Schema.String)]), "pricing": LlmpricingruletypesLLMRulePricing, "provider": Schema.String, "sourceId": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "unit": LlmpricingruletypesLLMPricingRuleUnit }))]) })
export type RuletypesEvaluationEnvelope = { readonly "kind": RuletypesEvaluationKind, readonly "spec": RuletypesRollingWindow } | { readonly "kind": RuletypesEvaluationKind, readonly "spec": RuletypesCumulativeWindow }
export const RuletypesEvaluationEnvelope = Schema.Union([Schema.Struct({ "kind": RuletypesEvaluationKind, "spec": RuletypesRollingWindow }), Schema.Struct({ "kind": RuletypesEvaluationKind, "spec": RuletypesCumulativeWindow })], { mode: "oneOf" })
export type SpantypesGettableSpanMappers = { readonly "items": ReadonlyArray<SpantypesSpanMapper> }
export const SpantypesGettableSpanMappers = Schema.Struct({ "items": Schema.Array(SpantypesSpanMapper) })
export type Querybuildertypesv5PreviewStatement = { readonly "db.statement.args": ReadonlyArray<Schema.Json>, readonly "db.statement.query": string, readonly "estimate": ReadonlyArray<TelemetrystoretypesEstimateEntry>, readonly "granules": TelemetrystoretypesGranules }
export const Querybuildertypesv5PreviewStatement = Schema.Struct({ "db.statement.args": Schema.Array(Schema.Json), "db.statement.query": Schema.String, "estimate": Schema.Array(TelemetrystoretypesEstimateEntry), "granules": TelemetrystoretypesGranules })
export type DashboardtypesListVariableSpec = { readonly "allowAllValue"?: boolean, readonly "allowMultiple"?: boolean, readonly "capturingRegexp"?: string, readonly "customAllValue"?: string, readonly "defaultValue"?: DashboardtypesVariableDefaultValue, readonly "display": DashboardtypesDisplay, readonly "name": string, readonly "plugin"?: DashboardtypesVariablePlugin, readonly "sort"?: DashboardtypesListVariableSpecSort }
export const DashboardtypesListVariableSpec = Schema.Struct({ "allowAllValue": Schema.optionalKey(Schema.Boolean), "allowMultiple": Schema.optionalKey(Schema.Boolean), "capturingRegexp": Schema.optionalKey(Schema.String), "customAllValue": Schema.optionalKey(Schema.String), "defaultValue": Schema.optionalKey(DashboardtypesVariableDefaultValue), "display": DashboardtypesDisplay, "name": Schema.String.check(Schema.isMinLength(1)), "plugin": Schema.optionalKey(DashboardtypesVariablePlugin), "sort": Schema.optionalKey(DashboardtypesListVariableSpecSort) })
export type InframonitoringtypesPostableClusters = { readonly "end": number, readonly "filter"?: Querybuildertypesv5Filter, readonly "groupBy"?: ReadonlyArray<{ readonly "description"?: string, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "name": string, readonly "signal"?: TelemetrytypesSignal, readonly "unit"?: string }>, readonly "limit": number, readonly "offset"?: number, readonly "orderBy"?: Querybuildertypesv5OrderBy, readonly "start": number }
export const InframonitoringtypesPostableClusters = Schema.Struct({ "end": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "filter": Schema.optionalKey(Querybuildertypesv5Filter), "groupBy": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "description": Schema.optionalKey(Schema.String), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "name": Schema.String, "signal": Schema.optionalKey(TelemetrytypesSignal), "unit": Schema.optionalKey(Schema.String) }))])), "limit": Schema.Number.check(Schema.isInt()), "offset": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "orderBy": Schema.optionalKey(Querybuildertypesv5OrderBy), "start": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()) })
export type InframonitoringtypesPostableContainers = { readonly "end": number, readonly "filter"?: Querybuildertypesv5Filter, readonly "groupBy"?: ReadonlyArray<{ readonly "description"?: string, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "name": string, readonly "signal"?: TelemetrytypesSignal, readonly "unit"?: string }>, readonly "limit": number, readonly "offset"?: number, readonly "orderBy"?: Querybuildertypesv5OrderBy, readonly "start": number }
export const InframonitoringtypesPostableContainers = Schema.Struct({ "end": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "filter": Schema.optionalKey(Querybuildertypesv5Filter), "groupBy": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "description": Schema.optionalKey(Schema.String), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "name": Schema.String, "signal": Schema.optionalKey(TelemetrytypesSignal), "unit": Schema.optionalKey(Schema.String) }))])), "limit": Schema.Number.check(Schema.isInt()), "offset": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "orderBy": Schema.optionalKey(Querybuildertypesv5OrderBy), "start": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()) })
export type InframonitoringtypesPostableDaemonSets = { readonly "end": number, readonly "filter"?: Querybuildertypesv5Filter, readonly "groupBy"?: ReadonlyArray<{ readonly "description"?: string, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "name": string, readonly "signal"?: TelemetrytypesSignal, readonly "unit"?: string }>, readonly "limit": number, readonly "offset"?: number, readonly "orderBy"?: Querybuildertypesv5OrderBy, readonly "start": number }
export const InframonitoringtypesPostableDaemonSets = Schema.Struct({ "end": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "filter": Schema.optionalKey(Querybuildertypesv5Filter), "groupBy": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "description": Schema.optionalKey(Schema.String), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "name": Schema.String, "signal": Schema.optionalKey(TelemetrytypesSignal), "unit": Schema.optionalKey(Schema.String) }))])), "limit": Schema.Number.check(Schema.isInt()), "offset": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "orderBy": Schema.optionalKey(Querybuildertypesv5OrderBy), "start": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()) })
export type InframonitoringtypesPostableDeployments = { readonly "end": number, readonly "filter"?: Querybuildertypesv5Filter, readonly "groupBy"?: ReadonlyArray<{ readonly "description"?: string, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "name": string, readonly "signal"?: TelemetrytypesSignal, readonly "unit"?: string }>, readonly "limit": number, readonly "offset"?: number, readonly "orderBy"?: Querybuildertypesv5OrderBy, readonly "start": number }
export const InframonitoringtypesPostableDeployments = Schema.Struct({ "end": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "filter": Schema.optionalKey(Querybuildertypesv5Filter), "groupBy": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "description": Schema.optionalKey(Schema.String), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "name": Schema.String, "signal": Schema.optionalKey(TelemetrytypesSignal), "unit": Schema.optionalKey(Schema.String) }))])), "limit": Schema.Number.check(Schema.isInt()), "offset": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "orderBy": Schema.optionalKey(Querybuildertypesv5OrderBy), "start": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()) })
export type InframonitoringtypesPostableHosts = { readonly "end": number, readonly "filter"?: InframonitoringtypesHostFilter, readonly "groupBy"?: ReadonlyArray<{ readonly "description"?: string, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "name": string, readonly "signal"?: TelemetrytypesSignal, readonly "unit"?: string }>, readonly "limit": number, readonly "offset"?: number, readonly "orderBy"?: Querybuildertypesv5OrderBy, readonly "start": number }
export const InframonitoringtypesPostableHosts = Schema.Struct({ "end": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "filter": Schema.optionalKey(InframonitoringtypesHostFilter), "groupBy": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "description": Schema.optionalKey(Schema.String), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "name": Schema.String, "signal": Schema.optionalKey(TelemetrytypesSignal), "unit": Schema.optionalKey(Schema.String) }))])), "limit": Schema.Number.check(Schema.isInt()), "offset": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "orderBy": Schema.optionalKey(Querybuildertypesv5OrderBy), "start": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()) })
export type InframonitoringtypesPostableJobs = { readonly "end": number, readonly "filter"?: Querybuildertypesv5Filter, readonly "groupBy"?: ReadonlyArray<{ readonly "description"?: string, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "name": string, readonly "signal"?: TelemetrytypesSignal, readonly "unit"?: string }>, readonly "limit": number, readonly "offset"?: number, readonly "orderBy"?: Querybuildertypesv5OrderBy, readonly "start": number }
export const InframonitoringtypesPostableJobs = Schema.Struct({ "end": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "filter": Schema.optionalKey(Querybuildertypesv5Filter), "groupBy": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "description": Schema.optionalKey(Schema.String), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "name": Schema.String, "signal": Schema.optionalKey(TelemetrytypesSignal), "unit": Schema.optionalKey(Schema.String) }))])), "limit": Schema.Number.check(Schema.isInt()), "offset": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "orderBy": Schema.optionalKey(Querybuildertypesv5OrderBy), "start": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()) })
export type InframonitoringtypesPostableNamespaces = { readonly "end": number, readonly "filter"?: Querybuildertypesv5Filter, readonly "groupBy"?: ReadonlyArray<{ readonly "description"?: string, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "name": string, readonly "signal"?: TelemetrytypesSignal, readonly "unit"?: string }>, readonly "limit": number, readonly "offset"?: number, readonly "orderBy"?: Querybuildertypesv5OrderBy, readonly "start": number }
export const InframonitoringtypesPostableNamespaces = Schema.Struct({ "end": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "filter": Schema.optionalKey(Querybuildertypesv5Filter), "groupBy": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "description": Schema.optionalKey(Schema.String), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "name": Schema.String, "signal": Schema.optionalKey(TelemetrytypesSignal), "unit": Schema.optionalKey(Schema.String) }))])), "limit": Schema.Number.check(Schema.isInt()), "offset": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "orderBy": Schema.optionalKey(Querybuildertypesv5OrderBy), "start": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()) })
export type InframonitoringtypesPostableNodes = { readonly "end": number, readonly "filter"?: Querybuildertypesv5Filter, readonly "groupBy"?: ReadonlyArray<{ readonly "description"?: string, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "name": string, readonly "signal"?: TelemetrytypesSignal, readonly "unit"?: string }>, readonly "limit": number, readonly "offset"?: number, readonly "orderBy"?: Querybuildertypesv5OrderBy, readonly "start": number }
export const InframonitoringtypesPostableNodes = Schema.Struct({ "end": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "filter": Schema.optionalKey(Querybuildertypesv5Filter), "groupBy": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "description": Schema.optionalKey(Schema.String), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "name": Schema.String, "signal": Schema.optionalKey(TelemetrytypesSignal), "unit": Schema.optionalKey(Schema.String) }))])), "limit": Schema.Number.check(Schema.isInt()), "offset": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "orderBy": Schema.optionalKey(Querybuildertypesv5OrderBy), "start": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()) })
export type InframonitoringtypesPostablePods = { readonly "end": number, readonly "filter"?: Querybuildertypesv5Filter, readonly "groupBy"?: ReadonlyArray<{ readonly "description"?: string, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "name": string, readonly "signal"?: TelemetrytypesSignal, readonly "unit"?: string }>, readonly "limit": number, readonly "offset"?: number, readonly "orderBy"?: Querybuildertypesv5OrderBy, readonly "start": number }
export const InframonitoringtypesPostablePods = Schema.Struct({ "end": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "filter": Schema.optionalKey(Querybuildertypesv5Filter), "groupBy": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "description": Schema.optionalKey(Schema.String), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "name": Schema.String, "signal": Schema.optionalKey(TelemetrytypesSignal), "unit": Schema.optionalKey(Schema.String) }))])), "limit": Schema.Number.check(Schema.isInt()), "offset": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "orderBy": Schema.optionalKey(Querybuildertypesv5OrderBy), "start": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()) })
export type InframonitoringtypesPostableStatefulSets = { readonly "end": number, readonly "filter"?: Querybuildertypesv5Filter, readonly "groupBy"?: ReadonlyArray<{ readonly "description"?: string, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "name": string, readonly "signal"?: TelemetrytypesSignal, readonly "unit"?: string }>, readonly "limit": number, readonly "offset"?: number, readonly "orderBy"?: Querybuildertypesv5OrderBy, readonly "start": number }
export const InframonitoringtypesPostableStatefulSets = Schema.Struct({ "end": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "filter": Schema.optionalKey(Querybuildertypesv5Filter), "groupBy": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "description": Schema.optionalKey(Schema.String), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "name": Schema.String, "signal": Schema.optionalKey(TelemetrytypesSignal), "unit": Schema.optionalKey(Schema.String) }))])), "limit": Schema.Number.check(Schema.isInt()), "offset": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "orderBy": Schema.optionalKey(Querybuildertypesv5OrderBy), "start": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()) })
export type InframonitoringtypesPostableVolumes = { readonly "end": number, readonly "filter"?: Querybuildertypesv5Filter, readonly "groupBy"?: ReadonlyArray<{ readonly "description"?: string, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "name": string, readonly "signal"?: TelemetrytypesSignal, readonly "unit"?: string }>, readonly "limit": number, readonly "offset"?: number, readonly "orderBy"?: Querybuildertypesv5OrderBy, readonly "start": number }
export const InframonitoringtypesPostableVolumes = Schema.Struct({ "end": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "filter": Schema.optionalKey(Querybuildertypesv5Filter), "groupBy": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "description": Schema.optionalKey(Schema.String), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "name": Schema.String, "signal": Schema.optionalKey(TelemetrytypesSignal), "unit": Schema.optionalKey(Schema.String) }))])), "limit": Schema.Number.check(Schema.isInt()), "offset": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "orderBy": Schema.optionalKey(Querybuildertypesv5OrderBy), "start": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()) })
export type MetricsexplorertypesStatsRequest = { readonly "end": number, readonly "filter"?: Querybuildertypesv5Filter, readonly "limit": number, readonly "offset"?: number, readonly "orderBy"?: Querybuildertypesv5OrderBy, readonly "start": number }
export const MetricsexplorertypesStatsRequest = Schema.Struct({ "end": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "filter": Schema.optionalKey(Querybuildertypesv5Filter), "limit": Schema.Number.check(Schema.isInt()), "offset": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "orderBy": Schema.optionalKey(Querybuildertypesv5OrderBy), "start": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()) })
export type Querybuildertypesv5CompositeQuery = { readonly "queries"?: ReadonlyArray<{ readonly "spec"?: Querybuildertypesv5BuilderQuerySpec, readonly "type": Querybuildertypesv5QueryType } | { readonly "spec"?: Querybuildertypesv5QueryBuilderFormula, readonly "type": Querybuildertypesv5QueryType } | { readonly "spec"?: Querybuildertypesv5QueryBuilderTraceOperator, readonly "type": Querybuildertypesv5QueryType } | { readonly "spec"?: Querybuildertypesv5PromQuery, readonly "type": Querybuildertypesv5QueryType } | { readonly "spec"?: Querybuildertypesv5ClickHouseQuery, readonly "type": Querybuildertypesv5QueryType }> }
export const Querybuildertypesv5CompositeQuery = Schema.Struct({ "queries": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Union([Schema.Struct({ "spec": Schema.optionalKey(Querybuildertypesv5BuilderQuerySpec), "type": Querybuildertypesv5QueryType }), Schema.Struct({ "spec": Schema.optionalKey(Querybuildertypesv5QueryBuilderFormula), "type": Querybuildertypesv5QueryType }), Schema.Struct({ "spec": Schema.optionalKey(Querybuildertypesv5QueryBuilderTraceOperator), "type": Querybuildertypesv5QueryType }), Schema.Struct({ "spec": Schema.optionalKey(Querybuildertypesv5PromQuery), "type": Querybuildertypesv5QueryType }), Schema.Struct({ "spec": Schema.optionalKey(Querybuildertypesv5ClickHouseQuery), "type": Querybuildertypesv5QueryType })], { mode: "oneOf" }))])) }).annotate({ "description": "Composite query containing one or more query envelopes. Each query envelope specifies its type and corresponding spec." })
export type RuletypesAlertCompositeQuery = { readonly "panelType": RuletypesPanelType, readonly "queries": ReadonlyArray<{ readonly "spec"?: Querybuildertypesv5BuilderQuerySpec, readonly "type": Querybuildertypesv5QueryType } | { readonly "spec"?: Querybuildertypesv5QueryBuilderFormula, readonly "type": Querybuildertypesv5QueryType } | { readonly "spec"?: Querybuildertypesv5QueryBuilderTraceOperator, readonly "type": Querybuildertypesv5QueryType } | { readonly "spec"?: Querybuildertypesv5PromQuery, readonly "type": Querybuildertypesv5QueryType } | { readonly "spec"?: Querybuildertypesv5ClickHouseQuery, readonly "type": Querybuildertypesv5QueryType }>, readonly "queryType": RuletypesQueryType, readonly "unit"?: string }
export const RuletypesAlertCompositeQuery = Schema.Struct({ "panelType": RuletypesPanelType, "queries": Schema.Union([Schema.Array(Schema.Union([Schema.Struct({ "spec": Schema.optionalKey(Querybuildertypesv5BuilderQuerySpec), "type": Querybuildertypesv5QueryType }), Schema.Struct({ "spec": Schema.optionalKey(Querybuildertypesv5QueryBuilderFormula), "type": Querybuildertypesv5QueryType }), Schema.Struct({ "spec": Schema.optionalKey(Querybuildertypesv5QueryBuilderTraceOperator), "type": Querybuildertypesv5QueryType }), Schema.Struct({ "spec": Schema.optionalKey(Querybuildertypesv5PromQuery), "type": Querybuildertypesv5QueryType }), Schema.Struct({ "spec": Schema.optionalKey(Querybuildertypesv5ClickHouseQuery), "type": Querybuildertypesv5QueryType })], { mode: "oneOf" }))]), "queryType": RuletypesQueryType, "unit": Schema.optionalKey(Schema.String) })
export type MetricsexplorertypesInspectMetricsResponse = { readonly "series": ReadonlyArray<{ readonly "labels"?: ReadonlyArray<Querybuildertypesv5Label>, readonly "values"?: ReadonlyArray<{ readonly "bucket"?: Querybuildertypesv5Bucket, readonly "partial"?: boolean, readonly "timestamp"?: number, readonly "value"?: SignoztypesFloat64, readonly "values"?: ReadonlyArray<SignoztypesFloat64> }> }> }
export const MetricsexplorertypesInspectMetricsResponse = Schema.Struct({ "series": Schema.Union([Schema.Array(Schema.Struct({ "labels": Schema.optionalKey(Schema.Array(Querybuildertypesv5Label)), "values": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "bucket": Schema.optionalKey(Querybuildertypesv5Bucket), "partial": Schema.optionalKey(Schema.Boolean), "timestamp": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "value": Schema.optionalKey(SignoztypesFloat64), "values": Schema.optionalKey(Schema.Array(SignoztypesFloat64)) }))])) }))]) })
export type Querybuildertypesv5TimeSeries = { readonly "labels"?: ReadonlyArray<Querybuildertypesv5Label>, readonly "values"?: ReadonlyArray<{ readonly "bucket"?: Querybuildertypesv5Bucket, readonly "partial"?: boolean, readonly "timestamp"?: number, readonly "value"?: SignoztypesFloat64, readonly "values"?: ReadonlyArray<SignoztypesFloat64> }> }
export const Querybuildertypesv5TimeSeries = Schema.Struct({ "labels": Schema.optionalKey(Schema.Array(Querybuildertypesv5Label)), "values": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "bucket": Schema.optionalKey(Querybuildertypesv5Bucket), "partial": Schema.optionalKey(Schema.Boolean), "timestamp": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "value": Schema.optionalKey(SignoztypesFloat64), "values": Schema.optionalKey(Schema.Array(SignoztypesFloat64)) }))])) })
export type SpantypesPostableTraceAggregations = { readonly "aggregations": ReadonlyArray<SpantypesSpanAggregation> }
export const SpantypesPostableTraceAggregations = Schema.Struct({ "aggregations": Schema.Array(SpantypesSpanAggregation) })
export type SpantypesGettableTraceAggregations = { readonly "aggregations": ReadonlyArray<SpantypesSpanAggregationResult> }
export const SpantypesGettableTraceAggregations = Schema.Struct({ "aggregations": Schema.Array(SpantypesSpanAggregationResult) })
export type AuthtypesSessionContext = { readonly "exists"?: boolean, readonly "orgs"?: ReadonlyArray<{ readonly "authNSupport"?: AuthtypesAuthNSupport, readonly "id"?: string, readonly "name"?: string, readonly "warning"?: ErrorsJSON }> }
export const AuthtypesSessionContext = Schema.Struct({ "exists": Schema.optionalKey(Schema.Boolean), "orgs": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "authNSupport": Schema.optionalKey(AuthtypesAuthNSupport), "id": Schema.optionalKey(Schema.String), "name": Schema.optionalKey(Schema.String), "warning": Schema.optionalKey(ErrorsJSON) }))])) })
export type RenderErrorResponse = { readonly "error": ErrorsJSON, readonly "status": string }
export const RenderErrorResponse = Schema.Struct({ "error": ErrorsJSON, "status": Schema.String })
export type SpantypesGettableFlamegraphTrace = { readonly "endTimestampMillis": number, readonly "hasMore": boolean, readonly "spans": ReadonlyArray<ReadonlyArray<SpantypesFlamegraphSpan>>, readonly "startTimestampMillis": number }
export const SpantypesGettableFlamegraphTrace = Schema.Struct({ "endTimestampMillis": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "hasMore": Schema.Boolean, "spans": Schema.Array(Schema.Array(SpantypesFlamegraphSpan)), "startTimestampMillis": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()) })
export type SpantypesGettableWaterfallTrace = { readonly "endTimestampMillis"?: SignoztypesInt64, readonly "hasMissingSpans"?: boolean, readonly "hasMore"?: boolean, readonly "rootServiceEntryPoint"?: string, readonly "rootServiceName"?: string, readonly "spans"?: ReadonlyArray<SpantypesWaterfallSpan> | null, readonly "startTimestampMillis"?: SignoztypesInt64, readonly "totalErrorSpansCount"?: number, readonly "totalSpansCount"?: number, readonly "uncollapsedSpans"?: ReadonlyArray<string> | null }
export const SpantypesGettableWaterfallTrace = Schema.Struct({ "endTimestampMillis": Schema.optionalKey(SignoztypesInt64), "hasMissingSpans": Schema.optionalKey(Schema.Boolean), "hasMore": Schema.optionalKey(Schema.Boolean), "rootServiceEntryPoint": Schema.optionalKey(Schema.String), "rootServiceName": Schema.optionalKey(Schema.String), "spans": Schema.optionalKey(Schema.Union([Schema.Array(SpantypesWaterfallSpan), Schema.Null], { mode: "oneOf" })), "startTimestampMillis": Schema.optionalKey(SignoztypesInt64), "totalErrorSpansCount": Schema.optionalKey(Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0))), "totalSpansCount": Schema.optionalKey(Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0))), "uncollapsedSpans": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null], { mode: "oneOf" })) })
export type CloudintegrationtypesProviderIntegrationConfig = { readonly "aws"?: CloudintegrationtypesAWSIntegrationConfig, readonly "azure"?: CloudintegrationtypesAzureIntegrationConfig, readonly "gcp"?: CloudintegrationtypesGCPIntegrationConfig }
export const CloudintegrationtypesProviderIntegrationConfig = Schema.Struct({ "aws": Schema.optionalKey(CloudintegrationtypesAWSIntegrationConfig), "azure": Schema.optionalKey(CloudintegrationtypesAzureIntegrationConfig), "gcp": Schema.optionalKey(CloudintegrationtypesGCPIntegrationConfig) })
export type CloudintegrationtypesService = { readonly "assets": CloudintegrationtypesServiceAssets, readonly "cloudIntegrationService": CloudintegrationtypesCloudIntegrationService, readonly "dataCollected": CloudintegrationtypesDataCollected, readonly "icon": string, readonly "id": string, readonly "overview": string, readonly "supportedSignals": CloudintegrationtypesSupportedSignals, readonly "title": string }
export const CloudintegrationtypesService = Schema.Struct({ "assets": CloudintegrationtypesServiceAssets, "cloudIntegrationService": CloudintegrationtypesCloudIntegrationService, "dataCollected": CloudintegrationtypesDataCollected, "icon": Schema.String, "id": Schema.String, "overview": Schema.String, "supportedSignals": CloudintegrationtypesSupportedSignals, "title": Schema.String })
export type AlertmanagertypesPostableChannel = { readonly "discord_configs"?: ReadonlyArray<ConfigDiscordConfig>, readonly "email_configs"?: ReadonlyArray<ConfigEmailConfig>, readonly "googlechat_configs"?: ReadonlyArray<AlertmanagertypesGoogleChatReceiverConfig>, readonly "incidentio_configs"?: ReadonlyArray<ConfigIncidentioConfig>, readonly "jira_configs"?: ReadonlyArray<ConfigJiraConfig>, readonly "mattermost_configs"?: ReadonlyArray<ConfigMattermostConfig>, readonly "msteams_configs"?: ReadonlyArray<ConfigMSTeamsConfig>, readonly "msteamsv2_configs"?: ReadonlyArray<ConfigMSTeamsV2Config>, readonly "name": string, readonly "opsgenie_configs"?: ReadonlyArray<ConfigOpsGenieConfig>, readonly "pagerduty_configs"?: ReadonlyArray<ConfigPagerdutyConfig>, readonly "pushover_configs"?: ReadonlyArray<ConfigPushoverConfig>, readonly "rocketchat_configs"?: ReadonlyArray<ConfigRocketchatConfig>, readonly "slack_configs"?: ReadonlyArray<ConfigSlackConfig>, readonly "sns_configs"?: ReadonlyArray<ConfigSNSConfig>, readonly "telegram_configs"?: ReadonlyArray<ConfigTelegramConfig>, readonly "victorops_configs"?: ReadonlyArray<ConfigVictorOpsConfig>, readonly "webex_configs"?: ReadonlyArray<ConfigWebexConfig>, readonly "webhook_configs"?: ReadonlyArray<ConfigWebhookConfig>, readonly "wechat_configs"?: ReadonlyArray<ConfigWechatConfig> }
export const AlertmanagertypesPostableChannel = Schema.Struct({ "discord_configs": Schema.optionalKey(Schema.Array(ConfigDiscordConfig)), "email_configs": Schema.optionalKey(Schema.Array(ConfigEmailConfig)), "googlechat_configs": Schema.optionalKey(Schema.Array(AlertmanagertypesGoogleChatReceiverConfig)), "incidentio_configs": Schema.optionalKey(Schema.Array(ConfigIncidentioConfig)), "jira_configs": Schema.optionalKey(Schema.Array(ConfigJiraConfig)), "mattermost_configs": Schema.optionalKey(Schema.Array(ConfigMattermostConfig)), "msteams_configs": Schema.optionalKey(Schema.Array(ConfigMSTeamsConfig)), "msteamsv2_configs": Schema.optionalKey(Schema.Array(ConfigMSTeamsV2Config)), "name": Schema.String, "opsgenie_configs": Schema.optionalKey(Schema.Array(ConfigOpsGenieConfig)), "pagerduty_configs": Schema.optionalKey(Schema.Array(ConfigPagerdutyConfig)), "pushover_configs": Schema.optionalKey(Schema.Array(ConfigPushoverConfig)), "rocketchat_configs": Schema.optionalKey(Schema.Array(ConfigRocketchatConfig)), "slack_configs": Schema.optionalKey(Schema.Array(ConfigSlackConfig)), "sns_configs": Schema.optionalKey(Schema.Array(ConfigSNSConfig)), "telegram_configs": Schema.optionalKey(Schema.Array(ConfigTelegramConfig)), "victorops_configs": Schema.optionalKey(Schema.Array(ConfigVictorOpsConfig)), "webex_configs": Schema.optionalKey(Schema.Array(ConfigWebexConfig)), "webhook_configs": Schema.optionalKey(Schema.Array(ConfigWebhookConfig)), "wechat_configs": Schema.optionalKey(Schema.Array(ConfigWechatConfig)) })
export type AlertmanagertypesReceiver = { readonly "discord_configs"?: ReadonlyArray<ConfigDiscordConfig>, readonly "email_configs"?: ReadonlyArray<ConfigEmailConfig>, readonly "googlechat_configs"?: ReadonlyArray<AlertmanagertypesGoogleChatReceiverConfig>, readonly "incidentio_configs"?: ReadonlyArray<ConfigIncidentioConfig>, readonly "jira_configs"?: ReadonlyArray<ConfigJiraConfig>, readonly "mattermost_configs"?: ReadonlyArray<ConfigMattermostConfig>, readonly "msteams_configs"?: ReadonlyArray<ConfigMSTeamsConfig>, readonly "msteamsv2_configs"?: ReadonlyArray<ConfigMSTeamsV2Config>, readonly "name"?: string, readonly "opsgenie_configs"?: ReadonlyArray<ConfigOpsGenieConfig>, readonly "pagerduty_configs"?: ReadonlyArray<ConfigPagerdutyConfig>, readonly "pushover_configs"?: ReadonlyArray<ConfigPushoverConfig>, readonly "rocketchat_configs"?: ReadonlyArray<ConfigRocketchatConfig>, readonly "slack_configs"?: ReadonlyArray<ConfigSlackConfig>, readonly "sns_configs"?: ReadonlyArray<ConfigSNSConfig>, readonly "telegram_configs"?: ReadonlyArray<ConfigTelegramConfig>, readonly "victorops_configs"?: ReadonlyArray<ConfigVictorOpsConfig>, readonly "webex_configs"?: ReadonlyArray<ConfigWebexConfig>, readonly "webhook_configs"?: ReadonlyArray<ConfigWebhookConfig>, readonly "wechat_configs"?: ReadonlyArray<ConfigWechatConfig> }
export const AlertmanagertypesReceiver = Schema.Struct({ "discord_configs": Schema.optionalKey(Schema.Array(ConfigDiscordConfig)), "email_configs": Schema.optionalKey(Schema.Array(ConfigEmailConfig)), "googlechat_configs": Schema.optionalKey(Schema.Array(AlertmanagertypesGoogleChatReceiverConfig)), "incidentio_configs": Schema.optionalKey(Schema.Array(ConfigIncidentioConfig)), "jira_configs": Schema.optionalKey(Schema.Array(ConfigJiraConfig)), "mattermost_configs": Schema.optionalKey(Schema.Array(ConfigMattermostConfig)), "msteams_configs": Schema.optionalKey(Schema.Array(ConfigMSTeamsConfig)), "msteamsv2_configs": Schema.optionalKey(Schema.Array(ConfigMSTeamsV2Config)), "name": Schema.optionalKey(Schema.String), "opsgenie_configs": Schema.optionalKey(Schema.Array(ConfigOpsGenieConfig)), "pagerduty_configs": Schema.optionalKey(Schema.Array(ConfigPagerdutyConfig)), "pushover_configs": Schema.optionalKey(Schema.Array(ConfigPushoverConfig)), "rocketchat_configs": Schema.optionalKey(Schema.Array(ConfigRocketchatConfig)), "slack_configs": Schema.optionalKey(Schema.Array(ConfigSlackConfig)), "sns_configs": Schema.optionalKey(Schema.Array(ConfigSNSConfig)), "telegram_configs": Schema.optionalKey(Schema.Array(ConfigTelegramConfig)), "victorops_configs": Schema.optionalKey(Schema.Array(ConfigVictorOpsConfig)), "webex_configs": Schema.optionalKey(Schema.Array(ConfigWebexConfig)), "webhook_configs": Schema.optionalKey(Schema.Array(ConfigWebhookConfig)), "wechat_configs": Schema.optionalKey(Schema.Array(ConfigWechatConfig)) })
export type AuthtypesTransactionGroups = ReadonlyArray<AuthtypesTransactionGroup>
export const AuthtypesTransactionGroups = Schema.Array(AuthtypesTransactionGroup)
export type DashboardtypesVariable = { readonly "kind": "ListVariable", readonly "spec": DashboardtypesListVariableSpec } | { readonly "kind": "TextVariable", readonly "spec": DashboardtypesTextVariableSpec }
export const DashboardtypesVariable = Schema.Union([Schema.Struct({ "kind": Schema.Literal("ListVariable"), "spec": DashboardtypesListVariableSpec }), Schema.Struct({ "kind": Schema.Literal("TextVariable"), "spec": DashboardtypesTextVariableSpec })], { mode: "oneOf" })
export type DashboardtypesQueryPlugin = { readonly "kind": "signoz/BuilderQuery", readonly "spec": DashboardtypesBuilderQuerySpec } | { readonly "kind": "signoz/CompositeQuery", readonly "spec": Querybuildertypesv5CompositeQuery } | { readonly "kind": "signoz/Formula", readonly "spec": Querybuildertypesv5QueryBuilderFormula } | { readonly "kind": "signoz/PromQLQuery", readonly "spec": Querybuildertypesv5PromQuery } | { readonly "kind": "signoz/ClickHouseSQL", readonly "spec": Querybuildertypesv5ClickHouseQuery } | { readonly "kind": "signoz/TraceOperator", readonly "spec": Querybuildertypesv5QueryBuilderTraceOperator }
export const DashboardtypesQueryPlugin = Schema.Union([Schema.Struct({ "kind": Schema.Literal("signoz/BuilderQuery"), "spec": DashboardtypesBuilderQuerySpec }), Schema.Struct({ "kind": Schema.Literal("signoz/CompositeQuery"), "spec": Querybuildertypesv5CompositeQuery }), Schema.Struct({ "kind": Schema.Literal("signoz/Formula"), "spec": Querybuildertypesv5QueryBuilderFormula }), Schema.Struct({ "kind": Schema.Literal("signoz/PromQLQuery"), "spec": Querybuildertypesv5PromQuery }), Schema.Struct({ "kind": Schema.Literal("signoz/ClickHouseSQL"), "spec": Querybuildertypesv5ClickHouseQuery }), Schema.Struct({ "kind": Schema.Literal("signoz/TraceOperator"), "spec": Querybuildertypesv5QueryBuilderTraceOperator })], { mode: "oneOf" })
export type Querybuildertypesv5QueryRangeRequest = { readonly "compositeQuery"?: Querybuildertypesv5CompositeQuery, readonly "end"?: number, readonly "formatOptions"?: Querybuildertypesv5FormatOptions, readonly "noCache"?: boolean, readonly "requestType"?: Querybuildertypesv5RequestType, readonly "schemaVersion"?: string, readonly "start"?: number, readonly "variables"?: { readonly [x: string]: Querybuildertypesv5VariableItem } }
export const Querybuildertypesv5QueryRangeRequest = Schema.Struct({ "compositeQuery": Schema.optionalKey(Querybuildertypesv5CompositeQuery), "end": Schema.optionalKey(Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0))), "formatOptions": Schema.optionalKey(Querybuildertypesv5FormatOptions), "noCache": Schema.optionalKey(Schema.Boolean), "requestType": Schema.optionalKey(Querybuildertypesv5RequestType), "schemaVersion": Schema.optionalKey(Schema.String), "start": Schema.optionalKey(Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0))), "variables": Schema.optionalKey(Schema.Record(Schema.String, Querybuildertypesv5VariableItem)) }).annotate({ "description": "Request body for the v5 query range endpoint. Supports builder queries (traces, logs, metrics), formulas, joins, trace operators, PromQL, and ClickHouse SQL queries." })
export type RuletypesRuleCondition = { readonly "absentFor"?: number, readonly "alertOnAbsent"?: boolean, readonly "algorithm"?: string, readonly "compositeQuery": RuletypesAlertCompositeQuery, readonly "matchType"?: RuletypesMatchType, readonly "op"?: RuletypesCompareOperator, readonly "requireMinPoints"?: boolean, readonly "requiredNumPoints"?: number, readonly "seasonality"?: RuletypesSeasonality, readonly "selectedQueryName"?: string, readonly "target"?: never, readonly "targetUnit"?: string, readonly "thresholds"?: RuletypesRuleThresholdData }
export const RuletypesRuleCondition = Schema.Struct({ "absentFor": Schema.optionalKey(Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0))), "alertOnAbsent": Schema.optionalKey(Schema.Boolean), "algorithm": Schema.optionalKey(Schema.String), "compositeQuery": RuletypesAlertCompositeQuery, "matchType": Schema.optionalKey(RuletypesMatchType), "op": Schema.optionalKey(RuletypesCompareOperator), "requireMinPoints": Schema.optionalKey(Schema.Boolean), "requiredNumPoints": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "seasonality": Schema.optionalKey(RuletypesSeasonality), "selectedQueryName": Schema.optionalKey(Schema.String), "target": Schema.optionalKey(Schema.Never), "targetUnit": Schema.optionalKey(Schema.String), "thresholds": Schema.optionalKey(RuletypesRuleThresholdData) })
export type Querybuildertypesv5AggregationBucket = { readonly "alias"?: string, readonly "anomalyScores"?: ReadonlyArray<Querybuildertypesv5TimeSeries>, readonly "index"?: number, readonly "lowerBoundSeries"?: ReadonlyArray<Querybuildertypesv5TimeSeries>, readonly "meta"?: { readonly "unit"?: string }, readonly "predictedSeries"?: ReadonlyArray<Querybuildertypesv5TimeSeries>, readonly "series"?: ReadonlyArray<Querybuildertypesv5TimeSeries> | null, readonly "upperBoundSeries"?: ReadonlyArray<Querybuildertypesv5TimeSeries> }
export const Querybuildertypesv5AggregationBucket = Schema.Struct({ "alias": Schema.optionalKey(Schema.String), "anomalyScores": Schema.optionalKey(Schema.Array(Querybuildertypesv5TimeSeries)), "index": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "lowerBoundSeries": Schema.optionalKey(Schema.Array(Querybuildertypesv5TimeSeries)), "meta": Schema.optionalKey(Schema.Struct({ "unit": Schema.optionalKey(Schema.String) })), "predictedSeries": Schema.optionalKey(Schema.Array(Querybuildertypesv5TimeSeries)), "series": Schema.optionalKey(Schema.Union([Schema.Array(Querybuildertypesv5TimeSeries), Schema.Null], { mode: "oneOf" })), "upperBoundSeries": Schema.optionalKey(Schema.Array(Querybuildertypesv5TimeSeries)) })
export type RulestatehistorytypesGettableRuleStateHistoryStats = { readonly "currentAvgResolutionTime": number, readonly "currentAvgResolutionTimeSeries": Querybuildertypesv5TimeSeries, readonly "currentTriggersSeries": Querybuildertypesv5TimeSeries, readonly "pastAvgResolutionTime": number, readonly "pastAvgResolutionTimeSeries": Querybuildertypesv5TimeSeries, readonly "pastTriggersSeries": Querybuildertypesv5TimeSeries, readonly "totalCurrentTriggers": number, readonly "totalPastTriggers": number }
export const RulestatehistorytypesGettableRuleStateHistoryStats = Schema.Struct({ "currentAvgResolutionTime": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "currentAvgResolutionTimeSeries": Querybuildertypesv5TimeSeries, "currentTriggersSeries": Querybuildertypesv5TimeSeries, "pastAvgResolutionTime": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "pastAvgResolutionTimeSeries": Querybuildertypesv5TimeSeries, "pastTriggersSeries": Querybuildertypesv5TimeSeries, "totalCurrentTriggers": Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)), "totalPastTriggers": Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)) })
export type CloudintegrationtypesGettableAgentCheckIn = { readonly "account_id": string, readonly "cloud_account_id": string, readonly "cloudIntegrationId": string, readonly "integration_config": CloudintegrationtypesIntegrationConfig, readonly "integrationConfig": CloudintegrationtypesProviderIntegrationConfig, readonly "providerAccountId": string, readonly "removed_at": string, readonly "removedAt": string }
export const CloudintegrationtypesGettableAgentCheckIn = Schema.Struct({ "account_id": Schema.String, "cloud_account_id": Schema.String, "cloudIntegrationId": Schema.String, "integration_config": CloudintegrationtypesIntegrationConfig, "integrationConfig": CloudintegrationtypesProviderIntegrationConfig, "providerAccountId": Schema.String, "removed_at": Schema.Union([Schema.String.annotate({ "format": "date-time" })]), "removedAt": Schema.Union([Schema.String.annotate({ "format": "date-time" })]) })
export type AuthtypesPostableRole = { readonly "description"?: string, readonly "name": string, readonly "transactionGroups"?: AuthtypesTransactionGroups }
export const AuthtypesPostableRole = Schema.Struct({ "description": Schema.optionalKey(Schema.String), "name": Schema.String, "transactionGroups": Schema.optionalKey(AuthtypesTransactionGroups) })
export type AuthtypesRole = { readonly "createdAt"?: string, readonly "description": string, readonly "id": string, readonly "name": string, readonly "orgId": string, readonly "transactionGroups": AuthtypesTransactionGroups, readonly "type": string, readonly "updatedAt"?: string }
export const AuthtypesRole = Schema.Struct({ "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "description": Schema.String, "id": Schema.String, "name": Schema.String, "orgId": Schema.String, "transactionGroups": AuthtypesTransactionGroups, "type": Schema.String, "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })) })
export type AuthtypesUpdatableRole = { readonly "description": string, readonly "transactionGroups": AuthtypesTransactionGroups }
export const AuthtypesUpdatableRole = Schema.Struct({ "description": Schema.String, "transactionGroups": AuthtypesTransactionGroups })
export type DashboardtypesQuerySpec = { readonly "name"?: string, readonly "plugin": DashboardtypesQueryPlugin }
export const DashboardtypesQuerySpec = Schema.Struct({ "name": Schema.optionalKey(Schema.String), "plugin": DashboardtypesQueryPlugin })
export type RuletypesPostableRule = { readonly "alert": string, readonly "alertType": RuletypesAlertType, readonly "annotations"?: { readonly [x: string]: string }, readonly "condition": RuletypesRuleCondition, readonly "description"?: string, readonly "disabled"?: boolean, readonly "evalWindow"?: string, readonly "evaluation"?: RuletypesEvaluationEnvelope, readonly "frequency"?: string, readonly "labels"?: { readonly [x: string]: string }, readonly "notificationSettings"?: RuletypesNotificationSettings, readonly "preferredChannels"?: ReadonlyArray<string>, readonly "ruleType": RuletypesRuleType, readonly "schemaVersion"?: string, readonly "source"?: string, readonly "version"?: string }
export const RuletypesPostableRule = Schema.Struct({ "alert": Schema.String, "alertType": RuletypesAlertType, "annotations": Schema.optionalKey(Schema.Record(Schema.String, Schema.String)), "condition": RuletypesRuleCondition, "description": Schema.optionalKey(Schema.String), "disabled": Schema.optionalKey(Schema.Boolean), "evalWindow": Schema.optionalKey(Schema.String), "evaluation": Schema.optionalKey(RuletypesEvaluationEnvelope), "frequency": Schema.optionalKey(Schema.String), "labels": Schema.optionalKey(Schema.Record(Schema.String, Schema.String)), "notificationSettings": Schema.optionalKey(RuletypesNotificationSettings), "preferredChannels": Schema.optionalKey(Schema.Array(Schema.String)), "ruleType": RuletypesRuleType, "schemaVersion": Schema.optionalKey(Schema.String), "source": Schema.optionalKey(Schema.String), "version": Schema.optionalKey(Schema.String) })
export type RuletypesRule = { readonly "alert": string, readonly "alertType": RuletypesAlertType, readonly "annotations"?: { readonly [x: string]: string }, readonly "condition": RuletypesRuleCondition, readonly "createdAt"?: string, readonly "createdBy"?: string, readonly "description"?: string, readonly "disabled"?: boolean, readonly "evalWindow"?: string, readonly "evaluation"?: RuletypesEvaluationEnvelope, readonly "frequency"?: string, readonly "id": string, readonly "labels"?: { readonly [x: string]: string }, readonly "notificationSettings"?: RuletypesNotificationSettings, readonly "preferredChannels"?: ReadonlyArray<string>, readonly "ruleType": RuletypesRuleType, readonly "schemaVersion"?: string, readonly "source"?: string, readonly "state": RuletypesAlertState, readonly "updatedAt"?: string, readonly "updatedBy"?: string, readonly "version"?: string }
export const RuletypesRule = Schema.Struct({ "alert": Schema.String, "alertType": RuletypesAlertType, "annotations": Schema.optionalKey(Schema.Record(Schema.String, Schema.String)), "condition": RuletypesRuleCondition, "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "createdBy": Schema.optionalKey(Schema.String), "description": Schema.optionalKey(Schema.String), "disabled": Schema.optionalKey(Schema.Boolean), "evalWindow": Schema.optionalKey(Schema.String), "evaluation": Schema.optionalKey(RuletypesEvaluationEnvelope), "frequency": Schema.optionalKey(Schema.String), "id": Schema.String, "labels": Schema.optionalKey(Schema.Record(Schema.String, Schema.String)), "notificationSettings": Schema.optionalKey(RuletypesNotificationSettings), "preferredChannels": Schema.optionalKey(Schema.Array(Schema.String)), "ruleType": RuletypesRuleType, "schemaVersion": Schema.optionalKey(Schema.String), "source": Schema.optionalKey(Schema.String), "state": RuletypesAlertState, "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "updatedBy": Schema.optionalKey(Schema.String), "version": Schema.optionalKey(Schema.String) })
export type Querybuildertypesv5TimeSeriesData = { readonly "aggregations"?: ReadonlyArray<Querybuildertypesv5AggregationBucket> | null, readonly "queryName"?: string }
export const Querybuildertypesv5TimeSeriesData = Schema.Struct({ "aggregations": Schema.optionalKey(Schema.Union([Schema.Array(Querybuildertypesv5AggregationBucket), Schema.Null], { mode: "oneOf" })), "queryName": Schema.optionalKey(Schema.String) })
export type AuthtypesUserRole = { readonly "createdAt": string, readonly "id": string, readonly "role": AuthtypesRole, readonly "roleId": string, readonly "updatedAt": string, readonly "userId": string }
export const AuthtypesUserRole = Schema.Struct({ "createdAt": Schema.String.annotate({ "format": "date-time" }), "id": Schema.String, "role": AuthtypesRole, "roleId": Schema.String, "updatedAt": Schema.String.annotate({ "format": "date-time" }), "userId": Schema.String })
export type AuthtypesUserWithRoles = { readonly "createdAt"?: string, readonly "displayName"?: string, readonly "email"?: string, readonly "id": string, readonly "isRoot"?: boolean, readonly "orgId"?: string, readonly "status"?: string, readonly "updatedAt"?: string, readonly "userRoles"?: ReadonlyArray<{ readonly "createdAt": string, readonly "id": string, readonly "role": AuthtypesRole, readonly "roleId": string, readonly "updatedAt": string, readonly "userId": string }> }
export const AuthtypesUserWithRoles = Schema.Struct({ "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "displayName": Schema.optionalKey(Schema.String), "email": Schema.optionalKey(Schema.String), "id": Schema.String, "isRoot": Schema.optionalKey(Schema.Boolean), "orgId": Schema.optionalKey(Schema.String), "status": Schema.optionalKey(Schema.String), "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "userRoles": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "createdAt": Schema.String.annotate({ "format": "date-time" }), "id": Schema.String, "role": AuthtypesRole, "roleId": Schema.String, "updatedAt": Schema.String.annotate({ "format": "date-time" }), "userId": Schema.String }))])) })
export type ServiceaccounttypesServiceAccountRole = { readonly "createdAt"?: string, readonly "id": string, readonly "role": AuthtypesRole, readonly "roleId": string, readonly "serviceAccountId": string, readonly "updatedAt"?: string }
export const ServiceaccounttypesServiceAccountRole = Schema.Struct({ "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "id": Schema.String, "role": AuthtypesRole, "roleId": Schema.String, "serviceAccountId": Schema.String, "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })) })
export type ServiceaccounttypesServiceAccountWithRoles = { readonly "createdAt"?: string, readonly "email": string, readonly "id": string, readonly "name": string, readonly "orgId": string, readonly "serviceAccountRoles": ReadonlyArray<{ readonly "createdAt"?: string, readonly "id": string, readonly "role": AuthtypesRole, readonly "roleId": string, readonly "serviceAccountId": string, readonly "updatedAt"?: string }>, readonly "status": string, readonly "updatedAt"?: string }
export const ServiceaccounttypesServiceAccountWithRoles = Schema.Struct({ "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "email": Schema.String, "id": Schema.String, "name": Schema.String, "orgId": Schema.String, "serviceAccountRoles": Schema.Union([Schema.Array(Schema.Struct({ "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "id": Schema.String, "role": AuthtypesRole, "roleId": Schema.String, "serviceAccountId": Schema.String, "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })) }))]), "status": Schema.String, "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })) })
export type DashboardtypesQuery = { readonly "kind": Querybuildertypesv5RequestType, readonly "spec": DashboardtypesQuerySpec }
export const DashboardtypesQuery = Schema.Struct({ "kind": Querybuildertypesv5RequestType, "spec": DashboardtypesQuerySpec })
// Decode through one combined shape so the untagged response union cannot strip variant fields.
export type Querybuildertypesv5QueryDataEncoded = { readonly "results"?: ReadonlyArray<Querybuildertypesv5TimeSeriesData & Querybuildertypesv5ScalarData & Querybuildertypesv5RawData> }
export type Querybuildertypesv5TaggedTimeSeriesData = Querybuildertypesv5TimeSeriesData & { readonly "_tag": "time_series" }
export type Querybuildertypesv5TaggedScalarData = Querybuildertypesv5ScalarData & { readonly "_tag": "scalar" }
export type Querybuildertypesv5TaggedRawData = Querybuildertypesv5RawData & { readonly "_tag": "raw" }
export type Querybuildertypesv5TaggedQueryDataResult = Querybuildertypesv5TaggedTimeSeriesData | Querybuildertypesv5TaggedScalarData | Querybuildertypesv5TaggedRawData
export type Querybuildertypesv5QueryData = { readonly "results"?: ReadonlyArray<Querybuildertypesv5TaggedQueryDataResult> }
export const Querybuildertypesv5QueryDataEncoded = Schema.Struct({ "results": Schema.optionalKey(Schema.Array(Schema.Struct({ ...Querybuildertypesv5TimeSeriesData.fields, ...Querybuildertypesv5ScalarData.fields, ...Querybuildertypesv5RawData.fields }))) })
export const Querybuildertypesv5TaggedTimeSeriesData = Querybuildertypesv5TimeSeriesData.pipe(Schema.fieldsAssign({ "_tag": Schema.Literal("time_series") }))
export const Querybuildertypesv5TaggedScalarData = Querybuildertypesv5ScalarData.pipe(Schema.fieldsAssign({ "_tag": Schema.Literal("scalar") }))
export const Querybuildertypesv5TaggedRawData = Querybuildertypesv5RawData.pipe(Schema.fieldsAssign({ "_tag": Schema.Literal("raw") }))
export const Querybuildertypesv5TaggedQueryDataResult = Schema.Union([Querybuildertypesv5TaggedTimeSeriesData, Querybuildertypesv5TaggedScalarData, Querybuildertypesv5TaggedRawData])
export const Querybuildertypesv5QueryData = Querybuildertypesv5QueryDataEncoded.pipe(Schema.decodeTo(
  Schema.Struct({ "results": Schema.optionalKey(Schema.Array(Querybuildertypesv5TaggedQueryDataResult)) }),
  {
    decode: SchemaGetter.transform((data) => ({
      "results": data.results?.map((result) => {
        if ("rows" in result) return { ...result, "_tag": "raw" as const }
        if ("aggregations" in result) return { ...result, "_tag": "time_series" as const }
        return { ...result, "_tag": "scalar" as const }
      }),
    })),
    encode: SchemaGetter.transform((data) => ({
      "results": data.results?.map(({ _tag: _tag_, ...result }) => result),
    })),
  },
))
export type DashboardtypesPanelSpec = { readonly "display": DashboardtypesDisplay, readonly "links"?: ReadonlyArray<{ readonly "name"?: string, readonly "renderVariables"?: boolean, readonly "targetBlank"?: boolean, readonly "tooltip"?: string, readonly "url"?: string }>, readonly "plugin": DashboardtypesPanelPlugin, readonly "queries": ReadonlyArray<DashboardtypesQuery> }
export const DashboardtypesPanelSpec = Schema.Struct({ "display": DashboardtypesDisplay, "links": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "name": Schema.optionalKey(Schema.String), "renderVariables": Schema.optionalKey(Schema.Boolean), "targetBlank": Schema.optionalKey(Schema.Boolean), "tooltip": Schema.optionalKey(Schema.String), "url": Schema.optionalKey(Schema.String) }))])), "plugin": DashboardtypesPanelPlugin, "queries": Schema.Array(DashboardtypesQuery) })
export type Querybuildertypesv5QueryRangeResponse = { readonly "data"?: Querybuildertypesv5QueryData, readonly "meta"?: Querybuildertypesv5ExecStats, readonly "type"?: Querybuildertypesv5RequestType, readonly "warning"?: Querybuildertypesv5QueryWarnData }
export const Querybuildertypesv5QueryRangeResponse = Schema.Struct({ "data": Schema.optionalKey(Querybuildertypesv5QueryData), "meta": Schema.optionalKey(Querybuildertypesv5ExecStats), "type": Schema.optionalKey(Querybuildertypesv5RequestType), "warning": Schema.optionalKey(Querybuildertypesv5QueryWarnData) }).annotate({ "description": "Response from the v5 query range endpoint. The data.results array contains typed results depending on the requestType: TimeSeriesData for time_series, ScalarData for scalar, or RawData for raw requests." })
export type DashboardtypesPanel = { readonly "kind": DashboardtypesPanelKind, readonly "spec": DashboardtypesPanelSpec }
export const DashboardtypesPanel = Schema.Struct({ "kind": DashboardtypesPanelKind, "spec": DashboardtypesPanelSpec })
export type DashboardtypesDashboardSpec = { readonly "datasources"?: {  }, readonly "display": DashboardtypesDisplay, readonly "duration"?: string, readonly "layouts": ReadonlyArray<DashboardtypesLayout>, readonly "links"?: ReadonlyArray<{ readonly "name"?: string, readonly "renderVariables"?: boolean, readonly "targetBlank"?: boolean, readonly "tooltip"?: string, readonly "url"?: string }>, readonly "panels": { readonly [x: string]: DashboardtypesPanel }, readonly "refreshInterval"?: string, readonly "variables": ReadonlyArray<DashboardtypesVariable> }
export const DashboardtypesDashboardSpec = Schema.Struct({ "datasources": Schema.optionalKey(Schema.Union([Schema.Struct({  })])), "display": DashboardtypesDisplay, "duration": Schema.optionalKey(Schema.String), "layouts": Schema.Array(DashboardtypesLayout), "links": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "name": Schema.optionalKey(Schema.String), "renderVariables": Schema.optionalKey(Schema.Boolean), "targetBlank": Schema.optionalKey(Schema.Boolean), "tooltip": Schema.optionalKey(Schema.String), "url": Schema.optionalKey(Schema.String) }))])), "panels": Schema.Record(Schema.String, DashboardtypesPanel), "refreshInterval": Schema.optionalKey(Schema.String), "variables": Schema.Array(DashboardtypesVariable) })
export type DashboardtypesGettableDashboardV2 = { readonly "createdAt"?: string, readonly "createdBy"?: string, readonly "id": string, readonly "image"?: string, readonly "locked": boolean, readonly "name": string, readonly "orgId": string, readonly "schemaVersion": string, readonly "source": DashboardtypesSource, readonly "spec": DashboardtypesDashboardSpec, readonly "tags": ReadonlyArray<{ readonly "key": string, readonly "value": string }>, readonly "updatedAt"?: string, readonly "updatedBy"?: string }
export const DashboardtypesGettableDashboardV2 = Schema.Struct({ "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "createdBy": Schema.optionalKey(Schema.String), "id": Schema.String, "image": Schema.optionalKey(Schema.String), "locked": Schema.Boolean, "name": Schema.String, "orgId": Schema.String, "schemaVersion": Schema.String, "source": DashboardtypesSource, "spec": DashboardtypesDashboardSpec, "tags": Schema.Union([Schema.Array(Schema.Struct({ "key": Schema.String, "value": Schema.String }))]), "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "updatedBy": Schema.optionalKey(Schema.String) })
export type DashboardtypesPostableDashboardV2 = { readonly "generateName"?: boolean, readonly "image"?: string, readonly "name"?: string, readonly "schemaVersion": string, readonly "spec": DashboardtypesDashboardSpec, readonly "tags": ReadonlyArray<{ readonly "key": string, readonly "value": string }> }
export const DashboardtypesPostableDashboardV2 = Schema.Struct({ "generateName": Schema.optionalKey(Schema.Boolean), "image": Schema.optionalKey(Schema.String), "name": Schema.optionalKey(Schema.String), "schemaVersion": Schema.String, "spec": DashboardtypesDashboardSpec, "tags": Schema.Union([Schema.Array(Schema.Struct({ "key": Schema.String, "value": Schema.String }))]) })
export type DashboardtypesUpdatableDashboardV2 = { readonly "image"?: string, readonly "name": string, readonly "schemaVersion": string, readonly "spec": DashboardtypesDashboardSpec, readonly "tags": ReadonlyArray<{ readonly "key": string, readonly "value": string }> }
export const DashboardtypesUpdatableDashboardV2 = Schema.Struct({ "image": Schema.optionalKey(Schema.String), "name": Schema.String, "schemaVersion": Schema.String, "spec": DashboardtypesDashboardSpec, "tags": Schema.Union([Schema.Array(Schema.Struct({ "key": Schema.String, "value": Schema.String }))]) })
export type DashboardtypesGettablePublicDashboardDataV2 = { readonly "dashboard"?: DashboardtypesGettableDashboardV2, readonly "publicDashboard"?: DashboardtypesGettablePublicDasbhboard }
export const DashboardtypesGettablePublicDashboardDataV2 = Schema.Struct({ "dashboard": Schema.optionalKey(DashboardtypesGettableDashboardV2), "publicDashboard": Schema.optionalKey(DashboardtypesGettablePublicDasbhboard) })
// schemas
export type GetAlerts200 = { readonly "data": ReadonlyArray<AlertmanagertypesDeprecatedGettableAlert>, readonly "status": string }
export const GetAlerts200 = Schema.Struct({ "data": Schema.Array(AlertmanagertypesDeprecatedGettableAlert), "status": Schema.String })
export type GetAlerts401 = RenderErrorResponse
export const GetAlerts401 = RenderErrorResponse
export type GetAlerts403 = RenderErrorResponse
export const GetAlerts403 = RenderErrorResponse
export type GetAlerts500 = RenderErrorResponse
export const GetAlerts500 = RenderErrorResponse
export type AuthzCheckRequestJson = ReadonlyArray<AuthtypesTransaction>
export const AuthzCheckRequestJson = Schema.Array(AuthtypesTransaction)
export type AuthzCheck200 = { readonly "data": ReadonlyArray<AuthtypesGettableTransaction>, readonly "status": string }
export const AuthzCheck200 = Schema.Struct({ "data": Schema.Array(AuthtypesGettableTransaction), "status": Schema.String })
export type AuthzCheck500 = RenderErrorResponse
export const AuthzCheck500 = RenderErrorResponse
export type ListChannels200 = { readonly "data": ReadonlyArray<AlertmanagertypesChannel>, readonly "status": string }
export const ListChannels200 = Schema.Struct({ "data": Schema.Array(AlertmanagertypesChannel), "status": Schema.String })
export type ListChannels401 = RenderErrorResponse
export const ListChannels401 = RenderErrorResponse
export type ListChannels403 = RenderErrorResponse
export const ListChannels403 = RenderErrorResponse
export type ListChannels500 = RenderErrorResponse
export const ListChannels500 = RenderErrorResponse
export type CreateChannelRequestJson = AlertmanagertypesPostableChannel
export const CreateChannelRequestJson = AlertmanagertypesPostableChannel
export type CreateChannel201 = { readonly "data": AlertmanagertypesChannel, readonly "status": string }
export const CreateChannel201 = Schema.Struct({ "data": AlertmanagertypesChannel, "status": Schema.String })
export type CreateChannel400 = RenderErrorResponse
export const CreateChannel400 = RenderErrorResponse
export type CreateChannel401 = RenderErrorResponse
export const CreateChannel401 = RenderErrorResponse
export type CreateChannel403 = RenderErrorResponse
export const CreateChannel403 = RenderErrorResponse
export type CreateChannel500 = RenderErrorResponse
export const CreateChannel500 = RenderErrorResponse
export type GetChannelByID200 = { readonly "data": AlertmanagertypesChannel, readonly "status": string }
export const GetChannelByID200 = Schema.Struct({ "data": AlertmanagertypesChannel, "status": Schema.String })
export type GetChannelByID401 = RenderErrorResponse
export const GetChannelByID401 = RenderErrorResponse
export type GetChannelByID403 = RenderErrorResponse
export const GetChannelByID403 = RenderErrorResponse
export type GetChannelByID404 = RenderErrorResponse
export const GetChannelByID404 = RenderErrorResponse
export type GetChannelByID500 = RenderErrorResponse
export const GetChannelByID500 = RenderErrorResponse
export type UpdateChannelByIDRequestJson = AlertmanagertypesReceiver
export const UpdateChannelByIDRequestJson = AlertmanagertypesReceiver
export type UpdateChannelByID400 = RenderErrorResponse
export const UpdateChannelByID400 = RenderErrorResponse
export type UpdateChannelByID401 = RenderErrorResponse
export const UpdateChannelByID401 = RenderErrorResponse
export type UpdateChannelByID403 = RenderErrorResponse
export const UpdateChannelByID403 = RenderErrorResponse
export type UpdateChannelByID404 = RenderErrorResponse
export const UpdateChannelByID404 = RenderErrorResponse
export type UpdateChannelByID500 = RenderErrorResponse
export const UpdateChannelByID500 = RenderErrorResponse
export type DeleteChannelByID401 = RenderErrorResponse
export const DeleteChannelByID401 = RenderErrorResponse
export type DeleteChannelByID403 = RenderErrorResponse
export const DeleteChannelByID403 = RenderErrorResponse
export type DeleteChannelByID404 = RenderErrorResponse
export const DeleteChannelByID404 = RenderErrorResponse
export type DeleteChannelByID500 = RenderErrorResponse
export const DeleteChannelByID500 = RenderErrorResponse
export type TestChannelRequestJson = AlertmanagertypesReceiver
export const TestChannelRequestJson = AlertmanagertypesReceiver
export type TestChannel400 = RenderErrorResponse
export const TestChannel400 = RenderErrorResponse
export type TestChannel401 = RenderErrorResponse
export const TestChannel401 = RenderErrorResponse
export type TestChannel403 = RenderErrorResponse
export const TestChannel403 = RenderErrorResponse
export type TestChannel500 = RenderErrorResponse
export const TestChannel500 = RenderErrorResponse
export type AgentCheckInDeprecatedRequestJson = CloudintegrationtypesPostableAgentCheckIn
export const AgentCheckInDeprecatedRequestJson = CloudintegrationtypesPostableAgentCheckIn
export type AgentCheckInDeprecated200 = { readonly "data": CloudintegrationtypesGettableAgentCheckIn, readonly "status": string }
export const AgentCheckInDeprecated200 = Schema.Struct({ "data": CloudintegrationtypesGettableAgentCheckIn, "status": Schema.String })
export type AgentCheckInDeprecated401 = RenderErrorResponse
export const AgentCheckInDeprecated401 = RenderErrorResponse
export type AgentCheckInDeprecated403 = RenderErrorResponse
export const AgentCheckInDeprecated403 = RenderErrorResponse
export type AgentCheckInDeprecated500 = RenderErrorResponse
export const AgentCheckInDeprecated500 = RenderErrorResponse
export type ListAccounts200 = { readonly "data": CloudintegrationtypesGettableAccounts, readonly "status": string }
export const ListAccounts200 = Schema.Struct({ "data": CloudintegrationtypesGettableAccounts, "status": Schema.String })
export type ListAccounts401 = RenderErrorResponse
export const ListAccounts401 = RenderErrorResponse
export type ListAccounts403 = RenderErrorResponse
export const ListAccounts403 = RenderErrorResponse
export type ListAccounts500 = RenderErrorResponse
export const ListAccounts500 = RenderErrorResponse
export type CreateAccountRequestJson = CloudintegrationtypesPostableAccount
export const CreateAccountRequestJson = CloudintegrationtypesPostableAccount
export type CreateAccount201 = { readonly "data": CloudintegrationtypesGettableAccountWithConnectionArtifact, readonly "status": string }
export const CreateAccount201 = Schema.Struct({ "data": CloudintegrationtypesGettableAccountWithConnectionArtifact, "status": Schema.String })
export type CreateAccount401 = RenderErrorResponse
export const CreateAccount401 = RenderErrorResponse
export type CreateAccount403 = RenderErrorResponse
export const CreateAccount403 = RenderErrorResponse
export type CreateAccount500 = RenderErrorResponse
export const CreateAccount500 = RenderErrorResponse
export type GetAccount200 = { readonly "data": CloudintegrationtypesAccount, readonly "status": string }
export const GetAccount200 = Schema.Struct({ "data": CloudintegrationtypesAccount, "status": Schema.String })
export type GetAccount400 = RenderErrorResponse
export const GetAccount400 = RenderErrorResponse
export type GetAccount401 = RenderErrorResponse
export const GetAccount401 = RenderErrorResponse
export type GetAccount403 = RenderErrorResponse
export const GetAccount403 = RenderErrorResponse
export type GetAccount404 = RenderErrorResponse
export const GetAccount404 = RenderErrorResponse
export type GetAccount500 = RenderErrorResponse
export const GetAccount500 = RenderErrorResponse
export type UpdateAccountRequestJson = CloudintegrationtypesUpdatableAccount
export const UpdateAccountRequestJson = CloudintegrationtypesUpdatableAccount
export type UpdateAccount401 = RenderErrorResponse
export const UpdateAccount401 = RenderErrorResponse
export type UpdateAccount403 = RenderErrorResponse
export const UpdateAccount403 = RenderErrorResponse
export type UpdateAccount500 = RenderErrorResponse
export const UpdateAccount500 = RenderErrorResponse
export type DisconnectAccount401 = RenderErrorResponse
export const DisconnectAccount401 = RenderErrorResponse
export type DisconnectAccount403 = RenderErrorResponse
export const DisconnectAccount403 = RenderErrorResponse
export type DisconnectAccount500 = RenderErrorResponse
export const DisconnectAccount500 = RenderErrorResponse
export type ListAccountServicesMetadata200 = { readonly "data": CloudintegrationtypesGettableServicesMetadata, readonly "status": string }
export const ListAccountServicesMetadata200 = Schema.Struct({ "data": CloudintegrationtypesGettableServicesMetadata, "status": Schema.String })
export type ListAccountServicesMetadata401 = RenderErrorResponse
export const ListAccountServicesMetadata401 = RenderErrorResponse
export type ListAccountServicesMetadata403 = RenderErrorResponse
export const ListAccountServicesMetadata403 = RenderErrorResponse
export type ListAccountServicesMetadata500 = RenderErrorResponse
export const ListAccountServicesMetadata500 = RenderErrorResponse
export type GetAccountService200 = { readonly "data": CloudintegrationtypesService, readonly "status": string }
export const GetAccountService200 = Schema.Struct({ "data": CloudintegrationtypesService, "status": Schema.String })
export type GetAccountService400 = RenderErrorResponse
export const GetAccountService400 = RenderErrorResponse
export type GetAccountService401 = RenderErrorResponse
export const GetAccountService401 = RenderErrorResponse
export type GetAccountService403 = RenderErrorResponse
export const GetAccountService403 = RenderErrorResponse
export type GetAccountService404 = RenderErrorResponse
export const GetAccountService404 = RenderErrorResponse
export type GetAccountService500 = RenderErrorResponse
export const GetAccountService500 = RenderErrorResponse
export type UpdateServiceRequestJson = CloudintegrationtypesUpdatableService
export const UpdateServiceRequestJson = CloudintegrationtypesUpdatableService
export type UpdateService401 = RenderErrorResponse
export const UpdateService401 = RenderErrorResponse
export type UpdateService403 = RenderErrorResponse
export const UpdateService403 = RenderErrorResponse
export type UpdateService500 = RenderErrorResponse
export const UpdateService500 = RenderErrorResponse
export type AgentCheckInRequestJson = CloudintegrationtypesPostableAgentCheckIn
export const AgentCheckInRequestJson = CloudintegrationtypesPostableAgentCheckIn
export type AgentCheckIn200 = { readonly "data": CloudintegrationtypesGettableAgentCheckIn, readonly "status": string }
export const AgentCheckIn200 = Schema.Struct({ "data": CloudintegrationtypesGettableAgentCheckIn, "status": Schema.String })
export type AgentCheckIn401 = RenderErrorResponse
export const AgentCheckIn401 = RenderErrorResponse
export type AgentCheckIn403 = RenderErrorResponse
export const AgentCheckIn403 = RenderErrorResponse
export type AgentCheckIn500 = RenderErrorResponse
export const AgentCheckIn500 = RenderErrorResponse
export type GetConnectionCredentials200 = { readonly "data": CloudintegrationtypesCredentials, readonly "status": string }
export const GetConnectionCredentials200 = Schema.Struct({ "data": CloudintegrationtypesCredentials, "status": Schema.String })
export type GetConnectionCredentials401 = RenderErrorResponse
export const GetConnectionCredentials401 = RenderErrorResponse
export type GetConnectionCredentials403 = RenderErrorResponse
export const GetConnectionCredentials403 = RenderErrorResponse
export type GetConnectionCredentials500 = RenderErrorResponse
export const GetConnectionCredentials500 = RenderErrorResponse
export type ListServicesMetadataParams = { readonly "cloud_integration_id"?: string }
export const ListServicesMetadataParams = Schema.Struct({ "cloud_integration_id": Schema.optionalKey(Schema.String) })
export type ListServicesMetadata200 = { readonly "data": CloudintegrationtypesGettableServicesMetadata, readonly "status": string }
export const ListServicesMetadata200 = Schema.Struct({ "data": CloudintegrationtypesGettableServicesMetadata, "status": Schema.String })
export type ListServicesMetadata401 = RenderErrorResponse
export const ListServicesMetadata401 = RenderErrorResponse
export type ListServicesMetadata403 = RenderErrorResponse
export const ListServicesMetadata403 = RenderErrorResponse
export type ListServicesMetadata500 = RenderErrorResponse
export const ListServicesMetadata500 = RenderErrorResponse
export type GetServiceParams = { readonly "cloud_integration_id"?: string }
export const GetServiceParams = Schema.Struct({ "cloud_integration_id": Schema.optionalKey(Schema.String) })
export type GetService200 = { readonly "data": CloudintegrationtypesService, readonly "status": string }
export const GetService200 = Schema.Struct({ "data": CloudintegrationtypesService, "status": Schema.String })
export type GetService401 = RenderErrorResponse
export const GetService401 = RenderErrorResponse
export type GetService403 = RenderErrorResponse
export const GetService403 = RenderErrorResponse
export type GetService500 = RenderErrorResponse
export const GetService500 = RenderErrorResponse
export type CreateSessionByGoogleCallback303 = { readonly "data": AuthtypesGettableToken, readonly "status": string }
export const CreateSessionByGoogleCallback303 = Schema.Struct({ "data": AuthtypesGettableToken, "status": Schema.String })
export type CreateSessionByGoogleCallback400 = RenderErrorResponse
export const CreateSessionByGoogleCallback400 = RenderErrorResponse
export type CreateSessionByGoogleCallback404 = RenderErrorResponse
export const CreateSessionByGoogleCallback404 = RenderErrorResponse
export type CreateSessionByGoogleCallback500 = RenderErrorResponse
export const CreateSessionByGoogleCallback500 = RenderErrorResponse
export type CreateSessionByOIDCCallback303 = { readonly "data": AuthtypesGettableToken, readonly "status": string }
export const CreateSessionByOIDCCallback303 = Schema.Struct({ "data": AuthtypesGettableToken, "status": Schema.String })
export type CreateSessionByOIDCCallback400 = RenderErrorResponse
export const CreateSessionByOIDCCallback400 = RenderErrorResponse
export type CreateSessionByOIDCCallback404 = RenderErrorResponse
export const CreateSessionByOIDCCallback404 = RenderErrorResponse
export type CreateSessionByOIDCCallback451 = RenderErrorResponse
export const CreateSessionByOIDCCallback451 = RenderErrorResponse
export type CreateSessionByOIDCCallback500 = RenderErrorResponse
export const CreateSessionByOIDCCallback500 = RenderErrorResponse
export type CreateSessionBySAMLCallbackParams = { readonly "RelayState"?: string, readonly "SAMLResponse"?: string }
export const CreateSessionBySAMLCallbackParams = Schema.Struct({ "RelayState": Schema.optionalKey(Schema.String), "SAMLResponse": Schema.optionalKey(Schema.String) })
export type CreateSessionBySAMLCallbackRequestFormUrlEncoded = { readonly "RelayState"?: string, readonly "SAMLResponse"?: string }
export const CreateSessionBySAMLCallbackRequestFormUrlEncoded = Schema.Struct({ "RelayState": Schema.optionalKey(Schema.String), "SAMLResponse": Schema.optionalKey(Schema.String) })
export type CreateSessionBySAMLCallback303 = { readonly "data": AuthtypesGettableToken, readonly "status": string }
export const CreateSessionBySAMLCallback303 = Schema.Struct({ "data": AuthtypesGettableToken, "status": Schema.String })
export type CreateSessionBySAMLCallback400 = RenderErrorResponse
export const CreateSessionBySAMLCallback400 = RenderErrorResponse
export type CreateSessionBySAMLCallback404 = RenderErrorResponse
export const CreateSessionBySAMLCallback404 = RenderErrorResponse
export type CreateSessionBySAMLCallback451 = RenderErrorResponse
export const CreateSessionBySAMLCallback451 = RenderErrorResponse
export type CreateSessionBySAMLCallback500 = RenderErrorResponse
export const CreateSessionBySAMLCallback500 = RenderErrorResponse
export type GetPublicDashboard200 = { readonly "data": DashboardtypesGettablePublicDasbhboard, readonly "status": string }
export const GetPublicDashboard200 = Schema.Struct({ "data": DashboardtypesGettablePublicDasbhboard, "status": Schema.String })
export type GetPublicDashboard401 = RenderErrorResponse
export const GetPublicDashboard401 = RenderErrorResponse
export type GetPublicDashboard403 = RenderErrorResponse
export const GetPublicDashboard403 = RenderErrorResponse
export type GetPublicDashboard500 = RenderErrorResponse
export const GetPublicDashboard500 = RenderErrorResponse
export type UpdatePublicDashboardRequestJson = DashboardtypesUpdatablePublicDashboard
export const UpdatePublicDashboardRequestJson = DashboardtypesUpdatablePublicDashboard
export type UpdatePublicDashboard401 = RenderErrorResponse
export const UpdatePublicDashboard401 = RenderErrorResponse
export type UpdatePublicDashboard403 = RenderErrorResponse
export const UpdatePublicDashboard403 = RenderErrorResponse
export type UpdatePublicDashboard500 = RenderErrorResponse
export const UpdatePublicDashboard500 = RenderErrorResponse
export type CreatePublicDashboardRequestJson = DashboardtypesPostablePublicDashboard
export const CreatePublicDashboardRequestJson = DashboardtypesPostablePublicDashboard
export type CreatePublicDashboard201 = { readonly "data": TypesIdentifiable, readonly "status": string }
export const CreatePublicDashboard201 = Schema.Struct({ "data": TypesIdentifiable, "status": Schema.String })
export type CreatePublicDashboard401 = RenderErrorResponse
export const CreatePublicDashboard401 = RenderErrorResponse
export type CreatePublicDashboard403 = RenderErrorResponse
export const CreatePublicDashboard403 = RenderErrorResponse
export type CreatePublicDashboard500 = RenderErrorResponse
export const CreatePublicDashboard500 = RenderErrorResponse
export type DeletePublicDashboard401 = RenderErrorResponse
export const DeletePublicDashboard401 = RenderErrorResponse
export type DeletePublicDashboard403 = RenderErrorResponse
export const DeletePublicDashboard403 = RenderErrorResponse
export type DeletePublicDashboard500 = RenderErrorResponse
export const DeletePublicDashboard500 = RenderErrorResponse
export type ListAuthDomains200 = { readonly "data": ReadonlyArray<AuthtypesGettableAuthDomain>, readonly "status": string }
export const ListAuthDomains200 = Schema.Struct({ "data": Schema.Array(AuthtypesGettableAuthDomain), "status": Schema.String })
export type ListAuthDomains401 = RenderErrorResponse
export const ListAuthDomains401 = RenderErrorResponse
export type ListAuthDomains403 = RenderErrorResponse
export const ListAuthDomains403 = RenderErrorResponse
export type ListAuthDomains500 = RenderErrorResponse
export const ListAuthDomains500 = RenderErrorResponse
export type CreateAuthDomainRequestJson = AuthtypesPostableAuthDomain
export const CreateAuthDomainRequestJson = AuthtypesPostableAuthDomain
export type CreateAuthDomain201 = { readonly "data": TypesIdentifiable, readonly "status": string }
export const CreateAuthDomain201 = Schema.Struct({ "data": TypesIdentifiable, "status": Schema.String })
export type CreateAuthDomain400 = RenderErrorResponse
export const CreateAuthDomain400 = RenderErrorResponse
export type CreateAuthDomain401 = RenderErrorResponse
export const CreateAuthDomain401 = RenderErrorResponse
export type CreateAuthDomain403 = RenderErrorResponse
export const CreateAuthDomain403 = RenderErrorResponse
export type CreateAuthDomain409 = RenderErrorResponse
export const CreateAuthDomain409 = RenderErrorResponse
export type CreateAuthDomain500 = RenderErrorResponse
export const CreateAuthDomain500 = RenderErrorResponse
export type GetAuthDomain200 = { readonly "data": AuthtypesGettableAuthDomain, readonly "status": string }
export const GetAuthDomain200 = Schema.Struct({ "data": AuthtypesGettableAuthDomain, "status": Schema.String })
export type GetAuthDomain401 = RenderErrorResponse
export const GetAuthDomain401 = RenderErrorResponse
export type GetAuthDomain403 = RenderErrorResponse
export const GetAuthDomain403 = RenderErrorResponse
export type GetAuthDomain404 = RenderErrorResponse
export const GetAuthDomain404 = RenderErrorResponse
export type GetAuthDomain500 = RenderErrorResponse
export const GetAuthDomain500 = RenderErrorResponse
export type UpdateAuthDomainRequestJson = AuthtypesUpdatableAuthDomain
export const UpdateAuthDomainRequestJson = AuthtypesUpdatableAuthDomain
export type UpdateAuthDomain400 = RenderErrorResponse
export const UpdateAuthDomain400 = RenderErrorResponse
export type UpdateAuthDomain401 = RenderErrorResponse
export const UpdateAuthDomain401 = RenderErrorResponse
export type UpdateAuthDomain403 = RenderErrorResponse
export const UpdateAuthDomain403 = RenderErrorResponse
export type UpdateAuthDomain409 = RenderErrorResponse
export const UpdateAuthDomain409 = RenderErrorResponse
export type UpdateAuthDomain500 = RenderErrorResponse
export const UpdateAuthDomain500 = RenderErrorResponse
export type DeleteAuthDomain400 = RenderErrorResponse
export const DeleteAuthDomain400 = RenderErrorResponse
export type DeleteAuthDomain401 = RenderErrorResponse
export const DeleteAuthDomain401 = RenderErrorResponse
export type DeleteAuthDomain403 = RenderErrorResponse
export const DeleteAuthDomain403 = RenderErrorResponse
export type DeleteAuthDomain500 = RenderErrorResponse
export const DeleteAuthDomain500 = RenderErrorResponse
export type ListDowntimeSchedulesParams = { readonly "active"?: boolean | null, readonly "recurring"?: boolean | null }
export const ListDowntimeSchedulesParams = Schema.Struct({ "active": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "recurring": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) })
export type ListDowntimeSchedules200 = { readonly "data": ReadonlyArray<AlertmanagertypesPlannedMaintenance>, readonly "status": string }
export const ListDowntimeSchedules200 = Schema.Struct({ "data": Schema.Array(AlertmanagertypesPlannedMaintenance), "status": Schema.String })
export type ListDowntimeSchedules401 = RenderErrorResponse
export const ListDowntimeSchedules401 = RenderErrorResponse
export type ListDowntimeSchedules403 = RenderErrorResponse
export const ListDowntimeSchedules403 = RenderErrorResponse
export type ListDowntimeSchedules500 = RenderErrorResponse
export const ListDowntimeSchedules500 = RenderErrorResponse
export type CreateDowntimeScheduleRequestJson = AlertmanagertypesPostablePlannedMaintenance
export const CreateDowntimeScheduleRequestJson = AlertmanagertypesPostablePlannedMaintenance
export type CreateDowntimeSchedule201 = { readonly "data": AlertmanagertypesPlannedMaintenance, readonly "status": string }
export const CreateDowntimeSchedule201 = Schema.Struct({ "data": AlertmanagertypesPlannedMaintenance, "status": Schema.String })
export type CreateDowntimeSchedule400 = RenderErrorResponse
export const CreateDowntimeSchedule400 = RenderErrorResponse
export type CreateDowntimeSchedule401 = RenderErrorResponse
export const CreateDowntimeSchedule401 = RenderErrorResponse
export type CreateDowntimeSchedule403 = RenderErrorResponse
export const CreateDowntimeSchedule403 = RenderErrorResponse
export type CreateDowntimeSchedule500 = RenderErrorResponse
export const CreateDowntimeSchedule500 = RenderErrorResponse
export type GetDowntimeScheduleByID200 = { readonly "data": AlertmanagertypesPlannedMaintenance, readonly "status": string }
export const GetDowntimeScheduleByID200 = Schema.Struct({ "data": AlertmanagertypesPlannedMaintenance, "status": Schema.String })
export type GetDowntimeScheduleByID401 = RenderErrorResponse
export const GetDowntimeScheduleByID401 = RenderErrorResponse
export type GetDowntimeScheduleByID403 = RenderErrorResponse
export const GetDowntimeScheduleByID403 = RenderErrorResponse
export type GetDowntimeScheduleByID404 = RenderErrorResponse
export const GetDowntimeScheduleByID404 = RenderErrorResponse
export type GetDowntimeScheduleByID500 = RenderErrorResponse
export const GetDowntimeScheduleByID500 = RenderErrorResponse
export type UpdateDowntimeScheduleByIDRequestJson = AlertmanagertypesPostablePlannedMaintenance
export const UpdateDowntimeScheduleByIDRequestJson = AlertmanagertypesPostablePlannedMaintenance
export type UpdateDowntimeScheduleByID400 = RenderErrorResponse
export const UpdateDowntimeScheduleByID400 = RenderErrorResponse
export type UpdateDowntimeScheduleByID401 = RenderErrorResponse
export const UpdateDowntimeScheduleByID401 = RenderErrorResponse
export type UpdateDowntimeScheduleByID403 = RenderErrorResponse
export const UpdateDowntimeScheduleByID403 = RenderErrorResponse
export type UpdateDowntimeScheduleByID404 = RenderErrorResponse
export const UpdateDowntimeScheduleByID404 = RenderErrorResponse
export type UpdateDowntimeScheduleByID500 = RenderErrorResponse
export const UpdateDowntimeScheduleByID500 = RenderErrorResponse
export type DeleteDowntimeScheduleByID401 = RenderErrorResponse
export const DeleteDowntimeScheduleByID401 = RenderErrorResponse
export type DeleteDowntimeScheduleByID403 = RenderErrorResponse
export const DeleteDowntimeScheduleByID403 = RenderErrorResponse
export type DeleteDowntimeScheduleByID404 = RenderErrorResponse
export const DeleteDowntimeScheduleByID404 = RenderErrorResponse
export type DeleteDowntimeScheduleByID500 = RenderErrorResponse
export const DeleteDowntimeScheduleByID500 = RenderErrorResponse
export type HandleExportRawDataPOSTParams = { readonly "format"?: "csv" | "jsonl" }
export const HandleExportRawDataPOSTParams = Schema.Struct({ "format": Schema.optionalKey(Schema.Literals(["csv", "jsonl"]).annotate({ "description": "The output format for the export.", "default": "csv" })) })
export type HandleExportRawDataPOSTRequestJson = Querybuildertypesv5QueryRangeRequest
export const HandleExportRawDataPOSTRequestJson = Querybuildertypesv5QueryRangeRequest
export type HandleExportRawDataPOST400 = RenderErrorResponse
export const HandleExportRawDataPOST400 = RenderErrorResponse
export type HandleExportRawDataPOST401 = RenderErrorResponse
export const HandleExportRawDataPOST401 = RenderErrorResponse
export type HandleExportRawDataPOST403 = RenderErrorResponse
export const HandleExportRawDataPOST403 = RenderErrorResponse
export type HandleExportRawDataPOST500 = RenderErrorResponse
export const HandleExportRawDataPOST500 = RenderErrorResponse
export type GetFieldsKeysParams = { readonly "signal"?: TelemetrytypesSignal, readonly "source"?: TelemetrytypesSource, readonly "limit"?: number, readonly "startUnixMilli"?: number, readonly "endUnixMilli"?: number, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "metricName"?: string, readonly "metricNamespace"?: string, readonly "searchText"?: string }
export const GetFieldsKeysParams = Schema.Struct({ "signal": Schema.optionalKey(TelemetrytypesSignal), "source": Schema.optionalKey(TelemetrytypesSource), "limit": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "startUnixMilli": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "endUnixMilli": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "metricName": Schema.optionalKey(Schema.String), "metricNamespace": Schema.optionalKey(Schema.String), "searchText": Schema.optionalKey(Schema.String) })
export type GetFieldsKeys200 = { readonly "data": TelemetrytypesGettableFieldKeys, readonly "status": string }
export const GetFieldsKeys200 = Schema.Struct({ "data": TelemetrytypesGettableFieldKeys, "status": Schema.String })
export type GetFieldsKeys401 = RenderErrorResponse
export const GetFieldsKeys401 = RenderErrorResponse
export type GetFieldsKeys403 = RenderErrorResponse
export const GetFieldsKeys403 = RenderErrorResponse
export type GetFieldsKeys500 = RenderErrorResponse
export const GetFieldsKeys500 = RenderErrorResponse
export type GetFieldsValuesParams = { readonly "signal"?: TelemetrytypesSignal, readonly "source"?: TelemetrytypesSource, readonly "limit"?: number, readonly "startUnixMilli"?: number, readonly "endUnixMilli"?: number, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "metricName"?: string, readonly "metricNamespace"?: string, readonly "searchText"?: string, readonly "name"?: string, readonly "existingQuery"?: string }
export const GetFieldsValuesParams = Schema.Struct({ "signal": Schema.optionalKey(TelemetrytypesSignal), "source": Schema.optionalKey(TelemetrytypesSource), "limit": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "startUnixMilli": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "endUnixMilli": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "metricName": Schema.optionalKey(Schema.String), "metricNamespace": Schema.optionalKey(Schema.String), "searchText": Schema.optionalKey(Schema.String), "name": Schema.optionalKey(Schema.String), "existingQuery": Schema.optionalKey(Schema.String) })
export type GetFieldsValues200 = { readonly "data": TelemetrytypesGettableFieldValues, readonly "status": string }
export const GetFieldsValues200 = Schema.Struct({ "data": TelemetrytypesGettableFieldValues, "status": Schema.String })
export type GetFieldsValues401 = RenderErrorResponse
export const GetFieldsValues401 = RenderErrorResponse
export type GetFieldsValues403 = RenderErrorResponse
export const GetFieldsValues403 = RenderErrorResponse
export type GetFieldsValues500 = RenderErrorResponse
export const GetFieldsValues500 = RenderErrorResponse
export type GetResetPasswordTokenDeprecated200 = { readonly "data": TypesResetPasswordToken, readonly "status": string }
export const GetResetPasswordTokenDeprecated200 = Schema.Struct({ "data": TypesResetPasswordToken, "status": Schema.String })
export type GetResetPasswordTokenDeprecated400 = RenderErrorResponse
export const GetResetPasswordTokenDeprecated400 = RenderErrorResponse
export type GetResetPasswordTokenDeprecated401 = RenderErrorResponse
export const GetResetPasswordTokenDeprecated401 = RenderErrorResponse
export type GetResetPasswordTokenDeprecated403 = RenderErrorResponse
export const GetResetPasswordTokenDeprecated403 = RenderErrorResponse
export type GetResetPasswordTokenDeprecated404 = RenderErrorResponse
export const GetResetPasswordTokenDeprecated404 = RenderErrorResponse
export type GetResetPasswordTokenDeprecated500 = RenderErrorResponse
export const GetResetPasswordTokenDeprecated500 = RenderErrorResponse
export type GetGlobalConfig200 = { readonly "data": GlobaltypesConfig, readonly "status": string }
export const GetGlobalConfig200 = Schema.Struct({ "data": GlobaltypesConfig, "status": Schema.String })
export type GetGlobalConfig500 = RenderErrorResponse
export const GetGlobalConfig500 = RenderErrorResponse
export type CreateInviteRequestJson = TypesPostableInvite
export const CreateInviteRequestJson = TypesPostableInvite
export type CreateInvite201 = { readonly "data": TypesInvite, readonly "status": string }
export const CreateInvite201 = Schema.Struct({ "data": TypesInvite, "status": Schema.String })
export type CreateInvite400 = RenderErrorResponse
export const CreateInvite400 = RenderErrorResponse
export type CreateInvite401 = RenderErrorResponse
export const CreateInvite401 = RenderErrorResponse
export type CreateInvite403 = RenderErrorResponse
export const CreateInvite403 = RenderErrorResponse
export type CreateInvite409 = RenderErrorResponse
export const CreateInvite409 = RenderErrorResponse
export type CreateInvite500 = RenderErrorResponse
export const CreateInvite500 = RenderErrorResponse
export type CreateBulkInviteRequestJson = TypesPostableBulkInviteRequest
export const CreateBulkInviteRequestJson = TypesPostableBulkInviteRequest
export type CreateBulkInvite400 = RenderErrorResponse
export const CreateBulkInvite400 = RenderErrorResponse
export type CreateBulkInvite401 = RenderErrorResponse
export const CreateBulkInvite401 = RenderErrorResponse
export type CreateBulkInvite403 = RenderErrorResponse
export const CreateBulkInvite403 = RenderErrorResponse
export type CreateBulkInvite409 = RenderErrorResponse
export const CreateBulkInvite409 = RenderErrorResponse
export type CreateBulkInvite500 = RenderErrorResponse
export const CreateBulkInvite500 = RenderErrorResponse
export type ListLLMPricingRulesParams = { readonly "offset"?: number, readonly "limit"?: number, readonly "q"?: string, readonly "isOverride"?: boolean | null }
export const ListLLMPricingRulesParams = Schema.Struct({ "offset": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "limit": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "q": Schema.optionalKey(Schema.String), "isOverride": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) })
export type ListLLMPricingRules200 = { readonly "data": LlmpricingruletypesGettablePricingRules, readonly "status": string }
export const ListLLMPricingRules200 = Schema.Struct({ "data": LlmpricingruletypesGettablePricingRules, "status": Schema.String })
export type ListLLMPricingRules400 = RenderErrorResponse
export const ListLLMPricingRules400 = RenderErrorResponse
export type ListLLMPricingRules401 = RenderErrorResponse
export const ListLLMPricingRules401 = RenderErrorResponse
export type ListLLMPricingRules403 = RenderErrorResponse
export const ListLLMPricingRules403 = RenderErrorResponse
export type ListLLMPricingRules500 = RenderErrorResponse
export const ListLLMPricingRules500 = RenderErrorResponse
export type CreateOrUpdateLLMPricingRulesRequestJson = LlmpricingruletypesUpdatableLLMPricingRules
export const CreateOrUpdateLLMPricingRulesRequestJson = LlmpricingruletypesUpdatableLLMPricingRules
export type CreateOrUpdateLLMPricingRules400 = RenderErrorResponse
export const CreateOrUpdateLLMPricingRules400 = RenderErrorResponse
export type CreateOrUpdateLLMPricingRules401 = RenderErrorResponse
export const CreateOrUpdateLLMPricingRules401 = RenderErrorResponse
export type CreateOrUpdateLLMPricingRules403 = RenderErrorResponse
export const CreateOrUpdateLLMPricingRules403 = RenderErrorResponse
export type CreateOrUpdateLLMPricingRules500 = RenderErrorResponse
export const CreateOrUpdateLLMPricingRules500 = RenderErrorResponse
export type GetLLMPricingRule200 = { readonly "data": LlmpricingruletypesLLMPricingRule, readonly "status": string }
export const GetLLMPricingRule200 = Schema.Struct({ "data": LlmpricingruletypesLLMPricingRule, "status": Schema.String })
export type GetLLMPricingRule401 = RenderErrorResponse
export const GetLLMPricingRule401 = RenderErrorResponse
export type GetLLMPricingRule403 = RenderErrorResponse
export const GetLLMPricingRule403 = RenderErrorResponse
export type GetLLMPricingRule404 = RenderErrorResponse
export const GetLLMPricingRule404 = RenderErrorResponse
export type GetLLMPricingRule500 = RenderErrorResponse
export const GetLLMPricingRule500 = RenderErrorResponse
export type DeleteLLMPricingRule401 = RenderErrorResponse
export const DeleteLLMPricingRule401 = RenderErrorResponse
export type DeleteLLMPricingRule403 = RenderErrorResponse
export const DeleteLLMPricingRule403 = RenderErrorResponse
export type DeleteLLMPricingRule404 = RenderErrorResponse
export const DeleteLLMPricingRule404 = RenderErrorResponse
export type DeleteLLMPricingRule500 = RenderErrorResponse
export const DeleteLLMPricingRule500 = RenderErrorResponse
export type ListUnmappedLLMModels200 = { readonly "data": LlmpricingruletypesGettableUnmappedModels, readonly "status": string }
export const ListUnmappedLLMModels200 = Schema.Struct({ "data": LlmpricingruletypesGettableUnmappedModels, "status": Schema.String })
export type ListUnmappedLLMModels400 = RenderErrorResponse
export const ListUnmappedLLMModels400 = RenderErrorResponse
export type ListUnmappedLLMModels401 = RenderErrorResponse
export const ListUnmappedLLMModels401 = RenderErrorResponse
export type ListUnmappedLLMModels403 = RenderErrorResponse
export const ListUnmappedLLMModels403 = RenderErrorResponse
export type ListUnmappedLLMModels500 = RenderErrorResponse
export const ListUnmappedLLMModels500 = RenderErrorResponse
export type ListPromotedAndIndexedPaths200 = { readonly "data": ReadonlyArray<{ readonly "indexes"?: ReadonlyArray<PromotetypesWrappedIndex>, readonly "path"?: string, readonly "promote"?: boolean }>, readonly "status": string }
export const ListPromotedAndIndexedPaths200 = Schema.Struct({ "data": Schema.Union([Schema.Array(Schema.Struct({ "indexes": Schema.optionalKey(Schema.Array(PromotetypesWrappedIndex)), "path": Schema.optionalKey(Schema.String), "promote": Schema.optionalKey(Schema.Boolean) }))]), "status": Schema.String })
export type ListPromotedAndIndexedPaths400 = RenderErrorResponse
export const ListPromotedAndIndexedPaths400 = RenderErrorResponse
export type ListPromotedAndIndexedPaths401 = RenderErrorResponse
export const ListPromotedAndIndexedPaths401 = RenderErrorResponse
export type ListPromotedAndIndexedPaths403 = RenderErrorResponse
export const ListPromotedAndIndexedPaths403 = RenderErrorResponse
export type ListPromotedAndIndexedPaths500 = RenderErrorResponse
export const ListPromotedAndIndexedPaths500 = RenderErrorResponse
export type HandlePromoteAndIndexPathsRequestJson = ReadonlyArray<{ readonly "indexes"?: ReadonlyArray<PromotetypesWrappedIndex>, readonly "path"?: string, readonly "promote"?: boolean }>
export const HandlePromoteAndIndexPathsRequestJson = Schema.Union([Schema.Array(Schema.Struct({ "indexes": Schema.optionalKey(Schema.Array(PromotetypesWrappedIndex)), "path": Schema.optionalKey(Schema.String), "promote": Schema.optionalKey(Schema.Boolean) }))])
export type HandlePromoteAndIndexPaths400 = RenderErrorResponse
export const HandlePromoteAndIndexPaths400 = RenderErrorResponse
export type HandlePromoteAndIndexPaths401 = RenderErrorResponse
export const HandlePromoteAndIndexPaths401 = RenderErrorResponse
export type HandlePromoteAndIndexPaths403 = RenderErrorResponse
export const HandlePromoteAndIndexPaths403 = RenderErrorResponse
export type HandlePromoteAndIndexPaths500 = RenderErrorResponse
export const HandlePromoteAndIndexPaths500 = RenderErrorResponse
export type ListOrgPreferences200 = { readonly "data": ReadonlyArray<PreferencetypesPreference>, readonly "status": string }
export const ListOrgPreferences200 = Schema.Struct({ "data": Schema.Array(PreferencetypesPreference), "status": Schema.String })
export type ListOrgPreferences401 = RenderErrorResponse
export const ListOrgPreferences401 = RenderErrorResponse
export type ListOrgPreferences403 = RenderErrorResponse
export const ListOrgPreferences403 = RenderErrorResponse
export type ListOrgPreferences500 = RenderErrorResponse
export const ListOrgPreferences500 = RenderErrorResponse
export type GetOrgPreference200 = { readonly "data": PreferencetypesPreference, readonly "status": string }
export const GetOrgPreference200 = Schema.Struct({ "data": PreferencetypesPreference, "status": Schema.String })
export type GetOrgPreference400 = RenderErrorResponse
export const GetOrgPreference400 = RenderErrorResponse
export type GetOrgPreference401 = RenderErrorResponse
export const GetOrgPreference401 = RenderErrorResponse
export type GetOrgPreference403 = RenderErrorResponse
export const GetOrgPreference403 = RenderErrorResponse
export type GetOrgPreference404 = RenderErrorResponse
export const GetOrgPreference404 = RenderErrorResponse
export type GetOrgPreference500 = RenderErrorResponse
export const GetOrgPreference500 = RenderErrorResponse
export type UpdateOrgPreferenceRequestJson = PreferencetypesUpdatablePreference
export const UpdateOrgPreferenceRequestJson = PreferencetypesUpdatablePreference
export type UpdateOrgPreference400 = RenderErrorResponse
export const UpdateOrgPreference400 = RenderErrorResponse
export type UpdateOrgPreference401 = RenderErrorResponse
export const UpdateOrgPreference401 = RenderErrorResponse
export type UpdateOrgPreference403 = RenderErrorResponse
export const UpdateOrgPreference403 = RenderErrorResponse
export type UpdateOrgPreference404 = RenderErrorResponse
export const UpdateOrgPreference404 = RenderErrorResponse
export type UpdateOrgPreference500 = RenderErrorResponse
export const UpdateOrgPreference500 = RenderErrorResponse
export type GetPublicDashboardData200 = { readonly "data": DashboardtypesGettablePublicDashboardData, readonly "status": string }
export const GetPublicDashboardData200 = Schema.Struct({ "data": DashboardtypesGettablePublicDashboardData, "status": Schema.String })
export type GetPublicDashboardData401 = RenderErrorResponse
export const GetPublicDashboardData401 = RenderErrorResponse
export type GetPublicDashboardData403 = RenderErrorResponse
export const GetPublicDashboardData403 = RenderErrorResponse
export type GetPublicDashboardData500 = RenderErrorResponse
export const GetPublicDashboardData500 = RenderErrorResponse
export type GetPublicDashboardWidgetQueryRange200 = { readonly "data": Querybuildertypesv5QueryRangeResponse, readonly "status": string }
export const GetPublicDashboardWidgetQueryRange200 = Schema.Struct({ "data": Querybuildertypesv5QueryRangeResponse, "status": Schema.String })
export type GetPublicDashboardWidgetQueryRange401 = RenderErrorResponse
export const GetPublicDashboardWidgetQueryRange401 = RenderErrorResponse
export type GetPublicDashboardWidgetQueryRange403 = RenderErrorResponse
export const GetPublicDashboardWidgetQueryRange403 = RenderErrorResponse
export type GetPublicDashboardWidgetQueryRange500 = RenderErrorResponse
export const GetPublicDashboardWidgetQueryRange500 = RenderErrorResponse
export type ResetPasswordRequestJson = TypesPostableResetPassword
export const ResetPasswordRequestJson = TypesPostableResetPassword
export type ResetPassword400 = RenderErrorResponse
export const ResetPassword400 = RenderErrorResponse
export type ResetPassword409 = RenderErrorResponse
export const ResetPassword409 = RenderErrorResponse
export type ResetPassword500 = RenderErrorResponse
export const ResetPassword500 = RenderErrorResponse
export type ListRoles200 = { readonly "data": ReadonlyArray<AuthtypesGettableRole>, readonly "status": string }
export const ListRoles200 = Schema.Struct({ "data": Schema.Array(AuthtypesGettableRole), "status": Schema.String })
export type ListRoles401 = RenderErrorResponse
export const ListRoles401 = RenderErrorResponse
export type ListRoles403 = RenderErrorResponse
export const ListRoles403 = RenderErrorResponse
export type ListRoles500 = RenderErrorResponse
export const ListRoles500 = RenderErrorResponse
export type CreateRoleRequestJson = AuthtypesPostableRole
export const CreateRoleRequestJson = AuthtypesPostableRole
export type CreateRole201 = { readonly "data": TypesIdentifiable, readonly "status": string }
export const CreateRole201 = Schema.Struct({ "data": TypesIdentifiable, "status": Schema.String })
export type CreateRole400 = RenderErrorResponse
export const CreateRole400 = RenderErrorResponse
export type CreateRole401 = RenderErrorResponse
export const CreateRole401 = RenderErrorResponse
export type CreateRole403 = RenderErrorResponse
export const CreateRole403 = RenderErrorResponse
export type CreateRole409 = RenderErrorResponse
export const CreateRole409 = RenderErrorResponse
export type CreateRole451 = RenderErrorResponse
export const CreateRole451 = RenderErrorResponse
export type CreateRole500 = RenderErrorResponse
export const CreateRole500 = RenderErrorResponse
export type CreateRole501 = RenderErrorResponse
export const CreateRole501 = RenderErrorResponse
export type GetRole200 = { readonly "data": AuthtypesRole, readonly "status": string }
export const GetRole200 = Schema.Struct({ "data": AuthtypesRole, "status": Schema.String })
export type GetRole401 = RenderErrorResponse
export const GetRole401 = RenderErrorResponse
export type GetRole403 = RenderErrorResponse
export const GetRole403 = RenderErrorResponse
export type GetRole500 = RenderErrorResponse
export const GetRole500 = RenderErrorResponse
export type UpdateRoleRequestJson = AuthtypesUpdatableRole
export const UpdateRoleRequestJson = AuthtypesUpdatableRole
export type UpdateRole401 = RenderErrorResponse
export const UpdateRole401 = RenderErrorResponse
export type UpdateRole403 = RenderErrorResponse
export const UpdateRole403 = RenderErrorResponse
export type UpdateRole404 = RenderErrorResponse
export const UpdateRole404 = RenderErrorResponse
export type UpdateRole451 = RenderErrorResponse
export const UpdateRole451 = RenderErrorResponse
export type UpdateRole500 = RenderErrorResponse
export const UpdateRole500 = RenderErrorResponse
export type UpdateRole501 = RenderErrorResponse
export const UpdateRole501 = RenderErrorResponse
export type DeleteRole401 = RenderErrorResponse
export const DeleteRole401 = RenderErrorResponse
export type DeleteRole403 = RenderErrorResponse
export const DeleteRole403 = RenderErrorResponse
export type DeleteRole404 = RenderErrorResponse
export const DeleteRole404 = RenderErrorResponse
export type DeleteRole451 = RenderErrorResponse
export const DeleteRole451 = RenderErrorResponse
export type DeleteRole500 = RenderErrorResponse
export const DeleteRole500 = RenderErrorResponse
export type DeleteRole501 = RenderErrorResponse
export const DeleteRole501 = RenderErrorResponse
export type GetAllRoutePolicies200 = { readonly "data": ReadonlyArray<AlertmanagertypesGettableRoutePolicy>, readonly "status": string }
export const GetAllRoutePolicies200 = Schema.Struct({ "data": Schema.Array(AlertmanagertypesGettableRoutePolicy), "status": Schema.String })
export type GetAllRoutePolicies401 = RenderErrorResponse
export const GetAllRoutePolicies401 = RenderErrorResponse
export type GetAllRoutePolicies403 = RenderErrorResponse
export const GetAllRoutePolicies403 = RenderErrorResponse
export type GetAllRoutePolicies500 = RenderErrorResponse
export const GetAllRoutePolicies500 = RenderErrorResponse
export type CreateRoutePolicyRequestJson = AlertmanagertypesPostableRoutePolicy
export const CreateRoutePolicyRequestJson = AlertmanagertypesPostableRoutePolicy
export type CreateRoutePolicy201 = { readonly "data": AlertmanagertypesGettableRoutePolicy, readonly "status": string }
export const CreateRoutePolicy201 = Schema.Struct({ "data": AlertmanagertypesGettableRoutePolicy, "status": Schema.String })
export type CreateRoutePolicy400 = RenderErrorResponse
export const CreateRoutePolicy400 = RenderErrorResponse
export type CreateRoutePolicy401 = RenderErrorResponse
export const CreateRoutePolicy401 = RenderErrorResponse
export type CreateRoutePolicy403 = RenderErrorResponse
export const CreateRoutePolicy403 = RenderErrorResponse
export type CreateRoutePolicy500 = RenderErrorResponse
export const CreateRoutePolicy500 = RenderErrorResponse
export type GetRoutePolicyByID200 = { readonly "data": AlertmanagertypesGettableRoutePolicy, readonly "status": string }
export const GetRoutePolicyByID200 = Schema.Struct({ "data": AlertmanagertypesGettableRoutePolicy, "status": Schema.String })
export type GetRoutePolicyByID401 = RenderErrorResponse
export const GetRoutePolicyByID401 = RenderErrorResponse
export type GetRoutePolicyByID403 = RenderErrorResponse
export const GetRoutePolicyByID403 = RenderErrorResponse
export type GetRoutePolicyByID404 = RenderErrorResponse
export const GetRoutePolicyByID404 = RenderErrorResponse
export type GetRoutePolicyByID500 = RenderErrorResponse
export const GetRoutePolicyByID500 = RenderErrorResponse
export type UpdateRoutePolicyRequestJson = AlertmanagertypesPostableRoutePolicy
export const UpdateRoutePolicyRequestJson = AlertmanagertypesPostableRoutePolicy
export type UpdateRoutePolicy200 = { readonly "data": AlertmanagertypesGettableRoutePolicy, readonly "status": string }
export const UpdateRoutePolicy200 = Schema.Struct({ "data": AlertmanagertypesGettableRoutePolicy, "status": Schema.String })
export type UpdateRoutePolicy400 = RenderErrorResponse
export const UpdateRoutePolicy400 = RenderErrorResponse
export type UpdateRoutePolicy401 = RenderErrorResponse
export const UpdateRoutePolicy401 = RenderErrorResponse
export type UpdateRoutePolicy403 = RenderErrorResponse
export const UpdateRoutePolicy403 = RenderErrorResponse
export type UpdateRoutePolicy404 = RenderErrorResponse
export const UpdateRoutePolicy404 = RenderErrorResponse
export type UpdateRoutePolicy500 = RenderErrorResponse
export const UpdateRoutePolicy500 = RenderErrorResponse
export type DeleteRoutePolicyByID401 = RenderErrorResponse
export const DeleteRoutePolicyByID401 = RenderErrorResponse
export type DeleteRoutePolicyByID403 = RenderErrorResponse
export const DeleteRoutePolicyByID403 = RenderErrorResponse
export type DeleteRoutePolicyByID404 = RenderErrorResponse
export const DeleteRoutePolicyByID404 = RenderErrorResponse
export type DeleteRoutePolicyByID500 = RenderErrorResponse
export const DeleteRoutePolicyByID500 = RenderErrorResponse
export type CreateServiceAccountRoleRequestJson = ServiceaccounttypesPostableServiceAccountRole
export const CreateServiceAccountRoleRequestJson = ServiceaccounttypesPostableServiceAccountRole
export type CreateServiceAccountRole201 = { readonly "data": TypesIdentifiable, readonly "status": string }
export const CreateServiceAccountRole201 = Schema.Struct({ "data": TypesIdentifiable, "status": Schema.String })
export type CreateServiceAccountRole400 = RenderErrorResponse
export const CreateServiceAccountRole400 = RenderErrorResponse
export type CreateServiceAccountRole401 = RenderErrorResponse
export const CreateServiceAccountRole401 = RenderErrorResponse
export type CreateServiceAccountRole403 = RenderErrorResponse
export const CreateServiceAccountRole403 = RenderErrorResponse
export type CreateServiceAccountRole404 = RenderErrorResponse
export const CreateServiceAccountRole404 = RenderErrorResponse
export type CreateServiceAccountRole500 = RenderErrorResponse
export const CreateServiceAccountRole500 = RenderErrorResponse
export type GetServiceAccountRole200 = { readonly "data": ServiceaccounttypesServiceAccountRole, readonly "status": string }
export const GetServiceAccountRole200 = Schema.Struct({ "data": ServiceaccounttypesServiceAccountRole, "status": Schema.String })
export type GetServiceAccountRole400 = RenderErrorResponse
export const GetServiceAccountRole400 = RenderErrorResponse
export type GetServiceAccountRole401 = RenderErrorResponse
export const GetServiceAccountRole401 = RenderErrorResponse
export type GetServiceAccountRole403 = RenderErrorResponse
export const GetServiceAccountRole403 = RenderErrorResponse
export type GetServiceAccountRole404 = RenderErrorResponse
export const GetServiceAccountRole404 = RenderErrorResponse
export type GetServiceAccountRole500 = RenderErrorResponse
export const GetServiceAccountRole500 = RenderErrorResponse
export type DeleteServiceAccountRole400 = RenderErrorResponse
export const DeleteServiceAccountRole400 = RenderErrorResponse
export type DeleteServiceAccountRole401 = RenderErrorResponse
export const DeleteServiceAccountRole401 = RenderErrorResponse
export type DeleteServiceAccountRole403 = RenderErrorResponse
export const DeleteServiceAccountRole403 = RenderErrorResponse
export type DeleteServiceAccountRole404 = RenderErrorResponse
export const DeleteServiceAccountRole404 = RenderErrorResponse
export type DeleteServiceAccountRole500 = RenderErrorResponse
export const DeleteServiceAccountRole500 = RenderErrorResponse
export type ListServiceAccounts200 = { readonly "data": ReadonlyArray<ServiceaccounttypesServiceAccount>, readonly "status": string }
export const ListServiceAccounts200 = Schema.Struct({ "data": Schema.Array(ServiceaccounttypesServiceAccount), "status": Schema.String })
export type ListServiceAccounts401 = RenderErrorResponse
export const ListServiceAccounts401 = RenderErrorResponse
export type ListServiceAccounts403 = RenderErrorResponse
export const ListServiceAccounts403 = RenderErrorResponse
export type ListServiceAccounts500 = RenderErrorResponse
export const ListServiceAccounts500 = RenderErrorResponse
export type CreateServiceAccountRequestJson = ServiceaccounttypesPostableServiceAccount
export const CreateServiceAccountRequestJson = ServiceaccounttypesPostableServiceAccount
export type CreateServiceAccount201 = { readonly "data": TypesIdentifiable, readonly "status": string }
export const CreateServiceAccount201 = Schema.Struct({ "data": TypesIdentifiable, "status": Schema.String })
export type CreateServiceAccount400 = RenderErrorResponse
export const CreateServiceAccount400 = RenderErrorResponse
export type CreateServiceAccount401 = RenderErrorResponse
export const CreateServiceAccount401 = RenderErrorResponse
export type CreateServiceAccount403 = RenderErrorResponse
export const CreateServiceAccount403 = RenderErrorResponse
export type CreateServiceAccount409 = RenderErrorResponse
export const CreateServiceAccount409 = RenderErrorResponse
export type CreateServiceAccount500 = RenderErrorResponse
export const CreateServiceAccount500 = RenderErrorResponse
export type GetServiceAccount200 = { readonly "data": ServiceaccounttypesServiceAccountWithRoles, readonly "status": string }
export const GetServiceAccount200 = Schema.Struct({ "data": ServiceaccounttypesServiceAccountWithRoles, "status": Schema.String })
export type GetServiceAccount401 = RenderErrorResponse
export const GetServiceAccount401 = RenderErrorResponse
export type GetServiceAccount403 = RenderErrorResponse
export const GetServiceAccount403 = RenderErrorResponse
export type GetServiceAccount404 = RenderErrorResponse
export const GetServiceAccount404 = RenderErrorResponse
export type GetServiceAccount500 = RenderErrorResponse
export const GetServiceAccount500 = RenderErrorResponse
export type UpdateServiceAccountRequestJson = ServiceaccounttypesPostableServiceAccount
export const UpdateServiceAccountRequestJson = ServiceaccounttypesPostableServiceAccount
export type UpdateServiceAccount400 = RenderErrorResponse
export const UpdateServiceAccount400 = RenderErrorResponse
export type UpdateServiceAccount401 = RenderErrorResponse
export const UpdateServiceAccount401 = RenderErrorResponse
export type UpdateServiceAccount403 = RenderErrorResponse
export const UpdateServiceAccount403 = RenderErrorResponse
export type UpdateServiceAccount404 = RenderErrorResponse
export const UpdateServiceAccount404 = RenderErrorResponse
export type UpdateServiceAccount500 = RenderErrorResponse
export const UpdateServiceAccount500 = RenderErrorResponse
export type DeleteServiceAccount401 = RenderErrorResponse
export const DeleteServiceAccount401 = RenderErrorResponse
export type DeleteServiceAccount403 = RenderErrorResponse
export const DeleteServiceAccount403 = RenderErrorResponse
export type DeleteServiceAccount404 = RenderErrorResponse
export const DeleteServiceAccount404 = RenderErrorResponse
export type DeleteServiceAccount500 = RenderErrorResponse
export const DeleteServiceAccount500 = RenderErrorResponse
export type ListServiceAccountKeys200 = { readonly "data": ReadonlyArray<ServiceaccounttypesGettableFactorAPIKey>, readonly "status": string }
export const ListServiceAccountKeys200 = Schema.Struct({ "data": Schema.Array(ServiceaccounttypesGettableFactorAPIKey), "status": Schema.String })
export type ListServiceAccountKeys401 = RenderErrorResponse
export const ListServiceAccountKeys401 = RenderErrorResponse
export type ListServiceAccountKeys403 = RenderErrorResponse
export const ListServiceAccountKeys403 = RenderErrorResponse
export type ListServiceAccountKeys500 = RenderErrorResponse
export const ListServiceAccountKeys500 = RenderErrorResponse
export type CreateServiceAccountKeyRequestJson = ServiceaccounttypesPostableFactorAPIKey
export const CreateServiceAccountKeyRequestJson = ServiceaccounttypesPostableFactorAPIKey
export type CreateServiceAccountKey201 = { readonly "data": ServiceaccounttypesGettableFactorAPIKeyWithKey, readonly "status": string }
export const CreateServiceAccountKey201 = Schema.Struct({ "data": ServiceaccounttypesGettableFactorAPIKeyWithKey, "status": Schema.String })
export type CreateServiceAccountKey400 = RenderErrorResponse
export const CreateServiceAccountKey400 = RenderErrorResponse
export type CreateServiceAccountKey401 = RenderErrorResponse
export const CreateServiceAccountKey401 = RenderErrorResponse
export type CreateServiceAccountKey403 = RenderErrorResponse
export const CreateServiceAccountKey403 = RenderErrorResponse
export type CreateServiceAccountKey409 = RenderErrorResponse
export const CreateServiceAccountKey409 = RenderErrorResponse
export type CreateServiceAccountKey500 = RenderErrorResponse
export const CreateServiceAccountKey500 = RenderErrorResponse
export type UpdateServiceAccountKeyRequestJson = ServiceaccounttypesUpdatableFactorAPIKey
export const UpdateServiceAccountKeyRequestJson = ServiceaccounttypesUpdatableFactorAPIKey
export type UpdateServiceAccountKey400 = RenderErrorResponse
export const UpdateServiceAccountKey400 = RenderErrorResponse
export type UpdateServiceAccountKey401 = RenderErrorResponse
export const UpdateServiceAccountKey401 = RenderErrorResponse
export type UpdateServiceAccountKey403 = RenderErrorResponse
export const UpdateServiceAccountKey403 = RenderErrorResponse
export type UpdateServiceAccountKey404 = RenderErrorResponse
export const UpdateServiceAccountKey404 = RenderErrorResponse
export type UpdateServiceAccountKey500 = RenderErrorResponse
export const UpdateServiceAccountKey500 = RenderErrorResponse
export type RevokeServiceAccountKey401 = RenderErrorResponse
export const RevokeServiceAccountKey401 = RenderErrorResponse
export type RevokeServiceAccountKey403 = RenderErrorResponse
export const RevokeServiceAccountKey403 = RenderErrorResponse
export type RevokeServiceAccountKey404 = RenderErrorResponse
export const RevokeServiceAccountKey404 = RenderErrorResponse
export type RevokeServiceAccountKey500 = RenderErrorResponse
export const RevokeServiceAccountKey500 = RenderErrorResponse
export type GetServiceAccountRoles200 = { readonly "data": ReadonlyArray<{ readonly "createdAt"?: string, readonly "description": string, readonly "id": string, readonly "name": string, readonly "orgId": string, readonly "transactionGroups": AuthtypesTransactionGroups, readonly "type": string, readonly "updatedAt"?: string }>, readonly "status": string }
export const GetServiceAccountRoles200 = Schema.Struct({ "data": Schema.Union([Schema.Array(Schema.Struct({ "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "description": Schema.String, "id": Schema.String, "name": Schema.String, "orgId": Schema.String, "transactionGroups": AuthtypesTransactionGroups, "type": Schema.String, "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })) }))]), "status": Schema.String })
export type GetServiceAccountRoles401 = RenderErrorResponse
export const GetServiceAccountRoles401 = RenderErrorResponse
export type GetServiceAccountRoles403 = RenderErrorResponse
export const GetServiceAccountRoles403 = RenderErrorResponse
export type GetServiceAccountRoles404 = RenderErrorResponse
export const GetServiceAccountRoles404 = RenderErrorResponse
export type GetServiceAccountRoles500 = RenderErrorResponse
export const GetServiceAccountRoles500 = RenderErrorResponse
export type CreateServiceAccountRoleDeprecatedRequestJson = ServiceaccounttypesDeprecatedPostableServiceAccountRole
export const CreateServiceAccountRoleDeprecatedRequestJson = ServiceaccounttypesDeprecatedPostableServiceAccountRole
export type CreateServiceAccountRoleDeprecated201 = { readonly "data": TypesIdentifiable, readonly "status": string }
export const CreateServiceAccountRoleDeprecated201 = Schema.Struct({ "data": TypesIdentifiable, "status": Schema.String })
export type CreateServiceAccountRoleDeprecated400 = RenderErrorResponse
export const CreateServiceAccountRoleDeprecated400 = RenderErrorResponse
export type CreateServiceAccountRoleDeprecated401 = RenderErrorResponse
export const CreateServiceAccountRoleDeprecated401 = RenderErrorResponse
export type CreateServiceAccountRoleDeprecated403 = RenderErrorResponse
export const CreateServiceAccountRoleDeprecated403 = RenderErrorResponse
export type CreateServiceAccountRoleDeprecated500 = RenderErrorResponse
export const CreateServiceAccountRoleDeprecated500 = RenderErrorResponse
export type DeleteServiceAccountRoleDeprecated401 = RenderErrorResponse
export const DeleteServiceAccountRoleDeprecated401 = RenderErrorResponse
export type DeleteServiceAccountRoleDeprecated403 = RenderErrorResponse
export const DeleteServiceAccountRoleDeprecated403 = RenderErrorResponse
export type DeleteServiceAccountRoleDeprecated500 = RenderErrorResponse
export const DeleteServiceAccountRoleDeprecated500 = RenderErrorResponse
export type GetMyServiceAccount200 = { readonly "data": ServiceaccounttypesServiceAccountWithRoles, readonly "status": string }
export const GetMyServiceAccount200 = Schema.Struct({ "data": ServiceaccounttypesServiceAccountWithRoles, "status": Schema.String })
export type GetMyServiceAccount404 = RenderErrorResponse
export const GetMyServiceAccount404 = RenderErrorResponse
export type GetMyServiceAccount500 = RenderErrorResponse
export const GetMyServiceAccount500 = RenderErrorResponse
export type UpdateMyServiceAccountRequestJson = ServiceaccounttypesPostableServiceAccount
export const UpdateMyServiceAccountRequestJson = ServiceaccounttypesPostableServiceAccount
export type UpdateMyServiceAccount404 = RenderErrorResponse
export const UpdateMyServiceAccount404 = RenderErrorResponse
export type UpdateMyServiceAccount500 = RenderErrorResponse
export const UpdateMyServiceAccount500 = RenderErrorResponse
export type ListSpanMapperGroupsParams = { readonly "enabled"?: boolean | null }
export const ListSpanMapperGroupsParams = Schema.Struct({ "enabled": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) })
export type ListSpanMapperGroups200 = { readonly "data": SpantypesGettableSpanMapperGroups, readonly "status": string }
export const ListSpanMapperGroups200 = Schema.Struct({ "data": SpantypesGettableSpanMapperGroups, "status": Schema.String })
export type ListSpanMapperGroups400 = RenderErrorResponse
export const ListSpanMapperGroups400 = RenderErrorResponse
export type ListSpanMapperGroups401 = RenderErrorResponse
export const ListSpanMapperGroups401 = RenderErrorResponse
export type ListSpanMapperGroups403 = RenderErrorResponse
export const ListSpanMapperGroups403 = RenderErrorResponse
export type ListSpanMapperGroups500 = RenderErrorResponse
export const ListSpanMapperGroups500 = RenderErrorResponse
export type CreateSpanMapperGroupRequestJson = SpantypesPostableSpanMapperGroup
export const CreateSpanMapperGroupRequestJson = SpantypesPostableSpanMapperGroup
export type CreateSpanMapperGroup201 = { readonly "data": SpantypesSpanMapperGroup, readonly "status": string }
export const CreateSpanMapperGroup201 = Schema.Struct({ "data": SpantypesSpanMapperGroup, "status": Schema.String })
export type CreateSpanMapperGroup400 = RenderErrorResponse
export const CreateSpanMapperGroup400 = RenderErrorResponse
export type CreateSpanMapperGroup401 = RenderErrorResponse
export const CreateSpanMapperGroup401 = RenderErrorResponse
export type CreateSpanMapperGroup403 = RenderErrorResponse
export const CreateSpanMapperGroup403 = RenderErrorResponse
export type CreateSpanMapperGroup409 = RenderErrorResponse
export const CreateSpanMapperGroup409 = RenderErrorResponse
export type CreateSpanMapperGroup500 = RenderErrorResponse
export const CreateSpanMapperGroup500 = RenderErrorResponse
export type DeleteSpanMapperGroup401 = RenderErrorResponse
export const DeleteSpanMapperGroup401 = RenderErrorResponse
export type DeleteSpanMapperGroup403 = RenderErrorResponse
export const DeleteSpanMapperGroup403 = RenderErrorResponse
export type DeleteSpanMapperGroup404 = RenderErrorResponse
export const DeleteSpanMapperGroup404 = RenderErrorResponse
export type DeleteSpanMapperGroup500 = RenderErrorResponse
export const DeleteSpanMapperGroup500 = RenderErrorResponse
export type UpdateSpanMapperGroupRequestJson = SpantypesUpdatableSpanMapperGroup
export const UpdateSpanMapperGroupRequestJson = SpantypesUpdatableSpanMapperGroup
export type UpdateSpanMapperGroup400 = RenderErrorResponse
export const UpdateSpanMapperGroup400 = RenderErrorResponse
export type UpdateSpanMapperGroup401 = RenderErrorResponse
export const UpdateSpanMapperGroup401 = RenderErrorResponse
export type UpdateSpanMapperGroup403 = RenderErrorResponse
export const UpdateSpanMapperGroup403 = RenderErrorResponse
export type UpdateSpanMapperGroup404 = RenderErrorResponse
export const UpdateSpanMapperGroup404 = RenderErrorResponse
export type UpdateSpanMapperGroup500 = RenderErrorResponse
export const UpdateSpanMapperGroup500 = RenderErrorResponse
export type ListSpanMappers200 = { readonly "data": SpantypesGettableSpanMappers, readonly "status": string }
export const ListSpanMappers200 = Schema.Struct({ "data": SpantypesGettableSpanMappers, "status": Schema.String })
export type ListSpanMappers400 = RenderErrorResponse
export const ListSpanMappers400 = RenderErrorResponse
export type ListSpanMappers401 = RenderErrorResponse
export const ListSpanMappers401 = RenderErrorResponse
export type ListSpanMappers403 = RenderErrorResponse
export const ListSpanMappers403 = RenderErrorResponse
export type ListSpanMappers404 = RenderErrorResponse
export const ListSpanMappers404 = RenderErrorResponse
export type ListSpanMappers500 = RenderErrorResponse
export const ListSpanMappers500 = RenderErrorResponse
export type CreateSpanMapperRequestJson = SpantypesPostableSpanMapper
export const CreateSpanMapperRequestJson = SpantypesPostableSpanMapper
export type CreateSpanMapper201 = { readonly "data": SpantypesSpanMapper, readonly "status": string }
export const CreateSpanMapper201 = Schema.Struct({ "data": SpantypesSpanMapper, "status": Schema.String })
export type CreateSpanMapper400 = RenderErrorResponse
export const CreateSpanMapper400 = RenderErrorResponse
export type CreateSpanMapper401 = RenderErrorResponse
export const CreateSpanMapper401 = RenderErrorResponse
export type CreateSpanMapper403 = RenderErrorResponse
export const CreateSpanMapper403 = RenderErrorResponse
export type CreateSpanMapper404 = RenderErrorResponse
export const CreateSpanMapper404 = RenderErrorResponse
export type CreateSpanMapper409 = RenderErrorResponse
export const CreateSpanMapper409 = RenderErrorResponse
export type CreateSpanMapper500 = RenderErrorResponse
export const CreateSpanMapper500 = RenderErrorResponse
export type DeleteSpanMapper401 = RenderErrorResponse
export const DeleteSpanMapper401 = RenderErrorResponse
export type DeleteSpanMapper403 = RenderErrorResponse
export const DeleteSpanMapper403 = RenderErrorResponse
export type DeleteSpanMapper404 = RenderErrorResponse
export const DeleteSpanMapper404 = RenderErrorResponse
export type DeleteSpanMapper500 = RenderErrorResponse
export const DeleteSpanMapper500 = RenderErrorResponse
export type UpdateSpanMapperRequestJson = SpantypesUpdatableSpanMapper
export const UpdateSpanMapperRequestJson = SpantypesUpdatableSpanMapper
export type UpdateSpanMapper400 = RenderErrorResponse
export const UpdateSpanMapper400 = RenderErrorResponse
export type UpdateSpanMapper401 = RenderErrorResponse
export const UpdateSpanMapper401 = RenderErrorResponse
export type UpdateSpanMapper403 = RenderErrorResponse
export const UpdateSpanMapper403 = RenderErrorResponse
export type UpdateSpanMapper404 = RenderErrorResponse
export const UpdateSpanMapper404 = RenderErrorResponse
export type UpdateSpanMapper500 = RenderErrorResponse
export const UpdateSpanMapper500 = RenderErrorResponse
export type TestSpanMappersRequestJson = SpantypesPostableSpanMapperTest
export const TestSpanMappersRequestJson = SpantypesPostableSpanMapperTest
export type TestSpanMappers200 = { readonly "data": SpantypesGettableSpanMapperTest, readonly "status": string }
export const TestSpanMappers200 = Schema.Struct({ "data": SpantypesGettableSpanMapperTest, "status": Schema.String })
export type TestSpanMappers400 = RenderErrorResponse
export const TestSpanMappers400 = RenderErrorResponse
export type TestSpanMappers401 = RenderErrorResponse
export const TestSpanMappers401 = RenderErrorResponse
export type TestSpanMappers403 = RenderErrorResponse
export const TestSpanMappers403 = RenderErrorResponse
export type TestSpanMappers404 = RenderErrorResponse
export const TestSpanMappers404 = RenderErrorResponse
export type TestSpanMappers500 = RenderErrorResponse
export const TestSpanMappers500 = RenderErrorResponse
export type GetStats200 = { readonly "data": { readonly [x: string]: Schema.Json }, readonly "status": string }
export const GetStats200 = Schema.Struct({ "data": Schema.Record(Schema.String, Schema.Json), "status": Schema.String })
export type GetStats401 = RenderErrorResponse
export const GetStats401 = RenderErrorResponse
export type GetStats403 = RenderErrorResponse
export const GetStats403 = RenderErrorResponse
export type GetStats500 = RenderErrorResponse
export const GetStats500 = RenderErrorResponse
export type TestChannelDeprecatedRequestJson = AlertmanagertypesReceiver
export const TestChannelDeprecatedRequestJson = AlertmanagertypesReceiver
export type TestChannelDeprecated400 = RenderErrorResponse
export const TestChannelDeprecated400 = RenderErrorResponse
export type TestChannelDeprecated401 = RenderErrorResponse
export const TestChannelDeprecated401 = RenderErrorResponse
export type TestChannelDeprecated403 = RenderErrorResponse
export const TestChannelDeprecated403 = RenderErrorResponse
export type TestChannelDeprecated500 = RenderErrorResponse
export const TestChannelDeprecated500 = RenderErrorResponse
export type GetTraceAggregationsRequestJson = SpantypesPostableTraceAggregations
export const GetTraceAggregationsRequestJson = SpantypesPostableTraceAggregations
export type GetTraceAggregations200 = { readonly "data": SpantypesGettableTraceAggregations, readonly "status": string }
export const GetTraceAggregations200 = Schema.Struct({ "data": SpantypesGettableTraceAggregations, "status": Schema.String })
export type GetTraceAggregations400 = RenderErrorResponse
export const GetTraceAggregations400 = RenderErrorResponse
export type GetTraceAggregations401 = RenderErrorResponse
export const GetTraceAggregations401 = RenderErrorResponse
export type GetTraceAggregations403 = RenderErrorResponse
export const GetTraceAggregations403 = RenderErrorResponse
export type GetTraceAggregations404 = RenderErrorResponse
export const GetTraceAggregations404 = RenderErrorResponse
export type GetTraceAggregations500 = RenderErrorResponse
export const GetTraceAggregations500 = RenderErrorResponse
export type ListUsersDeprecated200 = { readonly "data": ReadonlyArray<TypesDeprecatedUser>, readonly "status": string }
export const ListUsersDeprecated200 = Schema.Struct({ "data": Schema.Array(TypesDeprecatedUser), "status": Schema.String })
export type ListUsersDeprecated401 = RenderErrorResponse
export const ListUsersDeprecated401 = RenderErrorResponse
export type ListUsersDeprecated403 = RenderErrorResponse
export const ListUsersDeprecated403 = RenderErrorResponse
export type ListUsersDeprecated500 = RenderErrorResponse
export const ListUsersDeprecated500 = RenderErrorResponse
export type GetUserDeprecated200 = { readonly "data": TypesDeprecatedUser, readonly "status": string }
export const GetUserDeprecated200 = Schema.Struct({ "data": TypesDeprecatedUser, "status": Schema.String })
export type GetUserDeprecated401 = RenderErrorResponse
export const GetUserDeprecated401 = RenderErrorResponse
export type GetUserDeprecated403 = RenderErrorResponse
export const GetUserDeprecated403 = RenderErrorResponse
export type GetUserDeprecated404 = RenderErrorResponse
export const GetUserDeprecated404 = RenderErrorResponse
export type GetUserDeprecated500 = RenderErrorResponse
export const GetUserDeprecated500 = RenderErrorResponse
export type UpdateUserDeprecatedRequestJson = TypesDeprecatedUser
export const UpdateUserDeprecatedRequestJson = TypesDeprecatedUser
export type UpdateUserDeprecated200 = { readonly "data": TypesDeprecatedUser, readonly "status": string }
export const UpdateUserDeprecated200 = Schema.Struct({ "data": TypesDeprecatedUser, "status": Schema.String })
export type UpdateUserDeprecated400 = RenderErrorResponse
export const UpdateUserDeprecated400 = RenderErrorResponse
export type UpdateUserDeprecated401 = RenderErrorResponse
export const UpdateUserDeprecated401 = RenderErrorResponse
export type UpdateUserDeprecated403 = RenderErrorResponse
export const UpdateUserDeprecated403 = RenderErrorResponse
export type UpdateUserDeprecated404 = RenderErrorResponse
export const UpdateUserDeprecated404 = RenderErrorResponse
export type UpdateUserDeprecated500 = RenderErrorResponse
export const UpdateUserDeprecated500 = RenderErrorResponse
export type DeleteUserDeprecated401 = RenderErrorResponse
export const DeleteUserDeprecated401 = RenderErrorResponse
export type DeleteUserDeprecated403 = RenderErrorResponse
export const DeleteUserDeprecated403 = RenderErrorResponse
export type DeleteUserDeprecated404 = RenderErrorResponse
export const DeleteUserDeprecated404 = RenderErrorResponse
export type DeleteUserDeprecated500 = RenderErrorResponse
export const DeleteUserDeprecated500 = RenderErrorResponse
export type GetMyUserDeprecated200 = { readonly "data": TypesDeprecatedUser, readonly "status": string }
export const GetMyUserDeprecated200 = Schema.Struct({ "data": TypesDeprecatedUser, "status": Schema.String })
export type GetMyUserDeprecated401 = RenderErrorResponse
export const GetMyUserDeprecated401 = RenderErrorResponse
export type GetMyUserDeprecated403 = RenderErrorResponse
export const GetMyUserDeprecated403 = RenderErrorResponse
export type GetMyUserDeprecated500 = RenderErrorResponse
export const GetMyUserDeprecated500 = RenderErrorResponse
export type ListUserPreferences200 = { readonly "data": ReadonlyArray<PreferencetypesPreference>, readonly "status": string }
export const ListUserPreferences200 = Schema.Struct({ "data": Schema.Array(PreferencetypesPreference), "status": Schema.String })
export type ListUserPreferences401 = RenderErrorResponse
export const ListUserPreferences401 = RenderErrorResponse
export type ListUserPreferences403 = RenderErrorResponse
export const ListUserPreferences403 = RenderErrorResponse
export type ListUserPreferences500 = RenderErrorResponse
export const ListUserPreferences500 = RenderErrorResponse
export type GetUserPreference200 = { readonly "data": PreferencetypesPreference, readonly "status": string }
export const GetUserPreference200 = Schema.Struct({ "data": PreferencetypesPreference, "status": Schema.String })
export type GetUserPreference401 = RenderErrorResponse
export const GetUserPreference401 = RenderErrorResponse
export type GetUserPreference403 = RenderErrorResponse
export const GetUserPreference403 = RenderErrorResponse
export type GetUserPreference404 = RenderErrorResponse
export const GetUserPreference404 = RenderErrorResponse
export type GetUserPreference500 = RenderErrorResponse
export const GetUserPreference500 = RenderErrorResponse
export type UpdateUserPreferenceRequestJson = PreferencetypesUpdatablePreference
export const UpdateUserPreferenceRequestJson = PreferencetypesUpdatablePreference
export type UpdateUserPreference400 = RenderErrorResponse
export const UpdateUserPreference400 = RenderErrorResponse
export type UpdateUserPreference401 = RenderErrorResponse
export const UpdateUserPreference401 = RenderErrorResponse
export type UpdateUserPreference403 = RenderErrorResponse
export const UpdateUserPreference403 = RenderErrorResponse
export type UpdateUserPreference404 = RenderErrorResponse
export const UpdateUserPreference404 = RenderErrorResponse
export type UpdateUserPreference500 = RenderErrorResponse
export const UpdateUserPreference500 = RenderErrorResponse
export type ListDashboardViews200 = { readonly "data": DashboardtypesListableDashboardView, readonly "status": string }
export const ListDashboardViews200 = Schema.Struct({ "data": DashboardtypesListableDashboardView, "status": Schema.String })
export type ListDashboardViews401 = RenderErrorResponse
export const ListDashboardViews401 = RenderErrorResponse
export type ListDashboardViews403 = RenderErrorResponse
export const ListDashboardViews403 = RenderErrorResponse
export type ListDashboardViews500 = RenderErrorResponse
export const ListDashboardViews500 = RenderErrorResponse
export type CreateDashboardViewRequestJson = DashboardtypesPostableDashboardView
export const CreateDashboardViewRequestJson = DashboardtypesPostableDashboardView
export type CreateDashboardView201 = { readonly "data": DashboardtypesDashboardView, readonly "status": string }
export const CreateDashboardView201 = Schema.Struct({ "data": DashboardtypesDashboardView, "status": Schema.String })
export type CreateDashboardView400 = RenderErrorResponse
export const CreateDashboardView400 = RenderErrorResponse
export type CreateDashboardView401 = RenderErrorResponse
export const CreateDashboardView401 = RenderErrorResponse
export type CreateDashboardView403 = RenderErrorResponse
export const CreateDashboardView403 = RenderErrorResponse
export type CreateDashboardView500 = RenderErrorResponse
export const CreateDashboardView500 = RenderErrorResponse
export type UpdateDashboardViewRequestJson = DashboardtypesPostableDashboardView
export const UpdateDashboardViewRequestJson = DashboardtypesPostableDashboardView
export type UpdateDashboardView200 = { readonly "data": DashboardtypesDashboardView, readonly "status": string }
export const UpdateDashboardView200 = Schema.Struct({ "data": DashboardtypesDashboardView, "status": Schema.String })
export type UpdateDashboardView400 = RenderErrorResponse
export const UpdateDashboardView400 = RenderErrorResponse
export type UpdateDashboardView401 = RenderErrorResponse
export const UpdateDashboardView401 = RenderErrorResponse
export type UpdateDashboardView403 = RenderErrorResponse
export const UpdateDashboardView403 = RenderErrorResponse
export type UpdateDashboardView404 = RenderErrorResponse
export const UpdateDashboardView404 = RenderErrorResponse
export type UpdateDashboardView500 = RenderErrorResponse
export const UpdateDashboardView500 = RenderErrorResponse
export type DeleteDashboardView400 = RenderErrorResponse
export const DeleteDashboardView400 = RenderErrorResponse
export type DeleteDashboardView401 = RenderErrorResponse
export const DeleteDashboardView401 = RenderErrorResponse
export type DeleteDashboardView403 = RenderErrorResponse
export const DeleteDashboardView403 = RenderErrorResponse
export type DeleteDashboardView404 = RenderErrorResponse
export const DeleteDashboardView404 = RenderErrorResponse
export type DeleteDashboardView500 = RenderErrorResponse
export const DeleteDashboardView500 = RenderErrorResponse
export type ListDashboardsV2Params = { readonly "query"?: string, readonly "sort"?: DashboardtypesListSort, readonly "order"?: DashboardtypesListOrder, readonly "limit"?: number, readonly "offset"?: number }
export const ListDashboardsV2Params = Schema.Struct({ "query": Schema.optionalKey(Schema.String), "sort": Schema.optionalKey(DashboardtypesListSort), "order": Schema.optionalKey(DashboardtypesListOrder), "limit": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "offset": Schema.optionalKey(Schema.Number.check(Schema.isInt())) })
export type ListDashboardsV2200 = { readonly "data": DashboardtypesListableDashboardV2, readonly "status": string }
export const ListDashboardsV2200 = Schema.Struct({ "data": DashboardtypesListableDashboardV2, "status": Schema.String })
export type ListDashboardsV2400 = RenderErrorResponse
export const ListDashboardsV2400 = RenderErrorResponse
export type ListDashboardsV2401 = RenderErrorResponse
export const ListDashboardsV2401 = RenderErrorResponse
export type ListDashboardsV2403 = RenderErrorResponse
export const ListDashboardsV2403 = RenderErrorResponse
export type ListDashboardsV2500 = RenderErrorResponse
export const ListDashboardsV2500 = RenderErrorResponse
export type CreateDashboardV2RequestJson = DashboardtypesPostableDashboardV2
export const CreateDashboardV2RequestJson = DashboardtypesPostableDashboardV2
export type CreateDashboardV2201 = { readonly "data": DashboardtypesGettableDashboardV2, readonly "status": string }
export const CreateDashboardV2201 = Schema.Struct({ "data": DashboardtypesGettableDashboardV2, "status": Schema.String })
export type CreateDashboardV2400 = RenderErrorResponse
export const CreateDashboardV2400 = RenderErrorResponse
export type CreateDashboardV2401 = RenderErrorResponse
export const CreateDashboardV2401 = RenderErrorResponse
export type CreateDashboardV2403 = RenderErrorResponse
export const CreateDashboardV2403 = RenderErrorResponse
export type CreateDashboardV2500 = RenderErrorResponse
export const CreateDashboardV2500 = RenderErrorResponse
export type GetDashboardV2200 = { readonly "data": DashboardtypesGettableDashboardV2, readonly "status": string }
export const GetDashboardV2200 = Schema.Struct({ "data": DashboardtypesGettableDashboardV2, "status": Schema.String })
export type GetDashboardV2400 = RenderErrorResponse
export const GetDashboardV2400 = RenderErrorResponse
export type GetDashboardV2401 = RenderErrorResponse
export const GetDashboardV2401 = RenderErrorResponse
export type GetDashboardV2403 = RenderErrorResponse
export const GetDashboardV2403 = RenderErrorResponse
export type GetDashboardV2404 = RenderErrorResponse
export const GetDashboardV2404 = RenderErrorResponse
export type GetDashboardV2500 = RenderErrorResponse
export const GetDashboardV2500 = RenderErrorResponse
export type UpdateDashboardV2RequestJson = DashboardtypesUpdatableDashboardV2
export const UpdateDashboardV2RequestJson = DashboardtypesUpdatableDashboardV2
export type UpdateDashboardV2200 = { readonly "data": DashboardtypesGettableDashboardV2, readonly "status": string }
export const UpdateDashboardV2200 = Schema.Struct({ "data": DashboardtypesGettableDashboardV2, "status": Schema.String })
export type UpdateDashboardV2400 = RenderErrorResponse
export const UpdateDashboardV2400 = RenderErrorResponse
export type UpdateDashboardV2401 = RenderErrorResponse
export const UpdateDashboardV2401 = RenderErrorResponse
export type UpdateDashboardV2403 = RenderErrorResponse
export const UpdateDashboardV2403 = RenderErrorResponse
export type UpdateDashboardV2404 = RenderErrorResponse
export const UpdateDashboardV2404 = RenderErrorResponse
export type UpdateDashboardV2500 = RenderErrorResponse
export const UpdateDashboardV2500 = RenderErrorResponse
export type DeleteDashboardV2400 = RenderErrorResponse
export const DeleteDashboardV2400 = RenderErrorResponse
export type DeleteDashboardV2401 = RenderErrorResponse
export const DeleteDashboardV2401 = RenderErrorResponse
export type DeleteDashboardV2403 = RenderErrorResponse
export const DeleteDashboardV2403 = RenderErrorResponse
export type DeleteDashboardV2404 = RenderErrorResponse
export const DeleteDashboardV2404 = RenderErrorResponse
export type DeleteDashboardV2500 = RenderErrorResponse
export const DeleteDashboardV2500 = RenderErrorResponse
export type PatchDashboardV2RequestJson = DashboardtypesPatchableDashboardV2
export const PatchDashboardV2RequestJson = DashboardtypesPatchableDashboardV2
export type PatchDashboardV2200 = { readonly "data": DashboardtypesGettableDashboardV2, readonly "status": string }
export const PatchDashboardV2200 = Schema.Struct({ "data": DashboardtypesGettableDashboardV2, "status": Schema.String })
export type PatchDashboardV2400 = RenderErrorResponse
export const PatchDashboardV2400 = RenderErrorResponse
export type PatchDashboardV2401 = RenderErrorResponse
export const PatchDashboardV2401 = RenderErrorResponse
export type PatchDashboardV2403 = RenderErrorResponse
export const PatchDashboardV2403 = RenderErrorResponse
export type PatchDashboardV2404 = RenderErrorResponse
export const PatchDashboardV2404 = RenderErrorResponse
export type PatchDashboardV2500 = RenderErrorResponse
export const PatchDashboardV2500 = RenderErrorResponse
export type CloneDashboardV2201 = { readonly "data": DashboardtypesGettableDashboardV2, readonly "status": string }
export const CloneDashboardV2201 = Schema.Struct({ "data": DashboardtypesGettableDashboardV2, "status": Schema.String })
export type CloneDashboardV2400 = RenderErrorResponse
export const CloneDashboardV2400 = RenderErrorResponse
export type CloneDashboardV2401 = RenderErrorResponse
export const CloneDashboardV2401 = RenderErrorResponse
export type CloneDashboardV2403 = RenderErrorResponse
export const CloneDashboardV2403 = RenderErrorResponse
export type CloneDashboardV2404 = RenderErrorResponse
export const CloneDashboardV2404 = RenderErrorResponse
export type CloneDashboardV2500 = RenderErrorResponse
export const CloneDashboardV2500 = RenderErrorResponse
export type LockDashboardV2400 = RenderErrorResponse
export const LockDashboardV2400 = RenderErrorResponse
export type LockDashboardV2401 = RenderErrorResponse
export const LockDashboardV2401 = RenderErrorResponse
export type LockDashboardV2403 = RenderErrorResponse
export const LockDashboardV2403 = RenderErrorResponse
export type LockDashboardV2404 = RenderErrorResponse
export const LockDashboardV2404 = RenderErrorResponse
export type LockDashboardV2500 = RenderErrorResponse
export const LockDashboardV2500 = RenderErrorResponse
export type UnlockDashboardV2400 = RenderErrorResponse
export const UnlockDashboardV2400 = RenderErrorResponse
export type UnlockDashboardV2401 = RenderErrorResponse
export const UnlockDashboardV2401 = RenderErrorResponse
export type UnlockDashboardV2403 = RenderErrorResponse
export const UnlockDashboardV2403 = RenderErrorResponse
export type UnlockDashboardV2404 = RenderErrorResponse
export const UnlockDashboardV2404 = RenderErrorResponse
export type UnlockDashboardV2500 = RenderErrorResponse
export const UnlockDashboardV2500 = RenderErrorResponse
export type ForgotPasswordRequestJson = TypesPostableForgotPassword
export const ForgotPasswordRequestJson = TypesPostableForgotPassword
export type ForgotPassword400 = RenderErrorResponse
export const ForgotPassword400 = RenderErrorResponse
export type ForgotPassword422 = RenderErrorResponse
export const ForgotPassword422 = RenderErrorResponse
export type ForgotPassword500 = RenderErrorResponse
export const ForgotPassword500 = RenderErrorResponse
export type GetFeatures200 = { readonly "data": ReadonlyArray<FeaturetypesGettableFeature>, readonly "status": string }
export const GetFeatures200 = Schema.Struct({ "data": Schema.Array(FeaturetypesGettableFeature), "status": Schema.String })
export type GetFeatures401 = RenderErrorResponse
export const GetFeatures401 = RenderErrorResponse
export type GetFeatures403 = RenderErrorResponse
export const GetFeatures403 = RenderErrorResponse
export type GetFeatures500 = RenderErrorResponse
export const GetFeatures500 = RenderErrorResponse
export type GetIngestionKeysParams = { readonly "page"?: number, readonly "per_page"?: number }
export const GetIngestionKeysParams = Schema.Struct({ "page": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "per_page": Schema.optionalKey(Schema.Number.check(Schema.isInt())) })
export type GetIngestionKeys200 = { readonly "data": GatewaytypesGettableIngestionKeys, readonly "status": string }
export const GetIngestionKeys200 = Schema.Struct({ "data": GatewaytypesGettableIngestionKeys, "status": Schema.String })
export type GetIngestionKeys401 = RenderErrorResponse
export const GetIngestionKeys401 = RenderErrorResponse
export type GetIngestionKeys403 = RenderErrorResponse
export const GetIngestionKeys403 = RenderErrorResponse
export type GetIngestionKeys500 = RenderErrorResponse
export const GetIngestionKeys500 = RenderErrorResponse
export type CreateIngestionKeyRequestJson = GatewaytypesPostableIngestionKey
export const CreateIngestionKeyRequestJson = GatewaytypesPostableIngestionKey
export type CreateIngestionKey201 = { readonly "data": GatewaytypesGettableCreatedIngestionKey, readonly "status": string }
export const CreateIngestionKey201 = Schema.Struct({ "data": GatewaytypesGettableCreatedIngestionKey, "status": Schema.String })
export type CreateIngestionKey401 = RenderErrorResponse
export const CreateIngestionKey401 = RenderErrorResponse
export type CreateIngestionKey403 = RenderErrorResponse
export const CreateIngestionKey403 = RenderErrorResponse
export type CreateIngestionKey500 = RenderErrorResponse
export const CreateIngestionKey500 = RenderErrorResponse
export type DeleteIngestionKey401 = RenderErrorResponse
export const DeleteIngestionKey401 = RenderErrorResponse
export type DeleteIngestionKey403 = RenderErrorResponse
export const DeleteIngestionKey403 = RenderErrorResponse
export type DeleteIngestionKey500 = RenderErrorResponse
export const DeleteIngestionKey500 = RenderErrorResponse
export type UpdateIngestionKeyRequestJson = GatewaytypesPostableIngestionKey
export const UpdateIngestionKeyRequestJson = GatewaytypesPostableIngestionKey
export type UpdateIngestionKey401 = RenderErrorResponse
export const UpdateIngestionKey401 = RenderErrorResponse
export type UpdateIngestionKey403 = RenderErrorResponse
export const UpdateIngestionKey403 = RenderErrorResponse
export type UpdateIngestionKey500 = RenderErrorResponse
export const UpdateIngestionKey500 = RenderErrorResponse
export type CreateIngestionKeyLimitRequestJson = GatewaytypesPostableIngestionKeyLimit
export const CreateIngestionKeyLimitRequestJson = GatewaytypesPostableIngestionKeyLimit
export type CreateIngestionKeyLimit201 = { readonly "data": GatewaytypesGettableCreatedIngestionKeyLimit, readonly "status": string }
export const CreateIngestionKeyLimit201 = Schema.Struct({ "data": GatewaytypesGettableCreatedIngestionKeyLimit, "status": Schema.String })
export type CreateIngestionKeyLimit401 = RenderErrorResponse
export const CreateIngestionKeyLimit401 = RenderErrorResponse
export type CreateIngestionKeyLimit403 = RenderErrorResponse
export const CreateIngestionKeyLimit403 = RenderErrorResponse
export type CreateIngestionKeyLimit500 = RenderErrorResponse
export const CreateIngestionKeyLimit500 = RenderErrorResponse
export type DeleteIngestionKeyLimit401 = RenderErrorResponse
export const DeleteIngestionKeyLimit401 = RenderErrorResponse
export type DeleteIngestionKeyLimit403 = RenderErrorResponse
export const DeleteIngestionKeyLimit403 = RenderErrorResponse
export type DeleteIngestionKeyLimit500 = RenderErrorResponse
export const DeleteIngestionKeyLimit500 = RenderErrorResponse
export type UpdateIngestionKeyLimitRequestJson = GatewaytypesUpdatableIngestionKeyLimit
export const UpdateIngestionKeyLimitRequestJson = GatewaytypesUpdatableIngestionKeyLimit
export type UpdateIngestionKeyLimit401 = RenderErrorResponse
export const UpdateIngestionKeyLimit401 = RenderErrorResponse
export type UpdateIngestionKeyLimit403 = RenderErrorResponse
export const UpdateIngestionKeyLimit403 = RenderErrorResponse
export type UpdateIngestionKeyLimit500 = RenderErrorResponse
export const UpdateIngestionKeyLimit500 = RenderErrorResponse
export type SearchIngestionKeysParams = { readonly "name": string, readonly "page"?: number, readonly "per_page"?: number }
export const SearchIngestionKeysParams = Schema.Struct({ "name": Schema.String, "page": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "per_page": Schema.optionalKey(Schema.Number.check(Schema.isInt())) })
export type SearchIngestionKeys200 = { readonly "data": GatewaytypesGettableIngestionKeys, readonly "status": string }
export const SearchIngestionKeys200 = Schema.Struct({ "data": GatewaytypesGettableIngestionKeys, "status": Schema.String })
export type SearchIngestionKeys401 = RenderErrorResponse
export const SearchIngestionKeys401 = RenderErrorResponse
export type SearchIngestionKeys403 = RenderErrorResponse
export const SearchIngestionKeys403 = RenderErrorResponse
export type SearchIngestionKeys500 = RenderErrorResponse
export const SearchIngestionKeys500 = RenderErrorResponse
export type Healthz200 = { readonly "data": FactoryResponse, readonly "status": string }
export const Healthz200 = Schema.Struct({ "data": FactoryResponse, "status": Schema.String })
export type Healthz503 = { readonly "data": FactoryResponse, readonly "status": string }
export const Healthz503 = Schema.Struct({ "data": FactoryResponse, "status": Schema.String })
export type GetChecksParams = { readonly "type": InframonitoringtypesCheckType }
export const GetChecksParams = Schema.Struct({ "type": InframonitoringtypesCheckType })
export type GetChecks200 = { readonly "data": InframonitoringtypesChecks, readonly "status": string }
export const GetChecks200 = Schema.Struct({ "data": InframonitoringtypesChecks, "status": Schema.String })
export type GetChecks400 = RenderErrorResponse
export const GetChecks400 = RenderErrorResponse
export type GetChecks401 = RenderErrorResponse
export const GetChecks401 = RenderErrorResponse
export type GetChecks403 = RenderErrorResponse
export const GetChecks403 = RenderErrorResponse
export type GetChecks500 = RenderErrorResponse
export const GetChecks500 = RenderErrorResponse
export type ListClustersRequestJson = InframonitoringtypesPostableClusters
export const ListClustersRequestJson = InframonitoringtypesPostableClusters
export type ListClusters200 = { readonly "data": InframonitoringtypesClusters, readonly "status": string }
export const ListClusters200 = Schema.Struct({ "data": InframonitoringtypesClusters, "status": Schema.String })
export type ListClusters400 = RenderErrorResponse
export const ListClusters400 = RenderErrorResponse
export type ListClusters401 = RenderErrorResponse
export const ListClusters401 = RenderErrorResponse
export type ListClusters403 = RenderErrorResponse
export const ListClusters403 = RenderErrorResponse
export type ListClusters500 = RenderErrorResponse
export const ListClusters500 = RenderErrorResponse
export type ListDaemonSetsRequestJson = InframonitoringtypesPostableDaemonSets
export const ListDaemonSetsRequestJson = InframonitoringtypesPostableDaemonSets
export type ListDaemonSets200 = { readonly "data": InframonitoringtypesDaemonSets, readonly "status": string }
export const ListDaemonSets200 = Schema.Struct({ "data": InframonitoringtypesDaemonSets, "status": Schema.String })
export type ListDaemonSets400 = RenderErrorResponse
export const ListDaemonSets400 = RenderErrorResponse
export type ListDaemonSets401 = RenderErrorResponse
export const ListDaemonSets401 = RenderErrorResponse
export type ListDaemonSets403 = RenderErrorResponse
export const ListDaemonSets403 = RenderErrorResponse
export type ListDaemonSets500 = RenderErrorResponse
export const ListDaemonSets500 = RenderErrorResponse
export type ListDeploymentsRequestJson = InframonitoringtypesPostableDeployments
export const ListDeploymentsRequestJson = InframonitoringtypesPostableDeployments
export type ListDeployments200 = { readonly "data": InframonitoringtypesDeployments, readonly "status": string }
export const ListDeployments200 = Schema.Struct({ "data": InframonitoringtypesDeployments, "status": Schema.String })
export type ListDeployments400 = RenderErrorResponse
export const ListDeployments400 = RenderErrorResponse
export type ListDeployments401 = RenderErrorResponse
export const ListDeployments401 = RenderErrorResponse
export type ListDeployments403 = RenderErrorResponse
export const ListDeployments403 = RenderErrorResponse
export type ListDeployments500 = RenderErrorResponse
export const ListDeployments500 = RenderErrorResponse
export type ListHostsRequestJson = InframonitoringtypesPostableHosts
export const ListHostsRequestJson = InframonitoringtypesPostableHosts
export type ListHosts200 = { readonly "data": InframonitoringtypesHosts, readonly "status": string }
export const ListHosts200 = Schema.Struct({ "data": InframonitoringtypesHosts, "status": Schema.String })
export type ListHosts400 = RenderErrorResponse
export const ListHosts400 = RenderErrorResponse
export type ListHosts401 = RenderErrorResponse
export const ListHosts401 = RenderErrorResponse
export type ListHosts403 = RenderErrorResponse
export const ListHosts403 = RenderErrorResponse
export type ListHosts500 = RenderErrorResponse
export const ListHosts500 = RenderErrorResponse
export type ListJobsRequestJson = InframonitoringtypesPostableJobs
export const ListJobsRequestJson = InframonitoringtypesPostableJobs
export type ListJobs200 = { readonly "data": InframonitoringtypesJobs, readonly "status": string }
export const ListJobs200 = Schema.Struct({ "data": InframonitoringtypesJobs, "status": Schema.String })
export type ListJobs400 = RenderErrorResponse
export const ListJobs400 = RenderErrorResponse
export type ListJobs401 = RenderErrorResponse
export const ListJobs401 = RenderErrorResponse
export type ListJobs403 = RenderErrorResponse
export const ListJobs403 = RenderErrorResponse
export type ListJobs500 = RenderErrorResponse
export const ListJobs500 = RenderErrorResponse
export type ListContainersRequestJson = InframonitoringtypesPostableContainers
export const ListContainersRequestJson = InframonitoringtypesPostableContainers
export type ListContainers200 = { readonly "data": InframonitoringtypesContainers, readonly "status": string }
export const ListContainers200 = Schema.Struct({ "data": InframonitoringtypesContainers, "status": Schema.String })
export type ListContainers400 = RenderErrorResponse
export const ListContainers400 = RenderErrorResponse
export type ListContainers401 = RenderErrorResponse
export const ListContainers401 = RenderErrorResponse
export type ListContainers403 = RenderErrorResponse
export const ListContainers403 = RenderErrorResponse
export type ListContainers500 = RenderErrorResponse
export const ListContainers500 = RenderErrorResponse
export type ListNamespacesRequestJson = InframonitoringtypesPostableNamespaces
export const ListNamespacesRequestJson = InframonitoringtypesPostableNamespaces
export type ListNamespaces200 = { readonly "data": InframonitoringtypesNamespaces, readonly "status": string }
export const ListNamespaces200 = Schema.Struct({ "data": InframonitoringtypesNamespaces, "status": Schema.String })
export type ListNamespaces400 = RenderErrorResponse
export const ListNamespaces400 = RenderErrorResponse
export type ListNamespaces401 = RenderErrorResponse
export const ListNamespaces401 = RenderErrorResponse
export type ListNamespaces403 = RenderErrorResponse
export const ListNamespaces403 = RenderErrorResponse
export type ListNamespaces500 = RenderErrorResponse
export const ListNamespaces500 = RenderErrorResponse
export type ListNodesRequestJson = InframonitoringtypesPostableNodes
export const ListNodesRequestJson = InframonitoringtypesPostableNodes
export type ListNodes200 = { readonly "data": InframonitoringtypesNodes, readonly "status": string }
export const ListNodes200 = Schema.Struct({ "data": InframonitoringtypesNodes, "status": Schema.String })
export type ListNodes400 = RenderErrorResponse
export const ListNodes400 = RenderErrorResponse
export type ListNodes401 = RenderErrorResponse
export const ListNodes401 = RenderErrorResponse
export type ListNodes403 = RenderErrorResponse
export const ListNodes403 = RenderErrorResponse
export type ListNodes500 = RenderErrorResponse
export const ListNodes500 = RenderErrorResponse
export type ListPodsRequestJson = InframonitoringtypesPostablePods
export const ListPodsRequestJson = InframonitoringtypesPostablePods
export type ListPods200 = { readonly "data": InframonitoringtypesPods, readonly "status": string }
export const ListPods200 = Schema.Struct({ "data": InframonitoringtypesPods, "status": Schema.String })
export type ListPods400 = RenderErrorResponse
export const ListPods400 = RenderErrorResponse
export type ListPods401 = RenderErrorResponse
export const ListPods401 = RenderErrorResponse
export type ListPods403 = RenderErrorResponse
export const ListPods403 = RenderErrorResponse
export type ListPods500 = RenderErrorResponse
export const ListPods500 = RenderErrorResponse
export type ListVolumesRequestJson = InframonitoringtypesPostableVolumes
export const ListVolumesRequestJson = InframonitoringtypesPostableVolumes
export type ListVolumes200 = { readonly "data": InframonitoringtypesVolumes, readonly "status": string }
export const ListVolumes200 = Schema.Struct({ "data": InframonitoringtypesVolumes, "status": Schema.String })
export type ListVolumes400 = RenderErrorResponse
export const ListVolumes400 = RenderErrorResponse
export type ListVolumes401 = RenderErrorResponse
export const ListVolumes401 = RenderErrorResponse
export type ListVolumes403 = RenderErrorResponse
export const ListVolumes403 = RenderErrorResponse
export type ListVolumes500 = RenderErrorResponse
export const ListVolumes500 = RenderErrorResponse
export type ListStatefulSetsRequestJson = InframonitoringtypesPostableStatefulSets
export const ListStatefulSetsRequestJson = InframonitoringtypesPostableStatefulSets
export type ListStatefulSets200 = { readonly "data": InframonitoringtypesStatefulSets, readonly "status": string }
export const ListStatefulSets200 = Schema.Struct({ "data": InframonitoringtypesStatefulSets, "status": Schema.String })
export type ListStatefulSets400 = RenderErrorResponse
export const ListStatefulSets400 = RenderErrorResponse
export type ListStatefulSets401 = RenderErrorResponse
export const ListStatefulSets401 = RenderErrorResponse
export type ListStatefulSets403 = RenderErrorResponse
export const ListStatefulSets403 = RenderErrorResponse
export type ListStatefulSets500 = RenderErrorResponse
export const ListStatefulSets500 = RenderErrorResponse
export type Livez200 = { readonly "data": FactoryResponse, readonly "status": string }
export const Livez200 = Schema.Struct({ "data": FactoryResponse, "status": Schema.String })
export type Livez500 = RenderErrorResponse
export const Livez500 = RenderErrorResponse
export type ListMetricReductionRulesParams = { readonly "orderBy"?: MetricreductionruletypesReductionRuleOrderBy, readonly "order"?: MetricreductionruletypesOrder, readonly "search"?: string, readonly "metricName"?: string, readonly "offset"?: number, readonly "limit"?: number }
export const ListMetricReductionRulesParams = Schema.Struct({ "orderBy": Schema.optionalKey(MetricreductionruletypesReductionRuleOrderBy), "order": Schema.optionalKey(MetricreductionruletypesOrder), "search": Schema.optionalKey(Schema.String), "metricName": Schema.optionalKey(Schema.String), "offset": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "limit": Schema.optionalKey(Schema.Number.check(Schema.isInt())) })
export type ListMetricReductionRules200 = { readonly "data": MetricreductionruletypesGettableReductionRules, readonly "status": string }
export const ListMetricReductionRules200 = Schema.Struct({ "data": MetricreductionruletypesGettableReductionRules, "status": Schema.String })
export type ListMetricReductionRules401 = RenderErrorResponse
export const ListMetricReductionRules401 = RenderErrorResponse
export type ListMetricReductionRules403 = RenderErrorResponse
export const ListMetricReductionRules403 = RenderErrorResponse
export type ListMetricReductionRules451 = RenderErrorResponse
export const ListMetricReductionRules451 = RenderErrorResponse
export type ListMetricReductionRules500 = RenderErrorResponse
export const ListMetricReductionRules500 = RenderErrorResponse
export type ListMetricReductionRules501 = RenderErrorResponse
export const ListMetricReductionRules501 = RenderErrorResponse
export type CreateMetricReductionRuleRequestJson = MetricreductionruletypesPostableReductionRule
export const CreateMetricReductionRuleRequestJson = MetricreductionruletypesPostableReductionRule
export type CreateMetricReductionRule201 = { readonly "data": MetricreductionruletypesGettableReductionRule, readonly "status": string }
export const CreateMetricReductionRule201 = Schema.Struct({ "data": MetricreductionruletypesGettableReductionRule, "status": Schema.String })
export type CreateMetricReductionRule400 = RenderErrorResponse
export const CreateMetricReductionRule400 = RenderErrorResponse
export type CreateMetricReductionRule401 = RenderErrorResponse
export const CreateMetricReductionRule401 = RenderErrorResponse
export type CreateMetricReductionRule403 = RenderErrorResponse
export const CreateMetricReductionRule403 = RenderErrorResponse
export type CreateMetricReductionRule409 = RenderErrorResponse
export const CreateMetricReductionRule409 = RenderErrorResponse
export type CreateMetricReductionRule451 = RenderErrorResponse
export const CreateMetricReductionRule451 = RenderErrorResponse
export type CreateMetricReductionRule500 = RenderErrorResponse
export const CreateMetricReductionRule500 = RenderErrorResponse
export type CreateMetricReductionRule501 = RenderErrorResponse
export const CreateMetricReductionRule501 = RenderErrorResponse
export type GetMetricReductionRuleByID200 = { readonly "data": MetricreductionruletypesGettableReductionRule, readonly "status": string }
export const GetMetricReductionRuleByID200 = Schema.Struct({ "data": MetricreductionruletypesGettableReductionRule, "status": Schema.String })
export type GetMetricReductionRuleByID401 = RenderErrorResponse
export const GetMetricReductionRuleByID401 = RenderErrorResponse
export type GetMetricReductionRuleByID403 = RenderErrorResponse
export const GetMetricReductionRuleByID403 = RenderErrorResponse
export type GetMetricReductionRuleByID404 = RenderErrorResponse
export const GetMetricReductionRuleByID404 = RenderErrorResponse
export type GetMetricReductionRuleByID451 = RenderErrorResponse
export const GetMetricReductionRuleByID451 = RenderErrorResponse
export type GetMetricReductionRuleByID500 = RenderErrorResponse
export const GetMetricReductionRuleByID500 = RenderErrorResponse
export type GetMetricReductionRuleByID501 = RenderErrorResponse
export const GetMetricReductionRuleByID501 = RenderErrorResponse
export type UpdateMetricReductionRuleByIDRequestJson = MetricreductionruletypesUpdatableReductionRule
export const UpdateMetricReductionRuleByIDRequestJson = MetricreductionruletypesUpdatableReductionRule
export type UpdateMetricReductionRuleByID200 = { readonly "data": MetricreductionruletypesGettableReductionRule, readonly "status": string }
export const UpdateMetricReductionRuleByID200 = Schema.Struct({ "data": MetricreductionruletypesGettableReductionRule, "status": Schema.String })
export type UpdateMetricReductionRuleByID400 = RenderErrorResponse
export const UpdateMetricReductionRuleByID400 = RenderErrorResponse
export type UpdateMetricReductionRuleByID401 = RenderErrorResponse
export const UpdateMetricReductionRuleByID401 = RenderErrorResponse
export type UpdateMetricReductionRuleByID403 = RenderErrorResponse
export const UpdateMetricReductionRuleByID403 = RenderErrorResponse
export type UpdateMetricReductionRuleByID404 = RenderErrorResponse
export const UpdateMetricReductionRuleByID404 = RenderErrorResponse
export type UpdateMetricReductionRuleByID451 = RenderErrorResponse
export const UpdateMetricReductionRuleByID451 = RenderErrorResponse
export type UpdateMetricReductionRuleByID500 = RenderErrorResponse
export const UpdateMetricReductionRuleByID500 = RenderErrorResponse
export type UpdateMetricReductionRuleByID501 = RenderErrorResponse
export const UpdateMetricReductionRuleByID501 = RenderErrorResponse
export type DeleteMetricReductionRuleByID401 = RenderErrorResponse
export const DeleteMetricReductionRuleByID401 = RenderErrorResponse
export type DeleteMetricReductionRuleByID403 = RenderErrorResponse
export const DeleteMetricReductionRuleByID403 = RenderErrorResponse
export type DeleteMetricReductionRuleByID404 = RenderErrorResponse
export const DeleteMetricReductionRuleByID404 = RenderErrorResponse
export type DeleteMetricReductionRuleByID451 = RenderErrorResponse
export const DeleteMetricReductionRuleByID451 = RenderErrorResponse
export type DeleteMetricReductionRuleByID500 = RenderErrorResponse
export const DeleteMetricReductionRuleByID500 = RenderErrorResponse
export type DeleteMetricReductionRuleByID501 = RenderErrorResponse
export const DeleteMetricReductionRuleByID501 = RenderErrorResponse
export type PreviewMetricReductionRuleRequestJson = MetricreductionruletypesPostableReductionRulePreview
export const PreviewMetricReductionRuleRequestJson = MetricreductionruletypesPostableReductionRulePreview
export type PreviewMetricReductionRule200 = { readonly "data": MetricreductionruletypesGettableReductionRulePreview, readonly "status": string }
export const PreviewMetricReductionRule200 = Schema.Struct({ "data": MetricreductionruletypesGettableReductionRulePreview, "status": Schema.String })
export type PreviewMetricReductionRule400 = RenderErrorResponse
export const PreviewMetricReductionRule400 = RenderErrorResponse
export type PreviewMetricReductionRule401 = RenderErrorResponse
export const PreviewMetricReductionRule401 = RenderErrorResponse
export type PreviewMetricReductionRule403 = RenderErrorResponse
export const PreviewMetricReductionRule403 = RenderErrorResponse
export type PreviewMetricReductionRule404 = RenderErrorResponse
export const PreviewMetricReductionRule404 = RenderErrorResponse
export type PreviewMetricReductionRule451 = RenderErrorResponse
export const PreviewMetricReductionRule451 = RenderErrorResponse
export type PreviewMetricReductionRule500 = RenderErrorResponse
export const PreviewMetricReductionRule500 = RenderErrorResponse
export type PreviewMetricReductionRule501 = RenderErrorResponse
export const PreviewMetricReductionRule501 = RenderErrorResponse
export type GetMetricReductionRuleStats200 = { readonly "data": MetricreductionruletypesGettableReductionRuleStats, readonly "status": string }
export const GetMetricReductionRuleStats200 = Schema.Struct({ "data": MetricreductionruletypesGettableReductionRuleStats, "status": Schema.String })
export type GetMetricReductionRuleStats401 = RenderErrorResponse
export const GetMetricReductionRuleStats401 = RenderErrorResponse
export type GetMetricReductionRuleStats403 = RenderErrorResponse
export const GetMetricReductionRuleStats403 = RenderErrorResponse
export type GetMetricReductionRuleStats451 = RenderErrorResponse
export const GetMetricReductionRuleStats451 = RenderErrorResponse
export type GetMetricReductionRuleStats500 = RenderErrorResponse
export const GetMetricReductionRuleStats500 = RenderErrorResponse
export type GetMetricReductionRuleStats501 = RenderErrorResponse
export const GetMetricReductionRuleStats501 = RenderErrorResponse
export type GetMetricReductionRuleTimeseries200 = { readonly "data": Querybuildertypesv5QueryRangeResponse, readonly "status": string }
export const GetMetricReductionRuleTimeseries200 = Schema.Struct({ "data": Querybuildertypesv5QueryRangeResponse, "status": Schema.String })
export type GetMetricReductionRuleTimeseries401 = RenderErrorResponse
export const GetMetricReductionRuleTimeseries401 = RenderErrorResponse
export type GetMetricReductionRuleTimeseries403 = RenderErrorResponse
export const GetMetricReductionRuleTimeseries403 = RenderErrorResponse
export type GetMetricReductionRuleTimeseries451 = RenderErrorResponse
export const GetMetricReductionRuleTimeseries451 = RenderErrorResponse
export type GetMetricReductionRuleTimeseries500 = RenderErrorResponse
export const GetMetricReductionRuleTimeseries500 = RenderErrorResponse
export type GetMetricReductionRuleTimeseries501 = RenderErrorResponse
export const GetMetricReductionRuleTimeseries501 = RenderErrorResponse
export type ListMetricsParams = { readonly "start"?: number | null, readonly "end"?: number | null, readonly "limit"?: number, readonly "searchText"?: string, readonly "source"?: string }
export const ListMetricsParams = Schema.Struct({ "start": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isInt()), Schema.Null])), "end": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isInt()), Schema.Null])), "limit": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "searchText": Schema.optionalKey(Schema.String), "source": Schema.optionalKey(Schema.String) })
export type ListMetrics200 = { readonly "data": MetricsexplorertypesListMetricsResponse, readonly "status": string }
export const ListMetrics200 = Schema.Struct({ "data": MetricsexplorertypesListMetricsResponse, "status": Schema.String })
export type ListMetrics400 = RenderErrorResponse
export const ListMetrics400 = RenderErrorResponse
export type ListMetrics401 = RenderErrorResponse
export const ListMetrics401 = RenderErrorResponse
export type ListMetrics403 = RenderErrorResponse
export const ListMetrics403 = RenderErrorResponse
export type ListMetrics500 = RenderErrorResponse
export const ListMetrics500 = RenderErrorResponse
export type GetMetricAlertsParams = { readonly "metricName": string }
export const GetMetricAlertsParams = Schema.Struct({ "metricName": Schema.String.annotate({ "description": "The name of the metric. May contain slashes (e.g. cloud-provider metrics like run.googleapis.com/request_latencies)." }) })
export type GetMetricAlerts200 = { readonly "data": MetricsexplorertypesMetricAlertsResponse, readonly "status": string }
export const GetMetricAlerts200 = Schema.Struct({ "data": MetricsexplorertypesMetricAlertsResponse, "status": Schema.String })
export type GetMetricAlerts400 = RenderErrorResponse
export const GetMetricAlerts400 = RenderErrorResponse
export type GetMetricAlerts401 = RenderErrorResponse
export const GetMetricAlerts401 = RenderErrorResponse
export type GetMetricAlerts403 = RenderErrorResponse
export const GetMetricAlerts403 = RenderErrorResponse
export type GetMetricAlerts404 = RenderErrorResponse
export const GetMetricAlerts404 = RenderErrorResponse
export type GetMetricAlerts500 = RenderErrorResponse
export const GetMetricAlerts500 = RenderErrorResponse
export type GetMetricAttributesParams = { readonly "metricName": string, readonly "start"?: number | null, readonly "end"?: number | null }
export const GetMetricAttributesParams = Schema.Struct({ "metricName": Schema.String.annotate({ "description": "The name of the metric. May contain slashes (e.g. cloud-provider metrics like run.googleapis.com/request_latencies)." }), "start": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isInt()), Schema.Null]).annotate({ "description": "Start of the time range as a Unix timestamp in milliseconds." })), "end": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isInt()), Schema.Null]).annotate({ "description": "End of the time range as a Unix timestamp in milliseconds." })) })
export type GetMetricAttributes200 = { readonly "data": MetricsexplorertypesMetricAttributesResponse, readonly "status": string }
export const GetMetricAttributes200 = Schema.Struct({ "data": MetricsexplorertypesMetricAttributesResponse, "status": Schema.String })
export type GetMetricAttributes400 = RenderErrorResponse
export const GetMetricAttributes400 = RenderErrorResponse
export type GetMetricAttributes401 = RenderErrorResponse
export const GetMetricAttributes401 = RenderErrorResponse
export type GetMetricAttributes403 = RenderErrorResponse
export const GetMetricAttributes403 = RenderErrorResponse
export type GetMetricAttributes404 = RenderErrorResponse
export const GetMetricAttributes404 = RenderErrorResponse
export type GetMetricAttributes500 = RenderErrorResponse
export const GetMetricAttributes500 = RenderErrorResponse
export type GetMetricDashboardsParams = { readonly "metricName": string }
export const GetMetricDashboardsParams = Schema.Struct({ "metricName": Schema.String.annotate({ "description": "The name of the metric. May contain slashes (e.g. cloud-provider metrics like run.googleapis.com/request_latencies)." }) })
export type GetMetricDashboards200 = { readonly "data": MetricsexplorertypesMetricDashboardsResponse, readonly "status": string }
export const GetMetricDashboards200 = Schema.Struct({ "data": MetricsexplorertypesMetricDashboardsResponse, "status": Schema.String })
export type GetMetricDashboards400 = RenderErrorResponse
export const GetMetricDashboards400 = RenderErrorResponse
export type GetMetricDashboards401 = RenderErrorResponse
export const GetMetricDashboards401 = RenderErrorResponse
export type GetMetricDashboards403 = RenderErrorResponse
export const GetMetricDashboards403 = RenderErrorResponse
export type GetMetricDashboards404 = RenderErrorResponse
export const GetMetricDashboards404 = RenderErrorResponse
export type GetMetricDashboards500 = RenderErrorResponse
export const GetMetricDashboards500 = RenderErrorResponse
export type GetMetricHighlightsParams = { readonly "metricName": string }
export const GetMetricHighlightsParams = Schema.Struct({ "metricName": Schema.String.annotate({ "description": "The name of the metric. May contain slashes (e.g. cloud-provider metrics like run.googleapis.com/request_latencies)." }) })
export type GetMetricHighlights200 = { readonly "data": MetricsexplorertypesMetricHighlightsResponse, readonly "status": string }
export const GetMetricHighlights200 = Schema.Struct({ "data": MetricsexplorertypesMetricHighlightsResponse, "status": Schema.String })
export type GetMetricHighlights400 = RenderErrorResponse
export const GetMetricHighlights400 = RenderErrorResponse
export type GetMetricHighlights401 = RenderErrorResponse
export const GetMetricHighlights401 = RenderErrorResponse
export type GetMetricHighlights403 = RenderErrorResponse
export const GetMetricHighlights403 = RenderErrorResponse
export type GetMetricHighlights404 = RenderErrorResponse
export const GetMetricHighlights404 = RenderErrorResponse
export type GetMetricHighlights500 = RenderErrorResponse
export const GetMetricHighlights500 = RenderErrorResponse
export type InspectMetricsRequestJson = MetricsexplorertypesInspectMetricsRequest
export const InspectMetricsRequestJson = MetricsexplorertypesInspectMetricsRequest
export type InspectMetrics200 = { readonly "data": MetricsexplorertypesInspectMetricsResponse, readonly "status": string }
export const InspectMetrics200 = Schema.Struct({ "data": MetricsexplorertypesInspectMetricsResponse, "status": Schema.String })
export type InspectMetrics400 = RenderErrorResponse
export const InspectMetrics400 = RenderErrorResponse
export type InspectMetrics401 = RenderErrorResponse
export const InspectMetrics401 = RenderErrorResponse
export type InspectMetrics403 = RenderErrorResponse
export const InspectMetrics403 = RenderErrorResponse
export type InspectMetrics500 = RenderErrorResponse
export const InspectMetrics500 = RenderErrorResponse
export type GetMetricMetadataParams = { readonly "metricName": string }
export const GetMetricMetadataParams = Schema.Struct({ "metricName": Schema.String.annotate({ "description": "The name of the metric. May contain slashes (e.g. cloud-provider metrics like run.googleapis.com/request_latencies)." }) })
export type GetMetricMetadata200 = { readonly "data": MetricsexplorertypesMetricMetadata, readonly "status": string }
export const GetMetricMetadata200 = Schema.Struct({ "data": MetricsexplorertypesMetricMetadata, "status": Schema.String })
export type GetMetricMetadata400 = RenderErrorResponse
export const GetMetricMetadata400 = RenderErrorResponse
export type GetMetricMetadata401 = RenderErrorResponse
export const GetMetricMetadata401 = RenderErrorResponse
export type GetMetricMetadata403 = RenderErrorResponse
export const GetMetricMetadata403 = RenderErrorResponse
export type GetMetricMetadata404 = RenderErrorResponse
export const GetMetricMetadata404 = RenderErrorResponse
export type GetMetricMetadata500 = RenderErrorResponse
export const GetMetricMetadata500 = RenderErrorResponse
export type UpdateMetricMetadataRequestJson = MetricsexplorertypesUpdateMetricMetadataRequest
export const UpdateMetricMetadataRequestJson = MetricsexplorertypesUpdateMetricMetadataRequest
export type UpdateMetricMetadata400 = RenderErrorResponse
export const UpdateMetricMetadata400 = RenderErrorResponse
export type UpdateMetricMetadata401 = RenderErrorResponse
export const UpdateMetricMetadata401 = RenderErrorResponse
export type UpdateMetricMetadata403 = RenderErrorResponse
export const UpdateMetricMetadata403 = RenderErrorResponse
export type UpdateMetricMetadata500 = RenderErrorResponse
export const UpdateMetricMetadata500 = RenderErrorResponse
export type GetMetricsOnboardingStatus200 = { readonly "data": MetricsexplorertypesMetricsOnboardingResponse, readonly "status": string }
export const GetMetricsOnboardingStatus200 = Schema.Struct({ "data": MetricsexplorertypesMetricsOnboardingResponse, "status": Schema.String })
export type GetMetricsOnboardingStatus401 = RenderErrorResponse
export const GetMetricsOnboardingStatus401 = RenderErrorResponse
export type GetMetricsOnboardingStatus403 = RenderErrorResponse
export const GetMetricsOnboardingStatus403 = RenderErrorResponse
export type GetMetricsOnboardingStatus500 = RenderErrorResponse
export const GetMetricsOnboardingStatus500 = RenderErrorResponse
export type GetMetricsStatsRequestJson = MetricsexplorertypesStatsRequest
export const GetMetricsStatsRequestJson = MetricsexplorertypesStatsRequest
export type GetMetricsStats200 = { readonly "data": MetricsexplorertypesStatsResponse, readonly "status": string }
export const GetMetricsStats200 = Schema.Struct({ "data": MetricsexplorertypesStatsResponse, "status": Schema.String })
export type GetMetricsStats400 = RenderErrorResponse
export const GetMetricsStats400 = RenderErrorResponse
export type GetMetricsStats401 = RenderErrorResponse
export const GetMetricsStats401 = RenderErrorResponse
export type GetMetricsStats403 = RenderErrorResponse
export const GetMetricsStats403 = RenderErrorResponse
export type GetMetricsStats500 = RenderErrorResponse
export const GetMetricsStats500 = RenderErrorResponse
export type GetMetricsTreemapRequestJson = MetricsexplorertypesTreemapRequest
export const GetMetricsTreemapRequestJson = MetricsexplorertypesTreemapRequest
export type GetMetricsTreemap200 = { readonly "data": MetricsexplorertypesTreemapResponse, readonly "status": string }
export const GetMetricsTreemap200 = Schema.Struct({ "data": MetricsexplorertypesTreemapResponse, "status": Schema.String })
export type GetMetricsTreemap400 = RenderErrorResponse
export const GetMetricsTreemap400 = RenderErrorResponse
export type GetMetricsTreemap401 = RenderErrorResponse
export const GetMetricsTreemap401 = RenderErrorResponse
export type GetMetricsTreemap403 = RenderErrorResponse
export const GetMetricsTreemap403 = RenderErrorResponse
export type GetMetricsTreemap500 = RenderErrorResponse
export const GetMetricsTreemap500 = RenderErrorResponse
export type GetMyOrganization200 = { readonly "data": TypesOrganization, readonly "status": string }
export const GetMyOrganization200 = Schema.Struct({ "data": TypesOrganization, "status": Schema.String })
export type GetMyOrganization401 = RenderErrorResponse
export const GetMyOrganization401 = RenderErrorResponse
export type GetMyOrganization403 = RenderErrorResponse
export const GetMyOrganization403 = RenderErrorResponse
export type GetMyOrganization500 = RenderErrorResponse
export const GetMyOrganization500 = RenderErrorResponse
export type UpdateMyOrganizationRequestJson = TypesOrganization
export const UpdateMyOrganizationRequestJson = TypesOrganization
export type UpdateMyOrganization400 = RenderErrorResponse
export const UpdateMyOrganization400 = RenderErrorResponse
export type UpdateMyOrganization401 = RenderErrorResponse
export const UpdateMyOrganization401 = RenderErrorResponse
export type UpdateMyOrganization403 = RenderErrorResponse
export const UpdateMyOrganization403 = RenderErrorResponse
export type UpdateMyOrganization409 = RenderErrorResponse
export const UpdateMyOrganization409 = RenderErrorResponse
export type UpdateMyOrganization500 = RenderErrorResponse
export const UpdateMyOrganization500 = RenderErrorResponse
export type GetPublicDashboardDataV2200 = { readonly "data": DashboardtypesGettablePublicDashboardDataV2, readonly "status": string }
export const GetPublicDashboardDataV2200 = Schema.Struct({ "data": DashboardtypesGettablePublicDashboardDataV2, "status": Schema.String })
export type GetPublicDashboardDataV2400 = RenderErrorResponse
export const GetPublicDashboardDataV2400 = RenderErrorResponse
export type GetPublicDashboardDataV2401 = RenderErrorResponse
export const GetPublicDashboardDataV2401 = RenderErrorResponse
export type GetPublicDashboardDataV2403 = RenderErrorResponse
export const GetPublicDashboardDataV2403 = RenderErrorResponse
export type GetPublicDashboardDataV2404 = RenderErrorResponse
export const GetPublicDashboardDataV2404 = RenderErrorResponse
export type GetPublicDashboardDataV2500 = RenderErrorResponse
export const GetPublicDashboardDataV2500 = RenderErrorResponse
export type GetPublicDashboardPanelQueryRangeV2Params = { readonly "startTime"?: string, readonly "endTime"?: string }
export const GetPublicDashboardPanelQueryRangeV2Params = Schema.Struct({ "startTime": Schema.optionalKey(Schema.String), "endTime": Schema.optionalKey(Schema.String) })
export type GetPublicDashboardPanelQueryRangeV2200 = { readonly "data": Querybuildertypesv5QueryRangeResponse, readonly "status": string }
export const GetPublicDashboardPanelQueryRangeV2200 = Schema.Struct({ "data": Querybuildertypesv5QueryRangeResponse, "status": Schema.String })
export type GetPublicDashboardPanelQueryRangeV2400 = RenderErrorResponse
export const GetPublicDashboardPanelQueryRangeV2400 = RenderErrorResponse
export type GetPublicDashboardPanelQueryRangeV2401 = RenderErrorResponse
export const GetPublicDashboardPanelQueryRangeV2401 = RenderErrorResponse
export type GetPublicDashboardPanelQueryRangeV2403 = RenderErrorResponse
export const GetPublicDashboardPanelQueryRangeV2403 = RenderErrorResponse
export type GetPublicDashboardPanelQueryRangeV2404 = RenderErrorResponse
export const GetPublicDashboardPanelQueryRangeV2404 = RenderErrorResponse
export type GetPublicDashboardPanelQueryRangeV2500 = RenderErrorResponse
export const GetPublicDashboardPanelQueryRangeV2500 = RenderErrorResponse
export type Readyz200 = { readonly "data": FactoryResponse, readonly "status": string }
export const Readyz200 = Schema.Struct({ "data": FactoryResponse, "status": Schema.String })
export type Readyz503 = { readonly "data": FactoryResponse, readonly "status": string }
export const Readyz503 = Schema.Struct({ "data": FactoryResponse, "status": Schema.String })
export type VerifyResetPasswordTokenRequestJson = TypesPostableVerifyResetPasswordToken
export const VerifyResetPasswordTokenRequestJson = TypesPostableVerifyResetPasswordToken
export type VerifyResetPasswordToken400 = RenderErrorResponse
export const VerifyResetPasswordToken400 = RenderErrorResponse
export type VerifyResetPasswordToken404 = RenderErrorResponse
export const VerifyResetPasswordToken404 = RenderErrorResponse
export type VerifyResetPasswordToken500 = RenderErrorResponse
export const VerifyResetPasswordToken500 = RenderErrorResponse
export type GetUsersByRoleID200 = { readonly "data": ReadonlyArray<TypesUser>, readonly "status": string }
export const GetUsersByRoleID200 = Schema.Struct({ "data": Schema.Array(TypesUser), "status": Schema.String })
export type GetUsersByRoleID401 = RenderErrorResponse
export const GetUsersByRoleID401 = RenderErrorResponse
export type GetUsersByRoleID403 = RenderErrorResponse
export const GetUsersByRoleID403 = RenderErrorResponse
export type GetUsersByRoleID404 = RenderErrorResponse
export const GetUsersByRoleID404 = RenderErrorResponse
export type GetUsersByRoleID500 = RenderErrorResponse
export const GetUsersByRoleID500 = RenderErrorResponse
export type ListRules200 = { readonly "data": ReadonlyArray<RuletypesRule>, readonly "status": string }
export const ListRules200 = Schema.Struct({ "data": Schema.Array(RuletypesRule), "status": Schema.String })
export type ListRules401 = RenderErrorResponse
export const ListRules401 = RenderErrorResponse
export type ListRules403 = RenderErrorResponse
export const ListRules403 = RenderErrorResponse
export type ListRules500 = RenderErrorResponse
export const ListRules500 = RenderErrorResponse
export type CreateRuleRequestJson = RuletypesPostableRule
export const CreateRuleRequestJson = RuletypesPostableRule
export type CreateRule201 = { readonly "data": RuletypesRule, readonly "status": string }
export const CreateRule201 = Schema.Struct({ "data": RuletypesRule, "status": Schema.String })
export type CreateRule400 = RenderErrorResponse
export const CreateRule400 = RenderErrorResponse
export type CreateRule401 = RenderErrorResponse
export const CreateRule401 = RenderErrorResponse
export type CreateRule403 = RenderErrorResponse
export const CreateRule403 = RenderErrorResponse
export type CreateRule500 = RenderErrorResponse
export const CreateRule500 = RenderErrorResponse
export type GetRuleByID200 = { readonly "data": RuletypesRule, readonly "status": string }
export const GetRuleByID200 = Schema.Struct({ "data": RuletypesRule, "status": Schema.String })
export type GetRuleByID401 = RenderErrorResponse
export const GetRuleByID401 = RenderErrorResponse
export type GetRuleByID403 = RenderErrorResponse
export const GetRuleByID403 = RenderErrorResponse
export type GetRuleByID404 = RenderErrorResponse
export const GetRuleByID404 = RenderErrorResponse
export type GetRuleByID500 = RenderErrorResponse
export const GetRuleByID500 = RenderErrorResponse
export type UpdateRuleByIDRequestJson = RuletypesPostableRule
export const UpdateRuleByIDRequestJson = RuletypesPostableRule
export type UpdateRuleByID400 = RenderErrorResponse
export const UpdateRuleByID400 = RenderErrorResponse
export type UpdateRuleByID401 = RenderErrorResponse
export const UpdateRuleByID401 = RenderErrorResponse
export type UpdateRuleByID403 = RenderErrorResponse
export const UpdateRuleByID403 = RenderErrorResponse
export type UpdateRuleByID404 = RenderErrorResponse
export const UpdateRuleByID404 = RenderErrorResponse
export type UpdateRuleByID500 = RenderErrorResponse
export const UpdateRuleByID500 = RenderErrorResponse
export type DeleteRuleByID401 = RenderErrorResponse
export const DeleteRuleByID401 = RenderErrorResponse
export type DeleteRuleByID403 = RenderErrorResponse
export const DeleteRuleByID403 = RenderErrorResponse
export type DeleteRuleByID404 = RenderErrorResponse
export const DeleteRuleByID404 = RenderErrorResponse
export type DeleteRuleByID500 = RenderErrorResponse
export const DeleteRuleByID500 = RenderErrorResponse
export type PatchRuleByIDRequestJson = RuletypesPostableRule
export const PatchRuleByIDRequestJson = RuletypesPostableRule
export type PatchRuleByID200 = { readonly "data": RuletypesRule, readonly "status": string }
export const PatchRuleByID200 = Schema.Struct({ "data": RuletypesRule, "status": Schema.String })
export type PatchRuleByID400 = RenderErrorResponse
export const PatchRuleByID400 = RenderErrorResponse
export type PatchRuleByID401 = RenderErrorResponse
export const PatchRuleByID401 = RenderErrorResponse
export type PatchRuleByID403 = RenderErrorResponse
export const PatchRuleByID403 = RenderErrorResponse
export type PatchRuleByID404 = RenderErrorResponse
export const PatchRuleByID404 = RenderErrorResponse
export type PatchRuleByID500 = RenderErrorResponse
export const PatchRuleByID500 = RenderErrorResponse
export type GetRuleHistoryFilterKeysParams = { readonly "signal"?: TelemetrytypesSignal, readonly "source"?: TelemetrytypesSource, readonly "limit"?: number, readonly "startUnixMilli"?: number, readonly "endUnixMilli"?: number, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "metricName"?: string, readonly "metricNamespace"?: string, readonly "searchText"?: string }
export const GetRuleHistoryFilterKeysParams = Schema.Struct({ "signal": Schema.optionalKey(TelemetrytypesSignal), "source": Schema.optionalKey(TelemetrytypesSource), "limit": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "startUnixMilli": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "endUnixMilli": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "metricName": Schema.optionalKey(Schema.String), "metricNamespace": Schema.optionalKey(Schema.String), "searchText": Schema.optionalKey(Schema.String) })
export type GetRuleHistoryFilterKeys200 = { readonly "data": TelemetrytypesGettableFieldKeys, readonly "status": string }
export const GetRuleHistoryFilterKeys200 = Schema.Struct({ "data": TelemetrytypesGettableFieldKeys, "status": Schema.String })
export type GetRuleHistoryFilterKeys400 = RenderErrorResponse
export const GetRuleHistoryFilterKeys400 = RenderErrorResponse
export type GetRuleHistoryFilterKeys401 = RenderErrorResponse
export const GetRuleHistoryFilterKeys401 = RenderErrorResponse
export type GetRuleHistoryFilterKeys403 = RenderErrorResponse
export const GetRuleHistoryFilterKeys403 = RenderErrorResponse
export type GetRuleHistoryFilterKeys500 = RenderErrorResponse
export const GetRuleHistoryFilterKeys500 = RenderErrorResponse
export type GetRuleHistoryFilterValuesParams = { readonly "signal"?: TelemetrytypesSignal, readonly "source"?: TelemetrytypesSource, readonly "limit"?: number, readonly "startUnixMilli"?: number, readonly "endUnixMilli"?: number, readonly "fieldContext"?: TelemetrytypesFieldContext, readonly "fieldDataType"?: TelemetrytypesFieldDataType, readonly "metricName"?: string, readonly "metricNamespace"?: string, readonly "searchText"?: string, readonly "name"?: string, readonly "existingQuery"?: string }
export const GetRuleHistoryFilterValuesParams = Schema.Struct({ "signal": Schema.optionalKey(TelemetrytypesSignal), "source": Schema.optionalKey(TelemetrytypesSource), "limit": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "startUnixMilli": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "endUnixMilli": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "fieldContext": Schema.optionalKey(TelemetrytypesFieldContext), "fieldDataType": Schema.optionalKey(TelemetrytypesFieldDataType), "metricName": Schema.optionalKey(Schema.String), "metricNamespace": Schema.optionalKey(Schema.String), "searchText": Schema.optionalKey(Schema.String), "name": Schema.optionalKey(Schema.String), "existingQuery": Schema.optionalKey(Schema.String) })
export type GetRuleHistoryFilterValues200 = { readonly "data": TelemetrytypesGettableFieldValues, readonly "status": string }
export const GetRuleHistoryFilterValues200 = Schema.Struct({ "data": TelemetrytypesGettableFieldValues, "status": Schema.String })
export type GetRuleHistoryFilterValues400 = RenderErrorResponse
export const GetRuleHistoryFilterValues400 = RenderErrorResponse
export type GetRuleHistoryFilterValues401 = RenderErrorResponse
export const GetRuleHistoryFilterValues401 = RenderErrorResponse
export type GetRuleHistoryFilterValues403 = RenderErrorResponse
export const GetRuleHistoryFilterValues403 = RenderErrorResponse
export type GetRuleHistoryFilterValues500 = RenderErrorResponse
export const GetRuleHistoryFilterValues500 = RenderErrorResponse
export type GetRuleHistoryOverallStatusParams = { readonly "start": number, readonly "end": number }
export const GetRuleHistoryOverallStatusParams = Schema.Struct({ "start": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "end": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()) })
export type GetRuleHistoryOverallStatus200 = { readonly "data": ReadonlyArray<{ readonly "end": number, readonly "start": number, readonly "state": RuletypesAlertState }>, readonly "status": string }
export const GetRuleHistoryOverallStatus200 = Schema.Struct({ "data": Schema.Union([Schema.Array(Schema.Struct({ "end": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "start": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "state": RuletypesAlertState }))]), "status": Schema.String })
export type GetRuleHistoryOverallStatus400 = RenderErrorResponse
export const GetRuleHistoryOverallStatus400 = RenderErrorResponse
export type GetRuleHistoryOverallStatus401 = RenderErrorResponse
export const GetRuleHistoryOverallStatus401 = RenderErrorResponse
export type GetRuleHistoryOverallStatus403 = RenderErrorResponse
export const GetRuleHistoryOverallStatus403 = RenderErrorResponse
export type GetRuleHistoryOverallStatus500 = RenderErrorResponse
export const GetRuleHistoryOverallStatus500 = RenderErrorResponse
export type GetRuleHistoryStatsParams = { readonly "start": number, readonly "end": number }
export const GetRuleHistoryStatsParams = Schema.Struct({ "start": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "end": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()) })
export type GetRuleHistoryStats200 = { readonly "data": RulestatehistorytypesGettableRuleStateHistoryStats, readonly "status": string }
export const GetRuleHistoryStats200 = Schema.Struct({ "data": RulestatehistorytypesGettableRuleStateHistoryStats, "status": Schema.String })
export type GetRuleHistoryStats400 = RenderErrorResponse
export const GetRuleHistoryStats400 = RenderErrorResponse
export type GetRuleHistoryStats401 = RenderErrorResponse
export const GetRuleHistoryStats401 = RenderErrorResponse
export type GetRuleHistoryStats403 = RenderErrorResponse
export const GetRuleHistoryStats403 = RenderErrorResponse
export type GetRuleHistoryStats500 = RenderErrorResponse
export const GetRuleHistoryStats500 = RenderErrorResponse
export type GetRuleHistoryTimelineParams = { readonly "start": number, readonly "end": number, readonly "state"?: RuletypesAlertState, readonly "filterExpression"?: string, readonly "limit"?: number, readonly "order"?: Querybuildertypesv5OrderDirection, readonly "cursor"?: string }
export const GetRuleHistoryTimelineParams = Schema.Struct({ "start": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "end": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "state": Schema.optionalKey(RuletypesAlertState), "filterExpression": Schema.optionalKey(Schema.String), "limit": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "order": Schema.optionalKey(Querybuildertypesv5OrderDirection), "cursor": Schema.optionalKey(Schema.String) })
export type GetRuleHistoryTimeline200 = { readonly "data": RulestatehistorytypesGettableRuleStateTimeline, readonly "status": string }
export const GetRuleHistoryTimeline200 = Schema.Struct({ "data": RulestatehistorytypesGettableRuleStateTimeline, "status": Schema.String })
export type GetRuleHistoryTimeline400 = RenderErrorResponse
export const GetRuleHistoryTimeline400 = RenderErrorResponse
export type GetRuleHistoryTimeline401 = RenderErrorResponse
export const GetRuleHistoryTimeline401 = RenderErrorResponse
export type GetRuleHistoryTimeline403 = RenderErrorResponse
export const GetRuleHistoryTimeline403 = RenderErrorResponse
export type GetRuleHistoryTimeline500 = RenderErrorResponse
export const GetRuleHistoryTimeline500 = RenderErrorResponse
export type GetRuleHistoryTopContributorsParams = { readonly "start": number, readonly "end": number }
export const GetRuleHistoryTopContributorsParams = Schema.Struct({ "start": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "end": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()) })
export type GetRuleHistoryTopContributors200 = { readonly "data": ReadonlyArray<{ readonly "count": number, readonly "fingerprint": number, readonly "labels": ReadonlyArray<{ readonly "key"?: TelemetrytypesTelemetryFieldKey, readonly "value"?: string | number | boolean }>, readonly "relatedLogsLink"?: string, readonly "relatedTracesLink"?: string }>, readonly "status": string }
export const GetRuleHistoryTopContributors200 = Schema.Struct({ "data": Schema.Union([Schema.Array(Schema.Struct({ "count": Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)), "fingerprint": Schema.Number.check(Schema.isInt()).check(Schema.isGreaterThanOrEqualTo(0)), "labels": Schema.Union([Schema.Array(Schema.Struct({ "key": Schema.optionalKey(TelemetrytypesTelemetryFieldKey), "value": Schema.optionalKey(Schema.Union([Schema.String, Schema.Number.check(Schema.isFinite()), Schema.Boolean], { mode: "oneOf" })) }))]), "relatedLogsLink": Schema.optionalKey(Schema.String), "relatedTracesLink": Schema.optionalKey(Schema.String) }))]), "status": Schema.String })
export type GetRuleHistoryTopContributors400 = RenderErrorResponse
export const GetRuleHistoryTopContributors400 = RenderErrorResponse
export type GetRuleHistoryTopContributors401 = RenderErrorResponse
export const GetRuleHistoryTopContributors401 = RenderErrorResponse
export type GetRuleHistoryTopContributors403 = RenderErrorResponse
export const GetRuleHistoryTopContributors403 = RenderErrorResponse
export type GetRuleHistoryTopContributors500 = RenderErrorResponse
export const GetRuleHistoryTopContributors500 = RenderErrorResponse
export type TestRuleRequestJson = RuletypesPostableRule
export const TestRuleRequestJson = RuletypesPostableRule
export type TestRule200 = { readonly "data": RuletypesGettableTestRule, readonly "status": string }
export const TestRule200 = Schema.Struct({ "data": RuletypesGettableTestRule, "status": Schema.String })
export type TestRule400 = RenderErrorResponse
export const TestRule400 = RenderErrorResponse
export type TestRule401 = RenderErrorResponse
export const TestRule401 = RenderErrorResponse
export type TestRule403 = RenderErrorResponse
export const TestRule403 = RenderErrorResponse
export type TestRule500 = RenderErrorResponse
export const TestRule500 = RenderErrorResponse
export type DeleteSession400 = RenderErrorResponse
export const DeleteSession400 = RenderErrorResponse
export type DeleteSession401 = RenderErrorResponse
export const DeleteSession401 = RenderErrorResponse
export type DeleteSession403 = RenderErrorResponse
export const DeleteSession403 = RenderErrorResponse
export type DeleteSession500 = RenderErrorResponse
export const DeleteSession500 = RenderErrorResponse
export type GetSessionContext200 = { readonly "data": AuthtypesSessionContext, readonly "status": string }
export const GetSessionContext200 = Schema.Struct({ "data": AuthtypesSessionContext, "status": Schema.String })
export type GetSessionContext400 = RenderErrorResponse
export const GetSessionContext400 = RenderErrorResponse
export type GetSessionContext500 = RenderErrorResponse
export const GetSessionContext500 = RenderErrorResponse
export type CreateSessionByEmailPasswordRequestJson = AuthtypesPostableEmailPasswordSession
export const CreateSessionByEmailPasswordRequestJson = AuthtypesPostableEmailPasswordSession
export type CreateSessionByEmailPassword200 = { readonly "data": AuthtypesGettableToken, readonly "status": string }
export const CreateSessionByEmailPassword200 = Schema.Struct({ "data": AuthtypesGettableToken, "status": Schema.String })
export type CreateSessionByEmailPassword400 = RenderErrorResponse
export const CreateSessionByEmailPassword400 = RenderErrorResponse
export type CreateSessionByEmailPassword404 = RenderErrorResponse
export const CreateSessionByEmailPassword404 = RenderErrorResponse
export type CreateSessionByEmailPassword500 = RenderErrorResponse
export const CreateSessionByEmailPassword500 = RenderErrorResponse
export type RotateSessionRequestJson = AuthtypesPostableRotateToken
export const RotateSessionRequestJson = AuthtypesPostableRotateToken
export type RotateSession200 = { readonly "data": AuthtypesGettableToken, readonly "status": string }
export const RotateSession200 = Schema.Struct({ "data": AuthtypesGettableToken, "status": Schema.String })
export type RotateSession400 = RenderErrorResponse
export const RotateSession400 = RenderErrorResponse
export type RotateSession500 = RenderErrorResponse
export const RotateSession500 = RenderErrorResponse
export type CreateUserRoleRequestJson = AuthtypesPostableUserRole
export const CreateUserRoleRequestJson = AuthtypesPostableUserRole
export type CreateUserRole201 = { readonly "data": TypesIdentifiable, readonly "status": string }
export const CreateUserRole201 = Schema.Struct({ "data": TypesIdentifiable, "status": Schema.String })
export type CreateUserRole400 = RenderErrorResponse
export const CreateUserRole400 = RenderErrorResponse
export type CreateUserRole401 = RenderErrorResponse
export const CreateUserRole401 = RenderErrorResponse
export type CreateUserRole403 = RenderErrorResponse
export const CreateUserRole403 = RenderErrorResponse
export type CreateUserRole404 = RenderErrorResponse
export const CreateUserRole404 = RenderErrorResponse
export type CreateUserRole500 = RenderErrorResponse
export const CreateUserRole500 = RenderErrorResponse
export type GetUserRole200 = { readonly "data": AuthtypesUserRole, readonly "status": string }
export const GetUserRole200 = Schema.Struct({ "data": AuthtypesUserRole, "status": Schema.String })
export type GetUserRole400 = RenderErrorResponse
export const GetUserRole400 = RenderErrorResponse
export type GetUserRole401 = RenderErrorResponse
export const GetUserRole401 = RenderErrorResponse
export type GetUserRole403 = RenderErrorResponse
export const GetUserRole403 = RenderErrorResponse
export type GetUserRole404 = RenderErrorResponse
export const GetUserRole404 = RenderErrorResponse
export type GetUserRole500 = RenderErrorResponse
export const GetUserRole500 = RenderErrorResponse
export type DeleteUserRole400 = RenderErrorResponse
export const DeleteUserRole400 = RenderErrorResponse
export type DeleteUserRole401 = RenderErrorResponse
export const DeleteUserRole401 = RenderErrorResponse
export type DeleteUserRole403 = RenderErrorResponse
export const DeleteUserRole403 = RenderErrorResponse
export type DeleteUserRole404 = RenderErrorResponse
export const DeleteUserRole404 = RenderErrorResponse
export type DeleteUserRole500 = RenderErrorResponse
export const DeleteUserRole500 = RenderErrorResponse
export type ListUsers200 = { readonly "data": ReadonlyArray<TypesUser>, readonly "status": string }
export const ListUsers200 = Schema.Struct({ "data": Schema.Array(TypesUser), "status": Schema.String })
export type ListUsers401 = RenderErrorResponse
export const ListUsers401 = RenderErrorResponse
export type ListUsers403 = RenderErrorResponse
export const ListUsers403 = RenderErrorResponse
export type ListUsers500 = RenderErrorResponse
export const ListUsers500 = RenderErrorResponse
export type CreateUserRequestJson = AuthtypesPostableUser
export const CreateUserRequestJson = AuthtypesPostableUser
export type CreateUser201 = { readonly "data": TypesIdentifiable, readonly "status": string }
export const CreateUser201 = Schema.Struct({ "data": TypesIdentifiable, "status": Schema.String })
export type CreateUser400 = RenderErrorResponse
export const CreateUser400 = RenderErrorResponse
export type CreateUser401 = RenderErrorResponse
export const CreateUser401 = RenderErrorResponse
export type CreateUser403 = RenderErrorResponse
export const CreateUser403 = RenderErrorResponse
export type CreateUser409 = RenderErrorResponse
export const CreateUser409 = RenderErrorResponse
export type CreateUser500 = RenderErrorResponse
export const CreateUser500 = RenderErrorResponse
export type GetUser200 = { readonly "data": AuthtypesUserWithRoles, readonly "status": string }
export const GetUser200 = Schema.Struct({ "data": AuthtypesUserWithRoles, "status": Schema.String })
export type GetUser401 = RenderErrorResponse
export const GetUser401 = RenderErrorResponse
export type GetUser403 = RenderErrorResponse
export const GetUser403 = RenderErrorResponse
export type GetUser404 = RenderErrorResponse
export const GetUser404 = RenderErrorResponse
export type GetUser500 = RenderErrorResponse
export const GetUser500 = RenderErrorResponse
export type UpdateUserRequestJson = TypesUpdatableUser
export const UpdateUserRequestJson = TypesUpdatableUser
export type UpdateUser400 = RenderErrorResponse
export const UpdateUser400 = RenderErrorResponse
export type UpdateUser401 = RenderErrorResponse
export const UpdateUser401 = RenderErrorResponse
export type UpdateUser403 = RenderErrorResponse
export const UpdateUser403 = RenderErrorResponse
export type UpdateUser404 = RenderErrorResponse
export const UpdateUser404 = RenderErrorResponse
export type UpdateUser500 = RenderErrorResponse
export const UpdateUser500 = RenderErrorResponse
export type DeleteUser401 = RenderErrorResponse
export const DeleteUser401 = RenderErrorResponse
export type DeleteUser403 = RenderErrorResponse
export const DeleteUser403 = RenderErrorResponse
export type DeleteUser404 = RenderErrorResponse
export const DeleteUser404 = RenderErrorResponse
export type DeleteUser500 = RenderErrorResponse
export const DeleteUser500 = RenderErrorResponse
export type GetResetPasswordToken200 = { readonly "data": TypesResetPasswordToken, readonly "status": string }
export const GetResetPasswordToken200 = Schema.Struct({ "data": TypesResetPasswordToken, "status": Schema.String })
export type GetResetPasswordToken401 = RenderErrorResponse
export const GetResetPasswordToken401 = RenderErrorResponse
export type GetResetPasswordToken403 = RenderErrorResponse
export const GetResetPasswordToken403 = RenderErrorResponse
export type GetResetPasswordToken404 = RenderErrorResponse
export const GetResetPasswordToken404 = RenderErrorResponse
export type GetResetPasswordToken500 = RenderErrorResponse
export const GetResetPasswordToken500 = RenderErrorResponse
export type CreateResetPasswordToken201 = { readonly "data": TypesResetPasswordToken, readonly "status": string }
export const CreateResetPasswordToken201 = Schema.Struct({ "data": TypesResetPasswordToken, "status": Schema.String })
export type CreateResetPasswordToken400 = RenderErrorResponse
export const CreateResetPasswordToken400 = RenderErrorResponse
export type CreateResetPasswordToken401 = RenderErrorResponse
export const CreateResetPasswordToken401 = RenderErrorResponse
export type CreateResetPasswordToken403 = RenderErrorResponse
export const CreateResetPasswordToken403 = RenderErrorResponse
export type CreateResetPasswordToken404 = RenderErrorResponse
export const CreateResetPasswordToken404 = RenderErrorResponse
export type CreateResetPasswordToken500 = RenderErrorResponse
export const CreateResetPasswordToken500 = RenderErrorResponse
export type GetRolesByUserID200 = { readonly "data": ReadonlyArray<AuthtypesRole>, readonly "status": string }
export const GetRolesByUserID200 = Schema.Struct({ "data": Schema.Array(AuthtypesRole), "status": Schema.String })
export type GetRolesByUserID401 = RenderErrorResponse
export const GetRolesByUserID401 = RenderErrorResponse
export type GetRolesByUserID403 = RenderErrorResponse
export const GetRolesByUserID403 = RenderErrorResponse
export type GetRolesByUserID404 = RenderErrorResponse
export const GetRolesByUserID404 = RenderErrorResponse
export type GetRolesByUserID500 = RenderErrorResponse
export const GetRolesByUserID500 = RenderErrorResponse
export type SetRoleByUserIDRequestJson = TypesPostableRole
export const SetRoleByUserIDRequestJson = TypesPostableRole
export type SetRoleByUserID401 = RenderErrorResponse
export const SetRoleByUserID401 = RenderErrorResponse
export type SetRoleByUserID403 = RenderErrorResponse
export const SetRoleByUserID403 = RenderErrorResponse
export type SetRoleByUserID404 = RenderErrorResponse
export const SetRoleByUserID404 = RenderErrorResponse
export type SetRoleByUserID500 = RenderErrorResponse
export const SetRoleByUserID500 = RenderErrorResponse
export type RemoveUserRoleByUserIDAndRoleID401 = RenderErrorResponse
export const RemoveUserRoleByUserIDAndRoleID401 = RenderErrorResponse
export type RemoveUserRoleByUserIDAndRoleID403 = RenderErrorResponse
export const RemoveUserRoleByUserIDAndRoleID403 = RenderErrorResponse
export type RemoveUserRoleByUserIDAndRoleID404 = RenderErrorResponse
export const RemoveUserRoleByUserIDAndRoleID404 = RenderErrorResponse
export type RemoveUserRoleByUserIDAndRoleID500 = RenderErrorResponse
export const RemoveUserRoleByUserIDAndRoleID500 = RenderErrorResponse
export type GetMyUser200 = { readonly "data": AuthtypesUserWithRoles, readonly "status": string }
export const GetMyUser200 = Schema.Struct({ "data": AuthtypesUserWithRoles, "status": Schema.String })
export type GetMyUser401 = RenderErrorResponse
export const GetMyUser401 = RenderErrorResponse
export type GetMyUser403 = RenderErrorResponse
export const GetMyUser403 = RenderErrorResponse
export type GetMyUser500 = RenderErrorResponse
export const GetMyUser500 = RenderErrorResponse
export type UpdateMyUserV2RequestJson = TypesUpdatableUser
export const UpdateMyUserV2RequestJson = TypesUpdatableUser
export type UpdateMyUserV2401 = RenderErrorResponse
export const UpdateMyUserV2401 = RenderErrorResponse
export type UpdateMyUserV2403 = RenderErrorResponse
export const UpdateMyUserV2403 = RenderErrorResponse
export type UpdateMyUserV2500 = RenderErrorResponse
export const UpdateMyUserV2500 = RenderErrorResponse
export type ListDashboardsForUserV2Params = { readonly "query"?: string, readonly "sort"?: DashboardtypesListSort, readonly "order"?: DashboardtypesListOrder, readonly "limit"?: number, readonly "offset"?: number }
export const ListDashboardsForUserV2Params = Schema.Struct({ "query": Schema.optionalKey(Schema.String), "sort": Schema.optionalKey(DashboardtypesListSort), "order": Schema.optionalKey(DashboardtypesListOrder), "limit": Schema.optionalKey(Schema.Number.check(Schema.isInt())), "offset": Schema.optionalKey(Schema.Number.check(Schema.isInt())) })
export type ListDashboardsForUserV2200 = { readonly "data": DashboardtypesListableDashboardForUserV2, readonly "status": string }
export const ListDashboardsForUserV2200 = Schema.Struct({ "data": DashboardtypesListableDashboardForUserV2, "status": Schema.String })
export type ListDashboardsForUserV2400 = RenderErrorResponse
export const ListDashboardsForUserV2400 = RenderErrorResponse
export type ListDashboardsForUserV2401 = RenderErrorResponse
export const ListDashboardsForUserV2401 = RenderErrorResponse
export type ListDashboardsForUserV2403 = RenderErrorResponse
export const ListDashboardsForUserV2403 = RenderErrorResponse
export type ListDashboardsForUserV2500 = RenderErrorResponse
export const ListDashboardsForUserV2500 = RenderErrorResponse
export type PinDashboardV2400 = RenderErrorResponse
export const PinDashboardV2400 = RenderErrorResponse
export type PinDashboardV2401 = RenderErrorResponse
export const PinDashboardV2401 = RenderErrorResponse
export type PinDashboardV2403 = RenderErrorResponse
export const PinDashboardV2403 = RenderErrorResponse
export type PinDashboardV2404 = RenderErrorResponse
export const PinDashboardV2404 = RenderErrorResponse
export type PinDashboardV2409 = RenderErrorResponse
export const PinDashboardV2409 = RenderErrorResponse
export type PinDashboardV2500 = RenderErrorResponse
export const PinDashboardV2500 = RenderErrorResponse
export type UnpinDashboardV2400 = RenderErrorResponse
export const UnpinDashboardV2400 = RenderErrorResponse
export type UnpinDashboardV2401 = RenderErrorResponse
export const UnpinDashboardV2401 = RenderErrorResponse
export type UnpinDashboardV2403 = RenderErrorResponse
export const UnpinDashboardV2403 = RenderErrorResponse
export type UnpinDashboardV2500 = RenderErrorResponse
export const UnpinDashboardV2500 = RenderErrorResponse
export type UpdateMyPasswordRequestJson = TypesChangePasswordRequest
export const UpdateMyPasswordRequestJson = TypesChangePasswordRequest
export type UpdateMyPassword400 = RenderErrorResponse
export const UpdateMyPassword400 = RenderErrorResponse
export type UpdateMyPassword401 = RenderErrorResponse
export const UpdateMyPassword401 = RenderErrorResponse
export type UpdateMyPassword403 = RenderErrorResponse
export const UpdateMyPassword403 = RenderErrorResponse
export type UpdateMyPassword404 = RenderErrorResponse
export const UpdateMyPassword404 = RenderErrorResponse
export type UpdateMyPassword500 = RenderErrorResponse
export const UpdateMyPassword500 = RenderErrorResponse
export type GetHosts200 = { readonly "data": ZeustypesGettableHost, readonly "status": string }
export const GetHosts200 = Schema.Struct({ "data": ZeustypesGettableHost, "status": Schema.String })
export type GetHosts400 = RenderErrorResponse
export const GetHosts400 = RenderErrorResponse
export type GetHosts401 = RenderErrorResponse
export const GetHosts401 = RenderErrorResponse
export type GetHosts403 = RenderErrorResponse
export const GetHosts403 = RenderErrorResponse
export type GetHosts404 = RenderErrorResponse
export const GetHosts404 = RenderErrorResponse
export type GetHosts500 = RenderErrorResponse
export const GetHosts500 = RenderErrorResponse
export type PutHostRequestJson = ZeustypesPostableHost
export const PutHostRequestJson = ZeustypesPostableHost
export type PutHost400 = RenderErrorResponse
export const PutHost400 = RenderErrorResponse
export type PutHost401 = RenderErrorResponse
export const PutHost401 = RenderErrorResponse
export type PutHost403 = RenderErrorResponse
export const PutHost403 = RenderErrorResponse
export type PutHost404 = RenderErrorResponse
export const PutHost404 = RenderErrorResponse
export type PutHost409 = RenderErrorResponse
export const PutHost409 = RenderErrorResponse
export type PutHost500 = RenderErrorResponse
export const PutHost500 = RenderErrorResponse
export type PutProfileRequestJson = ZeustypesPostableProfile
export const PutProfileRequestJson = ZeustypesPostableProfile
export type PutProfile400 = RenderErrorResponse
export const PutProfile400 = RenderErrorResponse
export type PutProfile401 = RenderErrorResponse
export const PutProfile401 = RenderErrorResponse
export type PutProfile403 = RenderErrorResponse
export const PutProfile403 = RenderErrorResponse
export type PutProfile404 = RenderErrorResponse
export const PutProfile404 = RenderErrorResponse
export type PutProfile409 = RenderErrorResponse
export const PutProfile409 = RenderErrorResponse
export type PutProfile500 = RenderErrorResponse
export const PutProfile500 = RenderErrorResponse
export type GetMetricDashboardsV2Params = { readonly "metricName": string }
export const GetMetricDashboardsV2Params = Schema.Struct({ "metricName": Schema.String.annotate({ "description": "The name of the metric. May contain slashes (e.g. cloud-provider metrics like run.googleapis.com/request_latencies)." }) })
export type GetMetricDashboardsV2200 = { readonly "data": MetricsexplorertypesMetricDashboardPanelsResponse, readonly "status": string }
export const GetMetricDashboardsV2200 = Schema.Struct({ "data": MetricsexplorertypesMetricDashboardPanelsResponse, "status": Schema.String })
export type GetMetricDashboardsV2400 = RenderErrorResponse
export const GetMetricDashboardsV2400 = RenderErrorResponse
export type GetMetricDashboardsV2401 = RenderErrorResponse
export const GetMetricDashboardsV2401 = RenderErrorResponse
export type GetMetricDashboardsV2403 = RenderErrorResponse
export const GetMetricDashboardsV2403 = RenderErrorResponse
export type GetMetricDashboardsV2404 = RenderErrorResponse
export const GetMetricDashboardsV2404 = RenderErrorResponse
export type GetMetricDashboardsV2500 = RenderErrorResponse
export const GetMetricDashboardsV2500 = RenderErrorResponse
export type GetFlamegraphRequestJson = SpantypesPostableFlamegraph
export const GetFlamegraphRequestJson = SpantypesPostableFlamegraph
export type GetFlamegraph200 = { readonly "data": SpantypesGettableFlamegraphTrace, readonly "status": string }
export const GetFlamegraph200 = Schema.Struct({ "data": SpantypesGettableFlamegraphTrace, "status": Schema.String })
export type GetFlamegraph400 = RenderErrorResponse
export const GetFlamegraph400 = RenderErrorResponse
export type GetFlamegraph401 = RenderErrorResponse
export const GetFlamegraph401 = RenderErrorResponse
export type GetFlamegraph403 = RenderErrorResponse
export const GetFlamegraph403 = RenderErrorResponse
export type GetFlamegraph404 = RenderErrorResponse
export const GetFlamegraph404 = RenderErrorResponse
export type GetFlamegraph500 = RenderErrorResponse
export const GetFlamegraph500 = RenderErrorResponse
export type GetWaterfallV4RequestJson = SpantypesPostableWaterfall
export const GetWaterfallV4RequestJson = SpantypesPostableWaterfall
export type GetWaterfallV4200 = { readonly "data": SpantypesGettableWaterfallTrace, readonly "status": string }
export const GetWaterfallV4200 = Schema.Struct({ "data": SpantypesGettableWaterfallTrace, "status": Schema.String })
export type GetWaterfallV4400 = RenderErrorResponse
export const GetWaterfallV4400 = RenderErrorResponse
export type GetWaterfallV4401 = RenderErrorResponse
export const GetWaterfallV4401 = RenderErrorResponse
export type GetWaterfallV4403 = RenderErrorResponse
export const GetWaterfallV4403 = RenderErrorResponse
export type GetWaterfallV4404 = RenderErrorResponse
export const GetWaterfallV4404 = RenderErrorResponse
export type GetWaterfallV4500 = RenderErrorResponse
export const GetWaterfallV4500 = RenderErrorResponse
export type QueryRangeV5RequestJson = Querybuildertypesv5QueryRangeRequest
export const QueryRangeV5RequestJson = Querybuildertypesv5QueryRangeRequest
export type QueryRangeV5200 = { readonly "data": Querybuildertypesv5QueryRangeResponse, readonly "status": string }
export const QueryRangeV5200 = Schema.Struct({ "data": Querybuildertypesv5QueryRangeResponse, "status": Schema.String })
export type QueryRangeV5400 = RenderErrorResponse
export const QueryRangeV5400 = RenderErrorResponse
export type QueryRangeV5401 = RenderErrorResponse
export const QueryRangeV5401 = RenderErrorResponse
export type QueryRangeV5403 = RenderErrorResponse
export const QueryRangeV5403 = RenderErrorResponse
export type QueryRangeV5500 = RenderErrorResponse
export const QueryRangeV5500 = RenderErrorResponse
export type QueryRangePreviewV5Params = { readonly "verbose"?: string }
export const QueryRangePreviewV5Params = Schema.Struct({ "verbose": Schema.optionalKey(Schema.String) })
export type QueryRangePreviewV5RequestJson = Querybuildertypesv5QueryRangeRequest
export const QueryRangePreviewV5RequestJson = Querybuildertypesv5QueryRangeRequest
export type QueryRangePreviewV5200 = { readonly "data": Querybuildertypesv5QueryRangePreviewResponse, readonly "status": string }
export const QueryRangePreviewV5200 = Schema.Struct({ "data": Querybuildertypesv5QueryRangePreviewResponse, "status": Schema.String })
export type QueryRangePreviewV5400 = RenderErrorResponse
export const QueryRangePreviewV5400 = RenderErrorResponse
export type QueryRangePreviewV5401 = RenderErrorResponse
export const QueryRangePreviewV5401 = RenderErrorResponse
export type QueryRangePreviewV5403 = RenderErrorResponse
export const QueryRangePreviewV5403 = RenderErrorResponse
export type QueryRangePreviewV5500 = RenderErrorResponse
export const QueryRangePreviewV5500 = RenderErrorResponse
export type ReplaceVariablesRequestJson = Querybuildertypesv5QueryRangeRequest
export const ReplaceVariablesRequestJson = Querybuildertypesv5QueryRangeRequest
export type ReplaceVariables200 = { readonly "data": Querybuildertypesv5QueryRangeRequest, readonly "status": string }
export const ReplaceVariables200 = Schema.Struct({ "data": Querybuildertypesv5QueryRangeRequest, "status": Schema.String })
export type ReplaceVariables400 = RenderErrorResponse
export const ReplaceVariables400 = RenderErrorResponse
export type ReplaceVariables401 = RenderErrorResponse
export const ReplaceVariables401 = RenderErrorResponse
export type ReplaceVariables403 = RenderErrorResponse
export const ReplaceVariables403 = RenderErrorResponse
export type ReplaceVariables500 = RenderErrorResponse
export const ReplaceVariables500 = RenderErrorResponse

export interface OperationConfig {
  /**
   * Whether or not the response should be included in the value returned from
   * an operation.
   *
   * If set to `true`, a tuple of `[A, HttpClientResponse]` will be returned,
   * where `A` is the success type of the operation.
   *
   * If set to `false`, only the success type of the operation will be returned.
   */
  readonly includeResponse?: boolean | undefined
}

/**
 * A utility type which optionally includes the response in the return result
 * of an operation based upon the value of the `includeResponse` configuration
 * option.
 */
export type WithOptionalResponse<A, Config extends OperationConfig> = Config extends {
  readonly includeResponse: true
} ? [A, HttpClientResponse.HttpClientResponse] : A

export const make = (
  httpClient: HttpClient.HttpClient,
  options: {
    readonly transformClient?: ((client: HttpClient.HttpClient) => Effect.Effect<HttpClient.HttpClient>) | undefined
  } = {}
): SigNoz => {
  const unexpectedStatus = (response: HttpClientResponse.HttpClientResponse) =>
    Effect.flatMap(
      Effect.orElseSucceed(response.json, () => "Unexpected status code"),
      (description) =>
        Effect.fail(
          new HttpClientError.HttpClientError({
            reason: new HttpClientError.StatusCodeError({
              request: response.request,
              response,
              description: typeof description === "string" ? description : JSON.stringify(description),
            }),
          }),
        ),
    )
  const withResponse = <Config extends OperationConfig>(config: Config | undefined) => (
    f: (response: HttpClientResponse.HttpClientResponse) => Effect.Effect<any, any>,
  ): (request: HttpClientRequest.HttpClientRequest) => Effect.Effect<any, any> => {
    const withOptionalResponse = (
      config?.includeResponse
        ? (response: HttpClientResponse.HttpClientResponse) => Effect.map(f(response), (a) => [a, response])
        : (response: HttpClientResponse.HttpClientResponse) => f(response)
    ) as any
    return options?.transformClient
      ? (request) =>
          Effect.flatMap(
            Effect.flatMap(options.transformClient!(httpClient), (client) => client.execute(request)),
            withOptionalResponse
          )
      : (request) => Effect.flatMap(httpClient.execute(request), withOptionalResponse)
  }
  const decodeSuccess =
    <Schema extends Schema.Constraint>(schema: Schema) =>
    (response: HttpClientResponse.HttpClientResponse) =>
      HttpClientResponse.schemaBodyJson(schema)(response)
  const decodeError =
    <const Tag extends string, Schema extends Schema.Constraint>(tag: Tag, schema: Schema) =>
    (response: HttpClientResponse.HttpClientResponse) =>
      Effect.flatMap(
        HttpClientResponse.schemaBodyJson(schema)(response),
        (cause) => Effect.fail(SigNozError(tag, cause, response)),
      )
  return {
    httpClient,
    "GetAlerts": (options) => HttpClientRequest.get(`/api/v1/alerts`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetAlerts200),
      "401": decodeError("GetAlerts401", GetAlerts401),
      "403": decodeError("GetAlerts403", GetAlerts403),
      "500": decodeError("GetAlerts500", GetAlerts500),
      orElse: unexpectedStatus
    }))
  ),
    "AuthzCheck": (options) => HttpClientRequest.post(`/api/v1/authz/check`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(AuthzCheck200),
      "500": decodeError("AuthzCheck500", AuthzCheck500),
      orElse: unexpectedStatus
    }))
  ),
    "ListChannels": (options) => HttpClientRequest.get(`/api/v1/channels`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListChannels200),
      "401": decodeError("ListChannels401", ListChannels401),
      "403": decodeError("ListChannels403", ListChannels403),
      "500": decodeError("ListChannels500", ListChannels500),
      orElse: unexpectedStatus
    }))
  ),
    "CreateChannel": (options) => HttpClientRequest.post(`/api/v1/channels`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreateChannel201),
      "400": decodeError("CreateChannel400", CreateChannel400),
      "401": decodeError("CreateChannel401", CreateChannel401),
      "403": decodeError("CreateChannel403", CreateChannel403),
      "500": decodeError("CreateChannel500", CreateChannel500),
      orElse: unexpectedStatus
    }))
  ),
    "GetChannelByID": (id, options) => HttpClientRequest.get(`/api/v1/channels/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetChannelByID200),
      "401": decodeError("GetChannelByID401", GetChannelByID401),
      "403": decodeError("GetChannelByID403", GetChannelByID403),
      "404": decodeError("GetChannelByID404", GetChannelByID404),
      "500": decodeError("GetChannelByID500", GetChannelByID500),
      orElse: unexpectedStatus
    }))
  ),
    "UpdateChannelByID": (id, options) => HttpClientRequest.put(`/api/v1/channels/${id}`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("UpdateChannelByID400", UpdateChannelByID400),
      "401": decodeError("UpdateChannelByID401", UpdateChannelByID401),
      "403": decodeError("UpdateChannelByID403", UpdateChannelByID403),
      "404": decodeError("UpdateChannelByID404", UpdateChannelByID404),
      "500": decodeError("UpdateChannelByID500", UpdateChannelByID500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "DeleteChannelByID": (id, options) => HttpClientRequest.delete(`/api/v1/channels/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "401": decodeError("DeleteChannelByID401", DeleteChannelByID401),
      "403": decodeError("DeleteChannelByID403", DeleteChannelByID403),
      "404": decodeError("DeleteChannelByID404", DeleteChannelByID404),
      "500": decodeError("DeleteChannelByID500", DeleteChannelByID500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "TestChannel": (options) => HttpClientRequest.post(`/api/v1/channels/test`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("TestChannel400", TestChannel400),
      "401": decodeError("TestChannel401", TestChannel401),
      "403": decodeError("TestChannel403", TestChannel403),
      "500": decodeError("TestChannel500", TestChannel500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "AgentCheckInDeprecated": (cloudProvider, options) => HttpClientRequest.post(`/api/v1/cloud-integrations/${cloudProvider}/agent-check-in`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(AgentCheckInDeprecated200),
      "401": decodeError("AgentCheckInDeprecated401", AgentCheckInDeprecated401),
      "403": decodeError("AgentCheckInDeprecated403", AgentCheckInDeprecated403),
      "500": decodeError("AgentCheckInDeprecated500", AgentCheckInDeprecated500),
      orElse: unexpectedStatus
    }))
  ),
    "ListAccounts": (cloudProvider, options) => HttpClientRequest.get(`/api/v1/cloud_integrations/${cloudProvider}/accounts`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListAccounts200),
      "401": decodeError("ListAccounts401", ListAccounts401),
      "403": decodeError("ListAccounts403", ListAccounts403),
      "500": decodeError("ListAccounts500", ListAccounts500),
      orElse: unexpectedStatus
    }))
  ),
    "CreateAccount": (cloudProvider, options) => HttpClientRequest.post(`/api/v1/cloud_integrations/${cloudProvider}/accounts`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreateAccount201),
      "401": decodeError("CreateAccount401", CreateAccount401),
      "403": decodeError("CreateAccount403", CreateAccount403),
      "500": decodeError("CreateAccount500", CreateAccount500),
      orElse: unexpectedStatus
    }))
  ),
    "GetAccount": (cloudProvider, id, options) => HttpClientRequest.get(`/api/v1/cloud_integrations/${cloudProvider}/accounts/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetAccount200),
      "400": decodeError("GetAccount400", GetAccount400),
      "401": decodeError("GetAccount401", GetAccount401),
      "403": decodeError("GetAccount403", GetAccount403),
      "404": decodeError("GetAccount404", GetAccount404),
      "500": decodeError("GetAccount500", GetAccount500),
      orElse: unexpectedStatus
    }))
  ),
    "UpdateAccount": (cloudProvider, id, options) => HttpClientRequest.put(`/api/v1/cloud_integrations/${cloudProvider}/accounts/${id}`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "401": decodeError("UpdateAccount401", UpdateAccount401),
      "403": decodeError("UpdateAccount403", UpdateAccount403),
      "500": decodeError("UpdateAccount500", UpdateAccount500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "DisconnectAccount": (cloudProvider, id, options) => HttpClientRequest.delete(`/api/v1/cloud_integrations/${cloudProvider}/accounts/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "401": decodeError("DisconnectAccount401", DisconnectAccount401),
      "403": decodeError("DisconnectAccount403", DisconnectAccount403),
      "500": decodeError("DisconnectAccount500", DisconnectAccount500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "ListAccountServicesMetadata": (cloudProvider, id, options) => HttpClientRequest.get(`/api/v1/cloud_integrations/${cloudProvider}/accounts/${id}/services`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListAccountServicesMetadata200),
      "401": decodeError("ListAccountServicesMetadata401", ListAccountServicesMetadata401),
      "403": decodeError("ListAccountServicesMetadata403", ListAccountServicesMetadata403),
      "500": decodeError("ListAccountServicesMetadata500", ListAccountServicesMetadata500),
      orElse: unexpectedStatus
    }))
  ),
    "GetAccountService": (cloudProvider, id, serviceId, options) => HttpClientRequest.get(`/api/v1/cloud_integrations/${cloudProvider}/accounts/${id}/services/${serviceId}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetAccountService200),
      "400": decodeError("GetAccountService400", GetAccountService400),
      "401": decodeError("GetAccountService401", GetAccountService401),
      "403": decodeError("GetAccountService403", GetAccountService403),
      "404": decodeError("GetAccountService404", GetAccountService404),
      "500": decodeError("GetAccountService500", GetAccountService500),
      orElse: unexpectedStatus
    }))
  ),
    "UpdateService": (cloudProvider, id, serviceId, options) => HttpClientRequest.put(`/api/v1/cloud_integrations/${cloudProvider}/accounts/${id}/services/${serviceId}`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "401": decodeError("UpdateService401", UpdateService401),
      "403": decodeError("UpdateService403", UpdateService403),
      "500": decodeError("UpdateService500", UpdateService500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "AgentCheckIn": (cloudProvider, options) => HttpClientRequest.post(`/api/v1/cloud_integrations/${cloudProvider}/accounts/check_in`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(AgentCheckIn200),
      "401": decodeError("AgentCheckIn401", AgentCheckIn401),
      "403": decodeError("AgentCheckIn403", AgentCheckIn403),
      "500": decodeError("AgentCheckIn500", AgentCheckIn500),
      orElse: unexpectedStatus
    }))
  ),
    "GetConnectionCredentials": (cloudProvider, options) => HttpClientRequest.get(`/api/v1/cloud_integrations/${cloudProvider}/credentials`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetConnectionCredentials200),
      "401": decodeError("GetConnectionCredentials401", GetConnectionCredentials401),
      "403": decodeError("GetConnectionCredentials403", GetConnectionCredentials403),
      "500": decodeError("GetConnectionCredentials500", GetConnectionCredentials500),
      orElse: unexpectedStatus
    }))
  ),
    "ListServicesMetadata": (cloudProvider, options) => HttpClientRequest.get(`/api/v1/cloud_integrations/${cloudProvider}/services`).pipe(
    HttpClientRequest.setUrlParams({ "cloud_integration_id": options?.params?.["cloud_integration_id"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListServicesMetadata200),
      "401": decodeError("ListServicesMetadata401", ListServicesMetadata401),
      "403": decodeError("ListServicesMetadata403", ListServicesMetadata403),
      "500": decodeError("ListServicesMetadata500", ListServicesMetadata500),
      orElse: unexpectedStatus
    }))
  ),
    "GetService": (cloudProvider, serviceId, options) => HttpClientRequest.get(`/api/v1/cloud_integrations/${cloudProvider}/services/${serviceId}`).pipe(
    HttpClientRequest.setUrlParams({ "cloud_integration_id": options?.params?.["cloud_integration_id"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetService200),
      "401": decodeError("GetService401", GetService401),
      "403": decodeError("GetService403", GetService403),
      "500": decodeError("GetService500", GetService500),
      orElse: unexpectedStatus
    }))
  ),
    "CreateSessionByGoogleCallback": (options) => HttpClientRequest.get(`/api/v1/complete/google`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "303": decodeSuccess(CreateSessionByGoogleCallback303),
      "400": decodeError("CreateSessionByGoogleCallback400", CreateSessionByGoogleCallback400),
      "404": decodeError("CreateSessionByGoogleCallback404", CreateSessionByGoogleCallback404),
      "500": decodeError("CreateSessionByGoogleCallback500", CreateSessionByGoogleCallback500),
      orElse: unexpectedStatus
    }))
  ),
    "CreateSessionByOIDCCallback": (options) => HttpClientRequest.get(`/api/v1/complete/oidc`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "303": decodeSuccess(CreateSessionByOIDCCallback303),
      "400": decodeError("CreateSessionByOIDCCallback400", CreateSessionByOIDCCallback400),
      "404": decodeError("CreateSessionByOIDCCallback404", CreateSessionByOIDCCallback404),
      "451": decodeError("CreateSessionByOIDCCallback451", CreateSessionByOIDCCallback451),
      "500": decodeError("CreateSessionByOIDCCallback500", CreateSessionByOIDCCallback500),
      orElse: unexpectedStatus
    }))
  ),
    "CreateSessionBySAMLCallback": (options) => HttpClientRequest.post(`/api/v1/complete/saml`).pipe(
    HttpClientRequest.setUrlParams({ "RelayState": options.params?.["RelayState"] as any, "SAMLResponse": options.params?.["SAMLResponse"] as any }),
    HttpClientRequest.bodyUrlParams(options.payload as any),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "303": decodeSuccess(CreateSessionBySAMLCallback303),
      "400": decodeError("CreateSessionBySAMLCallback400", CreateSessionBySAMLCallback400),
      "404": decodeError("CreateSessionBySAMLCallback404", CreateSessionBySAMLCallback404),
      "451": decodeError("CreateSessionBySAMLCallback451", CreateSessionBySAMLCallback451),
      "500": decodeError("CreateSessionBySAMLCallback500", CreateSessionBySAMLCallback500),
      orElse: unexpectedStatus
    }))
  ),
    "GetPublicDashboard": (id, options) => HttpClientRequest.get(`/api/v1/dashboards/${id}/public`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetPublicDashboard200),
      "401": decodeError("GetPublicDashboard401", GetPublicDashboard401),
      "403": decodeError("GetPublicDashboard403", GetPublicDashboard403),
      "500": decodeError("GetPublicDashboard500", GetPublicDashboard500),
      orElse: unexpectedStatus
    }))
  ),
    "UpdatePublicDashboard": (id, options) => HttpClientRequest.put(`/api/v1/dashboards/${id}/public`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "401": decodeError("UpdatePublicDashboard401", UpdatePublicDashboard401),
      "403": decodeError("UpdatePublicDashboard403", UpdatePublicDashboard403),
      "500": decodeError("UpdatePublicDashboard500", UpdatePublicDashboard500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "CreatePublicDashboard": (id, options) => HttpClientRequest.post(`/api/v1/dashboards/${id}/public`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreatePublicDashboard201),
      "401": decodeError("CreatePublicDashboard401", CreatePublicDashboard401),
      "403": decodeError("CreatePublicDashboard403", CreatePublicDashboard403),
      "500": decodeError("CreatePublicDashboard500", CreatePublicDashboard500),
      orElse: unexpectedStatus
    }))
  ),
    "DeletePublicDashboard": (id, options) => HttpClientRequest.delete(`/api/v1/dashboards/${id}/public`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "401": decodeError("DeletePublicDashboard401", DeletePublicDashboard401),
      "403": decodeError("DeletePublicDashboard403", DeletePublicDashboard403),
      "500": decodeError("DeletePublicDashboard500", DeletePublicDashboard500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "ListAuthDomains": (options) => HttpClientRequest.get(`/api/v1/domains`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListAuthDomains200),
      "401": decodeError("ListAuthDomains401", ListAuthDomains401),
      "403": decodeError("ListAuthDomains403", ListAuthDomains403),
      "500": decodeError("ListAuthDomains500", ListAuthDomains500),
      orElse: unexpectedStatus
    }))
  ),
    "CreateAuthDomain": (options) => HttpClientRequest.post(`/api/v1/domains`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreateAuthDomain201),
      "400": decodeError("CreateAuthDomain400", CreateAuthDomain400),
      "401": decodeError("CreateAuthDomain401", CreateAuthDomain401),
      "403": decodeError("CreateAuthDomain403", CreateAuthDomain403),
      "409": decodeError("CreateAuthDomain409", CreateAuthDomain409),
      "500": decodeError("CreateAuthDomain500", CreateAuthDomain500),
      orElse: unexpectedStatus
    }))
  ),
    "GetAuthDomain": (id, options) => HttpClientRequest.get(`/api/v1/domains/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetAuthDomain200),
      "401": decodeError("GetAuthDomain401", GetAuthDomain401),
      "403": decodeError("GetAuthDomain403", GetAuthDomain403),
      "404": decodeError("GetAuthDomain404", GetAuthDomain404),
      "500": decodeError("GetAuthDomain500", GetAuthDomain500),
      orElse: unexpectedStatus
    }))
  ),
    "UpdateAuthDomain": (id, options) => HttpClientRequest.put(`/api/v1/domains/${id}`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("UpdateAuthDomain400", UpdateAuthDomain400),
      "401": decodeError("UpdateAuthDomain401", UpdateAuthDomain401),
      "403": decodeError("UpdateAuthDomain403", UpdateAuthDomain403),
      "409": decodeError("UpdateAuthDomain409", UpdateAuthDomain409),
      "500": decodeError("UpdateAuthDomain500", UpdateAuthDomain500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "DeleteAuthDomain": (id, options) => HttpClientRequest.delete(`/api/v1/domains/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("DeleteAuthDomain400", DeleteAuthDomain400),
      "401": decodeError("DeleteAuthDomain401", DeleteAuthDomain401),
      "403": decodeError("DeleteAuthDomain403", DeleteAuthDomain403),
      "500": decodeError("DeleteAuthDomain500", DeleteAuthDomain500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "ListDowntimeSchedules": (options) => HttpClientRequest.get(`/api/v1/downtime_schedules`).pipe(
    HttpClientRequest.setUrlParams({ "active": options?.params?.["active"] as any, "recurring": options?.params?.["recurring"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListDowntimeSchedules200),
      "401": decodeError("ListDowntimeSchedules401", ListDowntimeSchedules401),
      "403": decodeError("ListDowntimeSchedules403", ListDowntimeSchedules403),
      "500": decodeError("ListDowntimeSchedules500", ListDowntimeSchedules500),
      orElse: unexpectedStatus
    }))
  ),
    "CreateDowntimeSchedule": (options) => HttpClientRequest.post(`/api/v1/downtime_schedules`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreateDowntimeSchedule201),
      "400": decodeError("CreateDowntimeSchedule400", CreateDowntimeSchedule400),
      "401": decodeError("CreateDowntimeSchedule401", CreateDowntimeSchedule401),
      "403": decodeError("CreateDowntimeSchedule403", CreateDowntimeSchedule403),
      "500": decodeError("CreateDowntimeSchedule500", CreateDowntimeSchedule500),
      orElse: unexpectedStatus
    }))
  ),
    "GetDowntimeScheduleByID": (id, options) => HttpClientRequest.get(`/api/v1/downtime_schedules/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetDowntimeScheduleByID200),
      "401": decodeError("GetDowntimeScheduleByID401", GetDowntimeScheduleByID401),
      "403": decodeError("GetDowntimeScheduleByID403", GetDowntimeScheduleByID403),
      "404": decodeError("GetDowntimeScheduleByID404", GetDowntimeScheduleByID404),
      "500": decodeError("GetDowntimeScheduleByID500", GetDowntimeScheduleByID500),
      orElse: unexpectedStatus
    }))
  ),
    "UpdateDowntimeScheduleByID": (id, options) => HttpClientRequest.put(`/api/v1/downtime_schedules/${id}`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("UpdateDowntimeScheduleByID400", UpdateDowntimeScheduleByID400),
      "401": decodeError("UpdateDowntimeScheduleByID401", UpdateDowntimeScheduleByID401),
      "403": decodeError("UpdateDowntimeScheduleByID403", UpdateDowntimeScheduleByID403),
      "404": decodeError("UpdateDowntimeScheduleByID404", UpdateDowntimeScheduleByID404),
      "500": decodeError("UpdateDowntimeScheduleByID500", UpdateDowntimeScheduleByID500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "DeleteDowntimeScheduleByID": (id, options) => HttpClientRequest.delete(`/api/v1/downtime_schedules/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "401": decodeError("DeleteDowntimeScheduleByID401", DeleteDowntimeScheduleByID401),
      "403": decodeError("DeleteDowntimeScheduleByID403", DeleteDowntimeScheduleByID403),
      "404": decodeError("DeleteDowntimeScheduleByID404", DeleteDowntimeScheduleByID404),
      "500": decodeError("DeleteDowntimeScheduleByID500", DeleteDowntimeScheduleByID500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "HandleExportRawDataPOST": (options) => HttpClientRequest.post(`/api/v1/export_raw_data`).pipe(
    HttpClientRequest.setUrlParams({ "format": options.params?.["format"] as any }),
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("HandleExportRawDataPOST400", HandleExportRawDataPOST400),
      "401": decodeError("HandleExportRawDataPOST401", HandleExportRawDataPOST401),
      "403": decodeError("HandleExportRawDataPOST403", HandleExportRawDataPOST403),
      "500": decodeError("HandleExportRawDataPOST500", HandleExportRawDataPOST500),
      "200": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "GetFieldsKeys": (options) => HttpClientRequest.get(`/api/v1/fields/keys`).pipe(
    HttpClientRequest.setUrlParams({ "signal": options?.params?.["signal"] as any, "source": options?.params?.["source"] as any, "limit": options?.params?.["limit"] as any, "startUnixMilli": options?.params?.["startUnixMilli"] as any, "endUnixMilli": options?.params?.["endUnixMilli"] as any, "fieldContext": options?.params?.["fieldContext"] as any, "fieldDataType": options?.params?.["fieldDataType"] as any, "metricName": options?.params?.["metricName"] as any, "metricNamespace": options?.params?.["metricNamespace"] as any, "searchText": options?.params?.["searchText"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetFieldsKeys200),
      "401": decodeError("GetFieldsKeys401", GetFieldsKeys401),
      "403": decodeError("GetFieldsKeys403", GetFieldsKeys403),
      "500": decodeError("GetFieldsKeys500", GetFieldsKeys500),
      orElse: unexpectedStatus
    }))
  ),
    "GetFieldsValues": (options) => HttpClientRequest.get(`/api/v1/fields/values`).pipe(
    HttpClientRequest.setUrlParams({ "signal": options?.params?.["signal"] as any, "source": options?.params?.["source"] as any, "limit": options?.params?.["limit"] as any, "startUnixMilli": options?.params?.["startUnixMilli"] as any, "endUnixMilli": options?.params?.["endUnixMilli"] as any, "fieldContext": options?.params?.["fieldContext"] as any, "fieldDataType": options?.params?.["fieldDataType"] as any, "metricName": options?.params?.["metricName"] as any, "metricNamespace": options?.params?.["metricNamespace"] as any, "searchText": options?.params?.["searchText"] as any, "name": options?.params?.["name"] as any, "existingQuery": options?.params?.["existingQuery"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetFieldsValues200),
      "401": decodeError("GetFieldsValues401", GetFieldsValues401),
      "403": decodeError("GetFieldsValues403", GetFieldsValues403),
      "500": decodeError("GetFieldsValues500", GetFieldsValues500),
      orElse: unexpectedStatus
    }))
  ),
    "GetResetPasswordTokenDeprecated": (id, options) => HttpClientRequest.get(`/api/v1/getResetPasswordToken/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetResetPasswordTokenDeprecated200),
      "400": decodeError("GetResetPasswordTokenDeprecated400", GetResetPasswordTokenDeprecated400),
      "401": decodeError("GetResetPasswordTokenDeprecated401", GetResetPasswordTokenDeprecated401),
      "403": decodeError("GetResetPasswordTokenDeprecated403", GetResetPasswordTokenDeprecated403),
      "404": decodeError("GetResetPasswordTokenDeprecated404", GetResetPasswordTokenDeprecated404),
      "500": decodeError("GetResetPasswordTokenDeprecated500", GetResetPasswordTokenDeprecated500),
      orElse: unexpectedStatus
    }))
  ),
    "GetGlobalConfig": (options) => HttpClientRequest.get(`/api/v1/global/config`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetGlobalConfig200),
      "500": decodeError("GetGlobalConfig500", GetGlobalConfig500),
      orElse: unexpectedStatus
    }))
  ),
    "CreateInvite": (options) => HttpClientRequest.post(`/api/v1/invite`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreateInvite201),
      "400": decodeError("CreateInvite400", CreateInvite400),
      "401": decodeError("CreateInvite401", CreateInvite401),
      "403": decodeError("CreateInvite403", CreateInvite403),
      "409": decodeError("CreateInvite409", CreateInvite409),
      "500": decodeError("CreateInvite500", CreateInvite500),
      orElse: unexpectedStatus
    }))
  ),
    "CreateBulkInvite": (options) => HttpClientRequest.post(`/api/v1/invite/bulk`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("CreateBulkInvite400", CreateBulkInvite400),
      "401": decodeError("CreateBulkInvite401", CreateBulkInvite401),
      "403": decodeError("CreateBulkInvite403", CreateBulkInvite403),
      "409": decodeError("CreateBulkInvite409", CreateBulkInvite409),
      "500": decodeError("CreateBulkInvite500", CreateBulkInvite500),
      "201": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "ListLLMPricingRules": (options) => HttpClientRequest.get(`/api/v1/llm_pricing_rules`).pipe(
    HttpClientRequest.setUrlParams({ "offset": options?.params?.["offset"] as any, "limit": options?.params?.["limit"] as any, "q": options?.params?.["q"] as any, "isOverride": options?.params?.["isOverride"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListLLMPricingRules200),
      "400": decodeError("ListLLMPricingRules400", ListLLMPricingRules400),
      "401": decodeError("ListLLMPricingRules401", ListLLMPricingRules401),
      "403": decodeError("ListLLMPricingRules403", ListLLMPricingRules403),
      "500": decodeError("ListLLMPricingRules500", ListLLMPricingRules500),
      orElse: unexpectedStatus
    }))
  ),
    "CreateOrUpdateLLMPricingRules": (options) => HttpClientRequest.put(`/api/v1/llm_pricing_rules`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("CreateOrUpdateLLMPricingRules400", CreateOrUpdateLLMPricingRules400),
      "401": decodeError("CreateOrUpdateLLMPricingRules401", CreateOrUpdateLLMPricingRules401),
      "403": decodeError("CreateOrUpdateLLMPricingRules403", CreateOrUpdateLLMPricingRules403),
      "500": decodeError("CreateOrUpdateLLMPricingRules500", CreateOrUpdateLLMPricingRules500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "GetLLMPricingRule": (id, options) => HttpClientRequest.get(`/api/v1/llm_pricing_rules/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetLLMPricingRule200),
      "401": decodeError("GetLLMPricingRule401", GetLLMPricingRule401),
      "403": decodeError("GetLLMPricingRule403", GetLLMPricingRule403),
      "404": decodeError("GetLLMPricingRule404", GetLLMPricingRule404),
      "500": decodeError("GetLLMPricingRule500", GetLLMPricingRule500),
      orElse: unexpectedStatus
    }))
  ),
    "DeleteLLMPricingRule": (id, options) => HttpClientRequest.delete(`/api/v1/llm_pricing_rules/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "401": decodeError("DeleteLLMPricingRule401", DeleteLLMPricingRule401),
      "403": decodeError("DeleteLLMPricingRule403", DeleteLLMPricingRule403),
      "404": decodeError("DeleteLLMPricingRule404", DeleteLLMPricingRule404),
      "500": decodeError("DeleteLLMPricingRule500", DeleteLLMPricingRule500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "ListUnmappedLLMModels": (options) => HttpClientRequest.get(`/api/v1/llm_pricing_rules/unmapped_models`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListUnmappedLLMModels200),
      "400": decodeError("ListUnmappedLLMModels400", ListUnmappedLLMModels400),
      "401": decodeError("ListUnmappedLLMModels401", ListUnmappedLLMModels401),
      "403": decodeError("ListUnmappedLLMModels403", ListUnmappedLLMModels403),
      "500": decodeError("ListUnmappedLLMModels500", ListUnmappedLLMModels500),
      orElse: unexpectedStatus
    }))
  ),
    "ListPromotedAndIndexedPaths": (options) => HttpClientRequest.get(`/api/v1/logs/promote_paths`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListPromotedAndIndexedPaths200),
      "400": decodeError("ListPromotedAndIndexedPaths400", ListPromotedAndIndexedPaths400),
      "401": decodeError("ListPromotedAndIndexedPaths401", ListPromotedAndIndexedPaths401),
      "403": decodeError("ListPromotedAndIndexedPaths403", ListPromotedAndIndexedPaths403),
      "500": decodeError("ListPromotedAndIndexedPaths500", ListPromotedAndIndexedPaths500),
      orElse: unexpectedStatus
    }))
  ),
    "HandlePromoteAndIndexPaths": (options) => HttpClientRequest.post(`/api/v1/logs/promote_paths`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("HandlePromoteAndIndexPaths400", HandlePromoteAndIndexPaths400),
      "401": decodeError("HandlePromoteAndIndexPaths401", HandlePromoteAndIndexPaths401),
      "403": decodeError("HandlePromoteAndIndexPaths403", HandlePromoteAndIndexPaths403),
      "500": decodeError("HandlePromoteAndIndexPaths500", HandlePromoteAndIndexPaths500),
      "201": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "ListOrgPreferences": (options) => HttpClientRequest.get(`/api/v1/org/preferences`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListOrgPreferences200),
      "401": decodeError("ListOrgPreferences401", ListOrgPreferences401),
      "403": decodeError("ListOrgPreferences403", ListOrgPreferences403),
      "500": decodeError("ListOrgPreferences500", ListOrgPreferences500),
      orElse: unexpectedStatus
    }))
  ),
    "GetOrgPreference": (name, options) => HttpClientRequest.get(`/api/v1/org/preferences/${name}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetOrgPreference200),
      "400": decodeError("GetOrgPreference400", GetOrgPreference400),
      "401": decodeError("GetOrgPreference401", GetOrgPreference401),
      "403": decodeError("GetOrgPreference403", GetOrgPreference403),
      "404": decodeError("GetOrgPreference404", GetOrgPreference404),
      "500": decodeError("GetOrgPreference500", GetOrgPreference500),
      orElse: unexpectedStatus
    }))
  ),
    "UpdateOrgPreference": (name, options) => HttpClientRequest.put(`/api/v1/org/preferences/${name}`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("UpdateOrgPreference400", UpdateOrgPreference400),
      "401": decodeError("UpdateOrgPreference401", UpdateOrgPreference401),
      "403": decodeError("UpdateOrgPreference403", UpdateOrgPreference403),
      "404": decodeError("UpdateOrgPreference404", UpdateOrgPreference404),
      "500": decodeError("UpdateOrgPreference500", UpdateOrgPreference500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "GetPublicDashboardData": (id, options) => HttpClientRequest.get(`/api/v1/public/dashboards/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetPublicDashboardData200),
      "401": decodeError("GetPublicDashboardData401", GetPublicDashboardData401),
      "403": decodeError("GetPublicDashboardData403", GetPublicDashboardData403),
      "500": decodeError("GetPublicDashboardData500", GetPublicDashboardData500),
      orElse: unexpectedStatus
    }))
  ),
    "GetPublicDashboardWidgetQueryRange": (id, idx, options) => HttpClientRequest.get(`/api/v1/public/dashboards/${id}/widgets/${idx}/query_range`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetPublicDashboardWidgetQueryRange200),
      "401": decodeError("GetPublicDashboardWidgetQueryRange401", GetPublicDashboardWidgetQueryRange401),
      "403": decodeError("GetPublicDashboardWidgetQueryRange403", GetPublicDashboardWidgetQueryRange403),
      "500": decodeError("GetPublicDashboardWidgetQueryRange500", GetPublicDashboardWidgetQueryRange500),
      orElse: unexpectedStatus
    }))
  ),
    "ResetPassword": (options) => HttpClientRequest.post(`/api/v1/resetPassword`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("ResetPassword400", ResetPassword400),
      "409": decodeError("ResetPassword409", ResetPassword409),
      "500": decodeError("ResetPassword500", ResetPassword500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "ListRoles": (options) => HttpClientRequest.get(`/api/v1/roles`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListRoles200),
      "401": decodeError("ListRoles401", ListRoles401),
      "403": decodeError("ListRoles403", ListRoles403),
      "500": decodeError("ListRoles500", ListRoles500),
      orElse: unexpectedStatus
    }))
  ),
    "CreateRole": (options) => HttpClientRequest.post(`/api/v1/roles`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreateRole201),
      "400": decodeError("CreateRole400", CreateRole400),
      "401": decodeError("CreateRole401", CreateRole401),
      "403": decodeError("CreateRole403", CreateRole403),
      "409": decodeError("CreateRole409", CreateRole409),
      "451": decodeError("CreateRole451", CreateRole451),
      "500": decodeError("CreateRole500", CreateRole500),
      "501": decodeError("CreateRole501", CreateRole501),
      orElse: unexpectedStatus
    }))
  ),
    "GetRole": (id, options) => HttpClientRequest.get(`/api/v1/roles/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetRole200),
      "401": decodeError("GetRole401", GetRole401),
      "403": decodeError("GetRole403", GetRole403),
      "500": decodeError("GetRole500", GetRole500),
      orElse: unexpectedStatus
    }))
  ),
    "UpdateRole": (id, options) => HttpClientRequest.put(`/api/v1/roles/${id}`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "401": decodeError("UpdateRole401", UpdateRole401),
      "403": decodeError("UpdateRole403", UpdateRole403),
      "404": decodeError("UpdateRole404", UpdateRole404),
      "451": decodeError("UpdateRole451", UpdateRole451),
      "500": decodeError("UpdateRole500", UpdateRole500),
      "501": decodeError("UpdateRole501", UpdateRole501),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "DeleteRole": (id, options) => HttpClientRequest.delete(`/api/v1/roles/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "401": decodeError("DeleteRole401", DeleteRole401),
      "403": decodeError("DeleteRole403", DeleteRole403),
      "404": decodeError("DeleteRole404", DeleteRole404),
      "451": decodeError("DeleteRole451", DeleteRole451),
      "500": decodeError("DeleteRole500", DeleteRole500),
      "501": decodeError("DeleteRole501", DeleteRole501),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "GetAllRoutePolicies": (options) => HttpClientRequest.get(`/api/v1/route_policies`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetAllRoutePolicies200),
      "401": decodeError("GetAllRoutePolicies401", GetAllRoutePolicies401),
      "403": decodeError("GetAllRoutePolicies403", GetAllRoutePolicies403),
      "500": decodeError("GetAllRoutePolicies500", GetAllRoutePolicies500),
      orElse: unexpectedStatus
    }))
  ),
    "CreateRoutePolicy": (options) => HttpClientRequest.post(`/api/v1/route_policies`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreateRoutePolicy201),
      "400": decodeError("CreateRoutePolicy400", CreateRoutePolicy400),
      "401": decodeError("CreateRoutePolicy401", CreateRoutePolicy401),
      "403": decodeError("CreateRoutePolicy403", CreateRoutePolicy403),
      "500": decodeError("CreateRoutePolicy500", CreateRoutePolicy500),
      orElse: unexpectedStatus
    }))
  ),
    "GetRoutePolicyByID": (id, options) => HttpClientRequest.get(`/api/v1/route_policies/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetRoutePolicyByID200),
      "401": decodeError("GetRoutePolicyByID401", GetRoutePolicyByID401),
      "403": decodeError("GetRoutePolicyByID403", GetRoutePolicyByID403),
      "404": decodeError("GetRoutePolicyByID404", GetRoutePolicyByID404),
      "500": decodeError("GetRoutePolicyByID500", GetRoutePolicyByID500),
      orElse: unexpectedStatus
    }))
  ),
    "UpdateRoutePolicy": (id, options) => HttpClientRequest.put(`/api/v1/route_policies/${id}`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(UpdateRoutePolicy200),
      "400": decodeError("UpdateRoutePolicy400", UpdateRoutePolicy400),
      "401": decodeError("UpdateRoutePolicy401", UpdateRoutePolicy401),
      "403": decodeError("UpdateRoutePolicy403", UpdateRoutePolicy403),
      "404": decodeError("UpdateRoutePolicy404", UpdateRoutePolicy404),
      "500": decodeError("UpdateRoutePolicy500", UpdateRoutePolicy500),
      orElse: unexpectedStatus
    }))
  ),
    "DeleteRoutePolicyByID": (id, options) => HttpClientRequest.delete(`/api/v1/route_policies/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "401": decodeError("DeleteRoutePolicyByID401", DeleteRoutePolicyByID401),
      "403": decodeError("DeleteRoutePolicyByID403", DeleteRoutePolicyByID403),
      "404": decodeError("DeleteRoutePolicyByID404", DeleteRoutePolicyByID404),
      "500": decodeError("DeleteRoutePolicyByID500", DeleteRoutePolicyByID500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "CreateServiceAccountRole": (options) => HttpClientRequest.post(`/api/v1/service_account_roles`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreateServiceAccountRole201),
      "400": decodeError("CreateServiceAccountRole400", CreateServiceAccountRole400),
      "401": decodeError("CreateServiceAccountRole401", CreateServiceAccountRole401),
      "403": decodeError("CreateServiceAccountRole403", CreateServiceAccountRole403),
      "404": decodeError("CreateServiceAccountRole404", CreateServiceAccountRole404),
      "500": decodeError("CreateServiceAccountRole500", CreateServiceAccountRole500),
      orElse: unexpectedStatus
    }))
  ),
    "GetServiceAccountRole": (id, options) => HttpClientRequest.get(`/api/v1/service_account_roles/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetServiceAccountRole200),
      "400": decodeError("GetServiceAccountRole400", GetServiceAccountRole400),
      "401": decodeError("GetServiceAccountRole401", GetServiceAccountRole401),
      "403": decodeError("GetServiceAccountRole403", GetServiceAccountRole403),
      "404": decodeError("GetServiceAccountRole404", GetServiceAccountRole404),
      "500": decodeError("GetServiceAccountRole500", GetServiceAccountRole500),
      orElse: unexpectedStatus
    }))
  ),
    "DeleteServiceAccountRole": (id, options) => HttpClientRequest.delete(`/api/v1/service_account_roles/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("DeleteServiceAccountRole400", DeleteServiceAccountRole400),
      "401": decodeError("DeleteServiceAccountRole401", DeleteServiceAccountRole401),
      "403": decodeError("DeleteServiceAccountRole403", DeleteServiceAccountRole403),
      "404": decodeError("DeleteServiceAccountRole404", DeleteServiceAccountRole404),
      "500": decodeError("DeleteServiceAccountRole500", DeleteServiceAccountRole500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "ListServiceAccounts": (options) => HttpClientRequest.get(`/api/v1/service_accounts`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListServiceAccounts200),
      "401": decodeError("ListServiceAccounts401", ListServiceAccounts401),
      "403": decodeError("ListServiceAccounts403", ListServiceAccounts403),
      "500": decodeError("ListServiceAccounts500", ListServiceAccounts500),
      orElse: unexpectedStatus
    }))
  ),
    "CreateServiceAccount": (options) => HttpClientRequest.post(`/api/v1/service_accounts`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreateServiceAccount201),
      "400": decodeError("CreateServiceAccount400", CreateServiceAccount400),
      "401": decodeError("CreateServiceAccount401", CreateServiceAccount401),
      "403": decodeError("CreateServiceAccount403", CreateServiceAccount403),
      "409": decodeError("CreateServiceAccount409", CreateServiceAccount409),
      "500": decodeError("CreateServiceAccount500", CreateServiceAccount500),
      orElse: unexpectedStatus
    }))
  ),
    "GetServiceAccount": (id, options) => HttpClientRequest.get(`/api/v1/service_accounts/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetServiceAccount200),
      "401": decodeError("GetServiceAccount401", GetServiceAccount401),
      "403": decodeError("GetServiceAccount403", GetServiceAccount403),
      "404": decodeError("GetServiceAccount404", GetServiceAccount404),
      "500": decodeError("GetServiceAccount500", GetServiceAccount500),
      orElse: unexpectedStatus
    }))
  ),
    "UpdateServiceAccount": (id, options) => HttpClientRequest.put(`/api/v1/service_accounts/${id}`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("UpdateServiceAccount400", UpdateServiceAccount400),
      "401": decodeError("UpdateServiceAccount401", UpdateServiceAccount401),
      "403": decodeError("UpdateServiceAccount403", UpdateServiceAccount403),
      "404": decodeError("UpdateServiceAccount404", UpdateServiceAccount404),
      "500": decodeError("UpdateServiceAccount500", UpdateServiceAccount500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "DeleteServiceAccount": (id, options) => HttpClientRequest.delete(`/api/v1/service_accounts/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "401": decodeError("DeleteServiceAccount401", DeleteServiceAccount401),
      "403": decodeError("DeleteServiceAccount403", DeleteServiceAccount403),
      "404": decodeError("DeleteServiceAccount404", DeleteServiceAccount404),
      "500": decodeError("DeleteServiceAccount500", DeleteServiceAccount500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "ListServiceAccountKeys": (id, options) => HttpClientRequest.get(`/api/v1/service_accounts/${id}/keys`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListServiceAccountKeys200),
      "401": decodeError("ListServiceAccountKeys401", ListServiceAccountKeys401),
      "403": decodeError("ListServiceAccountKeys403", ListServiceAccountKeys403),
      "500": decodeError("ListServiceAccountKeys500", ListServiceAccountKeys500),
      orElse: unexpectedStatus
    }))
  ),
    "CreateServiceAccountKey": (id, options) => HttpClientRequest.post(`/api/v1/service_accounts/${id}/keys`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreateServiceAccountKey201),
      "400": decodeError("CreateServiceAccountKey400", CreateServiceAccountKey400),
      "401": decodeError("CreateServiceAccountKey401", CreateServiceAccountKey401),
      "403": decodeError("CreateServiceAccountKey403", CreateServiceAccountKey403),
      "409": decodeError("CreateServiceAccountKey409", CreateServiceAccountKey409),
      "500": decodeError("CreateServiceAccountKey500", CreateServiceAccountKey500),
      orElse: unexpectedStatus
    }))
  ),
    "UpdateServiceAccountKey": (id, fid, options) => HttpClientRequest.put(`/api/v1/service_accounts/${id}/keys/${fid}`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("UpdateServiceAccountKey400", UpdateServiceAccountKey400),
      "401": decodeError("UpdateServiceAccountKey401", UpdateServiceAccountKey401),
      "403": decodeError("UpdateServiceAccountKey403", UpdateServiceAccountKey403),
      "404": decodeError("UpdateServiceAccountKey404", UpdateServiceAccountKey404),
      "500": decodeError("UpdateServiceAccountKey500", UpdateServiceAccountKey500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "RevokeServiceAccountKey": (id, fid, options) => HttpClientRequest.delete(`/api/v1/service_accounts/${id}/keys/${fid}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "401": decodeError("RevokeServiceAccountKey401", RevokeServiceAccountKey401),
      "403": decodeError("RevokeServiceAccountKey403", RevokeServiceAccountKey403),
      "404": decodeError("RevokeServiceAccountKey404", RevokeServiceAccountKey404),
      "500": decodeError("RevokeServiceAccountKey500", RevokeServiceAccountKey500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "GetServiceAccountRoles": (id, options) => HttpClientRequest.get(`/api/v1/service_accounts/${id}/roles`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetServiceAccountRoles200),
      "401": decodeError("GetServiceAccountRoles401", GetServiceAccountRoles401),
      "403": decodeError("GetServiceAccountRoles403", GetServiceAccountRoles403),
      "404": decodeError("GetServiceAccountRoles404", GetServiceAccountRoles404),
      "500": decodeError("GetServiceAccountRoles500", GetServiceAccountRoles500),
      orElse: unexpectedStatus
    }))
  ),
    "CreateServiceAccountRoleDeprecated": (id, options) => HttpClientRequest.post(`/api/v1/service_accounts/${id}/roles`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreateServiceAccountRoleDeprecated201),
      "400": decodeError("CreateServiceAccountRoleDeprecated400", CreateServiceAccountRoleDeprecated400),
      "401": decodeError("CreateServiceAccountRoleDeprecated401", CreateServiceAccountRoleDeprecated401),
      "403": decodeError("CreateServiceAccountRoleDeprecated403", CreateServiceAccountRoleDeprecated403),
      "500": decodeError("CreateServiceAccountRoleDeprecated500", CreateServiceAccountRoleDeprecated500),
      orElse: unexpectedStatus
    }))
  ),
    "DeleteServiceAccountRoleDeprecated": (id, rid, options) => HttpClientRequest.delete(`/api/v1/service_accounts/${id}/roles/${rid}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "401": decodeError("DeleteServiceAccountRoleDeprecated401", DeleteServiceAccountRoleDeprecated401),
      "403": decodeError("DeleteServiceAccountRoleDeprecated403", DeleteServiceAccountRoleDeprecated403),
      "500": decodeError("DeleteServiceAccountRoleDeprecated500", DeleteServiceAccountRoleDeprecated500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "GetMyServiceAccount": (options) => HttpClientRequest.get(`/api/v1/service_accounts/me`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetMyServiceAccount200),
      "404": decodeError("GetMyServiceAccount404", GetMyServiceAccount404),
      "500": decodeError("GetMyServiceAccount500", GetMyServiceAccount500),
      orElse: unexpectedStatus
    }))
  ),
    "UpdateMyServiceAccount": (options) => HttpClientRequest.put(`/api/v1/service_accounts/me`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "404": decodeError("UpdateMyServiceAccount404", UpdateMyServiceAccount404),
      "500": decodeError("UpdateMyServiceAccount500", UpdateMyServiceAccount500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "ListSpanMapperGroups": (options) => HttpClientRequest.get(`/api/v1/span_mapper_groups`).pipe(
    HttpClientRequest.setUrlParams({ "enabled": options?.params?.["enabled"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListSpanMapperGroups200),
      "400": decodeError("ListSpanMapperGroups400", ListSpanMapperGroups400),
      "401": decodeError("ListSpanMapperGroups401", ListSpanMapperGroups401),
      "403": decodeError("ListSpanMapperGroups403", ListSpanMapperGroups403),
      "500": decodeError("ListSpanMapperGroups500", ListSpanMapperGroups500),
      orElse: unexpectedStatus
    }))
  ),
    "CreateSpanMapperGroup": (options) => HttpClientRequest.post(`/api/v1/span_mapper_groups`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreateSpanMapperGroup201),
      "400": decodeError("CreateSpanMapperGroup400", CreateSpanMapperGroup400),
      "401": decodeError("CreateSpanMapperGroup401", CreateSpanMapperGroup401),
      "403": decodeError("CreateSpanMapperGroup403", CreateSpanMapperGroup403),
      "409": decodeError("CreateSpanMapperGroup409", CreateSpanMapperGroup409),
      "500": decodeError("CreateSpanMapperGroup500", CreateSpanMapperGroup500),
      orElse: unexpectedStatus
    }))
  ),
    "DeleteSpanMapperGroup": (groupId, options) => HttpClientRequest.delete(`/api/v1/span_mapper_groups/${groupId}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "401": decodeError("DeleteSpanMapperGroup401", DeleteSpanMapperGroup401),
      "403": decodeError("DeleteSpanMapperGroup403", DeleteSpanMapperGroup403),
      "404": decodeError("DeleteSpanMapperGroup404", DeleteSpanMapperGroup404),
      "500": decodeError("DeleteSpanMapperGroup500", DeleteSpanMapperGroup500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "UpdateSpanMapperGroup": (groupId, options) => HttpClientRequest.patch(`/api/v1/span_mapper_groups/${groupId}`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("UpdateSpanMapperGroup400", UpdateSpanMapperGroup400),
      "401": decodeError("UpdateSpanMapperGroup401", UpdateSpanMapperGroup401),
      "403": decodeError("UpdateSpanMapperGroup403", UpdateSpanMapperGroup403),
      "404": decodeError("UpdateSpanMapperGroup404", UpdateSpanMapperGroup404),
      "500": decodeError("UpdateSpanMapperGroup500", UpdateSpanMapperGroup500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "ListSpanMappers": (groupId, options) => HttpClientRequest.get(`/api/v1/span_mapper_groups/${groupId}/span_mappers`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListSpanMappers200),
      "400": decodeError("ListSpanMappers400", ListSpanMappers400),
      "401": decodeError("ListSpanMappers401", ListSpanMappers401),
      "403": decodeError("ListSpanMappers403", ListSpanMappers403),
      "404": decodeError("ListSpanMappers404", ListSpanMappers404),
      "500": decodeError("ListSpanMappers500", ListSpanMappers500),
      orElse: unexpectedStatus
    }))
  ),
    "CreateSpanMapper": (groupId, options) => HttpClientRequest.post(`/api/v1/span_mapper_groups/${groupId}/span_mappers`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreateSpanMapper201),
      "400": decodeError("CreateSpanMapper400", CreateSpanMapper400),
      "401": decodeError("CreateSpanMapper401", CreateSpanMapper401),
      "403": decodeError("CreateSpanMapper403", CreateSpanMapper403),
      "404": decodeError("CreateSpanMapper404", CreateSpanMapper404),
      "409": decodeError("CreateSpanMapper409", CreateSpanMapper409),
      "500": decodeError("CreateSpanMapper500", CreateSpanMapper500),
      orElse: unexpectedStatus
    }))
  ),
    "DeleteSpanMapper": (groupId, mapperId, options) => HttpClientRequest.delete(`/api/v1/span_mapper_groups/${groupId}/span_mappers/${mapperId}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "401": decodeError("DeleteSpanMapper401", DeleteSpanMapper401),
      "403": decodeError("DeleteSpanMapper403", DeleteSpanMapper403),
      "404": decodeError("DeleteSpanMapper404", DeleteSpanMapper404),
      "500": decodeError("DeleteSpanMapper500", DeleteSpanMapper500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "UpdateSpanMapper": (groupId, mapperId, options) => HttpClientRequest.patch(`/api/v1/span_mapper_groups/${groupId}/span_mappers/${mapperId}`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("UpdateSpanMapper400", UpdateSpanMapper400),
      "401": decodeError("UpdateSpanMapper401", UpdateSpanMapper401),
      "403": decodeError("UpdateSpanMapper403", UpdateSpanMapper403),
      "404": decodeError("UpdateSpanMapper404", UpdateSpanMapper404),
      "500": decodeError("UpdateSpanMapper500", UpdateSpanMapper500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "TestSpanMappers": (options) => HttpClientRequest.post(`/api/v1/span_mapper_groups/test`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(TestSpanMappers200),
      "400": decodeError("TestSpanMappers400", TestSpanMappers400),
      "401": decodeError("TestSpanMappers401", TestSpanMappers401),
      "403": decodeError("TestSpanMappers403", TestSpanMappers403),
      "404": decodeError("TestSpanMappers404", TestSpanMappers404),
      "500": decodeError("TestSpanMappers500", TestSpanMappers500),
      orElse: unexpectedStatus
    }))
  ),
    "GetStats": (options) => HttpClientRequest.get(`/api/v1/stats`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetStats200),
      "401": decodeError("GetStats401", GetStats401),
      "403": decodeError("GetStats403", GetStats403),
      "500": decodeError("GetStats500", GetStats500),
      orElse: unexpectedStatus
    }))
  ),
    "TestChannelDeprecated": (options) => HttpClientRequest.post(`/api/v1/testChannel`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("TestChannelDeprecated400", TestChannelDeprecated400),
      "401": decodeError("TestChannelDeprecated401", TestChannelDeprecated401),
      "403": decodeError("TestChannelDeprecated403", TestChannelDeprecated403),
      "500": decodeError("TestChannelDeprecated500", TestChannelDeprecated500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "GetTraceAggregations": (traceID, options) => HttpClientRequest.post(`/api/v1/traces/${traceID}/aggregations`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetTraceAggregations200),
      "400": decodeError("GetTraceAggregations400", GetTraceAggregations400),
      "401": decodeError("GetTraceAggregations401", GetTraceAggregations401),
      "403": decodeError("GetTraceAggregations403", GetTraceAggregations403),
      "404": decodeError("GetTraceAggregations404", GetTraceAggregations404),
      "500": decodeError("GetTraceAggregations500", GetTraceAggregations500),
      orElse: unexpectedStatus
    }))
  ),
    "ListUsersDeprecated": (options) => HttpClientRequest.get(`/api/v1/user`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListUsersDeprecated200),
      "401": decodeError("ListUsersDeprecated401", ListUsersDeprecated401),
      "403": decodeError("ListUsersDeprecated403", ListUsersDeprecated403),
      "500": decodeError("ListUsersDeprecated500", ListUsersDeprecated500),
      orElse: unexpectedStatus
    }))
  ),
    "GetUserDeprecated": (id, options) => HttpClientRequest.get(`/api/v1/user/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetUserDeprecated200),
      "401": decodeError("GetUserDeprecated401", GetUserDeprecated401),
      "403": decodeError("GetUserDeprecated403", GetUserDeprecated403),
      "404": decodeError("GetUserDeprecated404", GetUserDeprecated404),
      "500": decodeError("GetUserDeprecated500", GetUserDeprecated500),
      orElse: unexpectedStatus
    }))
  ),
    "UpdateUserDeprecated": (id, options) => HttpClientRequest.put(`/api/v1/user/${id}`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(UpdateUserDeprecated200),
      "400": decodeError("UpdateUserDeprecated400", UpdateUserDeprecated400),
      "401": decodeError("UpdateUserDeprecated401", UpdateUserDeprecated401),
      "403": decodeError("UpdateUserDeprecated403", UpdateUserDeprecated403),
      "404": decodeError("UpdateUserDeprecated404", UpdateUserDeprecated404),
      "500": decodeError("UpdateUserDeprecated500", UpdateUserDeprecated500),
      orElse: unexpectedStatus
    }))
  ),
    "DeleteUserDeprecated": (id, options) => HttpClientRequest.delete(`/api/v1/user/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "401": decodeError("DeleteUserDeprecated401", DeleteUserDeprecated401),
      "403": decodeError("DeleteUserDeprecated403", DeleteUserDeprecated403),
      "404": decodeError("DeleteUserDeprecated404", DeleteUserDeprecated404),
      "500": decodeError("DeleteUserDeprecated500", DeleteUserDeprecated500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "GetMyUserDeprecated": (options) => HttpClientRequest.get(`/api/v1/user/me`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetMyUserDeprecated200),
      "401": decodeError("GetMyUserDeprecated401", GetMyUserDeprecated401),
      "403": decodeError("GetMyUserDeprecated403", GetMyUserDeprecated403),
      "500": decodeError("GetMyUserDeprecated500", GetMyUserDeprecated500),
      orElse: unexpectedStatus
    }))
  ),
    "ListUserPreferences": (options) => HttpClientRequest.get(`/api/v1/user/preferences`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListUserPreferences200),
      "401": decodeError("ListUserPreferences401", ListUserPreferences401),
      "403": decodeError("ListUserPreferences403", ListUserPreferences403),
      "500": decodeError("ListUserPreferences500", ListUserPreferences500),
      orElse: unexpectedStatus
    }))
  ),
    "GetUserPreference": (name, options) => HttpClientRequest.get(`/api/v1/user/preferences/${name}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetUserPreference200),
      "401": decodeError("GetUserPreference401", GetUserPreference401),
      "403": decodeError("GetUserPreference403", GetUserPreference403),
      "404": decodeError("GetUserPreference404", GetUserPreference404),
      "500": decodeError("GetUserPreference500", GetUserPreference500),
      orElse: unexpectedStatus
    }))
  ),
    "UpdateUserPreference": (name, options) => HttpClientRequest.put(`/api/v1/user/preferences/${name}`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("UpdateUserPreference400", UpdateUserPreference400),
      "401": decodeError("UpdateUserPreference401", UpdateUserPreference401),
      "403": decodeError("UpdateUserPreference403", UpdateUserPreference403),
      "404": decodeError("UpdateUserPreference404", UpdateUserPreference404),
      "500": decodeError("UpdateUserPreference500", UpdateUserPreference500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "ListDashboardViews": (options) => HttpClientRequest.get(`/api/v2/dashboard_views`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListDashboardViews200),
      "401": decodeError("ListDashboardViews401", ListDashboardViews401),
      "403": decodeError("ListDashboardViews403", ListDashboardViews403),
      "500": decodeError("ListDashboardViews500", ListDashboardViews500),
      orElse: unexpectedStatus
    }))
  ),
    "CreateDashboardView": (options) => HttpClientRequest.post(`/api/v2/dashboard_views`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreateDashboardView201),
      "400": decodeError("CreateDashboardView400", CreateDashboardView400),
      "401": decodeError("CreateDashboardView401", CreateDashboardView401),
      "403": decodeError("CreateDashboardView403", CreateDashboardView403),
      "500": decodeError("CreateDashboardView500", CreateDashboardView500),
      orElse: unexpectedStatus
    }))
  ),
    "UpdateDashboardView": (id, options) => HttpClientRequest.put(`/api/v2/dashboard_views/${id}`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(UpdateDashboardView200),
      "400": decodeError("UpdateDashboardView400", UpdateDashboardView400),
      "401": decodeError("UpdateDashboardView401", UpdateDashboardView401),
      "403": decodeError("UpdateDashboardView403", UpdateDashboardView403),
      "404": decodeError("UpdateDashboardView404", UpdateDashboardView404),
      "500": decodeError("UpdateDashboardView500", UpdateDashboardView500),
      orElse: unexpectedStatus
    }))
  ),
    "DeleteDashboardView": (id, options) => HttpClientRequest.delete(`/api/v2/dashboard_views/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("DeleteDashboardView400", DeleteDashboardView400),
      "401": decodeError("DeleteDashboardView401", DeleteDashboardView401),
      "403": decodeError("DeleteDashboardView403", DeleteDashboardView403),
      "404": decodeError("DeleteDashboardView404", DeleteDashboardView404),
      "500": decodeError("DeleteDashboardView500", DeleteDashboardView500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "ListDashboardsV2": (options) => HttpClientRequest.get(`/api/v2/dashboards`).pipe(
    HttpClientRequest.setUrlParams({ "query": options?.params?.["query"] as any, "sort": options?.params?.["sort"] as any, "order": options?.params?.["order"] as any, "limit": options?.params?.["limit"] as any, "offset": options?.params?.["offset"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListDashboardsV2200),
      "400": decodeError("ListDashboardsV2400", ListDashboardsV2400),
      "401": decodeError("ListDashboardsV2401", ListDashboardsV2401),
      "403": decodeError("ListDashboardsV2403", ListDashboardsV2403),
      "500": decodeError("ListDashboardsV2500", ListDashboardsV2500),
      orElse: unexpectedStatus
    }))
  ),
    "CreateDashboardV2": (options) => HttpClientRequest.post(`/api/v2/dashboards`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreateDashboardV2201),
      "400": decodeError("CreateDashboardV2400", CreateDashboardV2400),
      "401": decodeError("CreateDashboardV2401", CreateDashboardV2401),
      "403": decodeError("CreateDashboardV2403", CreateDashboardV2403),
      "500": decodeError("CreateDashboardV2500", CreateDashboardV2500),
      orElse: unexpectedStatus
    }))
  ),
    "GetDashboardV2": (id, options) => HttpClientRequest.get(`/api/v2/dashboards/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetDashboardV2200),
      "400": decodeError("GetDashboardV2400", GetDashboardV2400),
      "401": decodeError("GetDashboardV2401", GetDashboardV2401),
      "403": decodeError("GetDashboardV2403", GetDashboardV2403),
      "404": decodeError("GetDashboardV2404", GetDashboardV2404),
      "500": decodeError("GetDashboardV2500", GetDashboardV2500),
      orElse: unexpectedStatus
    }))
  ),
    "UpdateDashboardV2": (id, options) => HttpClientRequest.put(`/api/v2/dashboards/${id}`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(UpdateDashboardV2200),
      "400": decodeError("UpdateDashboardV2400", UpdateDashboardV2400),
      "401": decodeError("UpdateDashboardV2401", UpdateDashboardV2401),
      "403": decodeError("UpdateDashboardV2403", UpdateDashboardV2403),
      "404": decodeError("UpdateDashboardV2404", UpdateDashboardV2404),
      "500": decodeError("UpdateDashboardV2500", UpdateDashboardV2500),
      orElse: unexpectedStatus
    }))
  ),
    "DeleteDashboardV2": (id, options) => HttpClientRequest.delete(`/api/v2/dashboards/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("DeleteDashboardV2400", DeleteDashboardV2400),
      "401": decodeError("DeleteDashboardV2401", DeleteDashboardV2401),
      "403": decodeError("DeleteDashboardV2403", DeleteDashboardV2403),
      "404": decodeError("DeleteDashboardV2404", DeleteDashboardV2404),
      "500": decodeError("DeleteDashboardV2500", DeleteDashboardV2500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "PatchDashboardV2": (id, options) => HttpClientRequest.patch(`/api/v2/dashboards/${id}`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(PatchDashboardV2200),
      "400": decodeError("PatchDashboardV2400", PatchDashboardV2400),
      "401": decodeError("PatchDashboardV2401", PatchDashboardV2401),
      "403": decodeError("PatchDashboardV2403", PatchDashboardV2403),
      "404": decodeError("PatchDashboardV2404", PatchDashboardV2404),
      "500": decodeError("PatchDashboardV2500", PatchDashboardV2500),
      orElse: unexpectedStatus
    }))
  ),
    "CloneDashboardV2": (id, options) => HttpClientRequest.post(`/api/v2/dashboards/${id}/clone`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CloneDashboardV2201),
      "400": decodeError("CloneDashboardV2400", CloneDashboardV2400),
      "401": decodeError("CloneDashboardV2401", CloneDashboardV2401),
      "403": decodeError("CloneDashboardV2403", CloneDashboardV2403),
      "404": decodeError("CloneDashboardV2404", CloneDashboardV2404),
      "500": decodeError("CloneDashboardV2500", CloneDashboardV2500),
      orElse: unexpectedStatus
    }))
  ),
    "LockDashboardV2": (id, options) => HttpClientRequest.put(`/api/v2/dashboards/${id}/lock`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("LockDashboardV2400", LockDashboardV2400),
      "401": decodeError("LockDashboardV2401", LockDashboardV2401),
      "403": decodeError("LockDashboardV2403", LockDashboardV2403),
      "404": decodeError("LockDashboardV2404", LockDashboardV2404),
      "500": decodeError("LockDashboardV2500", LockDashboardV2500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "UnlockDashboardV2": (id, options) => HttpClientRequest.delete(`/api/v2/dashboards/${id}/lock`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("UnlockDashboardV2400", UnlockDashboardV2400),
      "401": decodeError("UnlockDashboardV2401", UnlockDashboardV2401),
      "403": decodeError("UnlockDashboardV2403", UnlockDashboardV2403),
      "404": decodeError("UnlockDashboardV2404", UnlockDashboardV2404),
      "500": decodeError("UnlockDashboardV2500", UnlockDashboardV2500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "ForgotPassword": (options) => HttpClientRequest.post(`/api/v2/factor_password/forgot`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("ForgotPassword400", ForgotPassword400),
      "422": decodeError("ForgotPassword422", ForgotPassword422),
      "500": decodeError("ForgotPassword500", ForgotPassword500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "GetFeatures": (options) => HttpClientRequest.get(`/api/v2/features`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetFeatures200),
      "401": decodeError("GetFeatures401", GetFeatures401),
      "403": decodeError("GetFeatures403", GetFeatures403),
      "500": decodeError("GetFeatures500", GetFeatures500),
      orElse: unexpectedStatus
    }))
  ),
    "GetIngestionKeys": (options) => HttpClientRequest.get(`/api/v2/gateway/ingestion_keys`).pipe(
    HttpClientRequest.setUrlParams({ "page": options?.params?.["page"] as any, "per_page": options?.params?.["per_page"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetIngestionKeys200),
      "401": decodeError("GetIngestionKeys401", GetIngestionKeys401),
      "403": decodeError("GetIngestionKeys403", GetIngestionKeys403),
      "500": decodeError("GetIngestionKeys500", GetIngestionKeys500),
      orElse: unexpectedStatus
    }))
  ),
    "CreateIngestionKey": (options) => HttpClientRequest.post(`/api/v2/gateway/ingestion_keys`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreateIngestionKey201),
      "401": decodeError("CreateIngestionKey401", CreateIngestionKey401),
      "403": decodeError("CreateIngestionKey403", CreateIngestionKey403),
      "500": decodeError("CreateIngestionKey500", CreateIngestionKey500),
      orElse: unexpectedStatus
    }))
  ),
    "DeleteIngestionKey": (keyId, options) => HttpClientRequest.delete(`/api/v2/gateway/ingestion_keys/${keyId}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "401": decodeError("DeleteIngestionKey401", DeleteIngestionKey401),
      "403": decodeError("DeleteIngestionKey403", DeleteIngestionKey403),
      "500": decodeError("DeleteIngestionKey500", DeleteIngestionKey500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "UpdateIngestionKey": (keyId, options) => HttpClientRequest.patch(`/api/v2/gateway/ingestion_keys/${keyId}`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "401": decodeError("UpdateIngestionKey401", UpdateIngestionKey401),
      "403": decodeError("UpdateIngestionKey403", UpdateIngestionKey403),
      "500": decodeError("UpdateIngestionKey500", UpdateIngestionKey500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "CreateIngestionKeyLimit": (keyId, options) => HttpClientRequest.post(`/api/v2/gateway/ingestion_keys/${keyId}/limits`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreateIngestionKeyLimit201),
      "401": decodeError("CreateIngestionKeyLimit401", CreateIngestionKeyLimit401),
      "403": decodeError("CreateIngestionKeyLimit403", CreateIngestionKeyLimit403),
      "500": decodeError("CreateIngestionKeyLimit500", CreateIngestionKeyLimit500),
      orElse: unexpectedStatus
    }))
  ),
    "DeleteIngestionKeyLimit": (limitId, options) => HttpClientRequest.delete(`/api/v2/gateway/ingestion_keys/limits/${limitId}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "401": decodeError("DeleteIngestionKeyLimit401", DeleteIngestionKeyLimit401),
      "403": decodeError("DeleteIngestionKeyLimit403", DeleteIngestionKeyLimit403),
      "500": decodeError("DeleteIngestionKeyLimit500", DeleteIngestionKeyLimit500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "UpdateIngestionKeyLimit": (limitId, options) => HttpClientRequest.patch(`/api/v2/gateway/ingestion_keys/limits/${limitId}`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "401": decodeError("UpdateIngestionKeyLimit401", UpdateIngestionKeyLimit401),
      "403": decodeError("UpdateIngestionKeyLimit403", UpdateIngestionKeyLimit403),
      "500": decodeError("UpdateIngestionKeyLimit500", UpdateIngestionKeyLimit500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "SearchIngestionKeys": (options) => HttpClientRequest.get(`/api/v2/gateway/ingestion_keys/search`).pipe(
    HttpClientRequest.setUrlParams({ "name": options.params["name"] as any, "page": options.params["page"] as any, "per_page": options.params["per_page"] as any }),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SearchIngestionKeys200),
      "401": decodeError("SearchIngestionKeys401", SearchIngestionKeys401),
      "403": decodeError("SearchIngestionKeys403", SearchIngestionKeys403),
      "500": decodeError("SearchIngestionKeys500", SearchIngestionKeys500),
      orElse: unexpectedStatus
    }))
  ),
    "Healthz": (options) => HttpClientRequest.get(`/api/v2/healthz`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(Healthz200),
      "503": decodeError("Healthz503", Healthz503),
      orElse: unexpectedStatus
    }))
  ),
    "GetChecks": (options) => HttpClientRequest.get(`/api/v2/infra_monitoring/checks`).pipe(
    HttpClientRequest.setUrlParams({ "type": options.params["type"] as any }),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetChecks200),
      "400": decodeError("GetChecks400", GetChecks400),
      "401": decodeError("GetChecks401", GetChecks401),
      "403": decodeError("GetChecks403", GetChecks403),
      "500": decodeError("GetChecks500", GetChecks500),
      orElse: unexpectedStatus
    }))
  ),
    "ListClusters": (options) => HttpClientRequest.post(`/api/v2/infra_monitoring/clusters`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListClusters200),
      "400": decodeError("ListClusters400", ListClusters400),
      "401": decodeError("ListClusters401", ListClusters401),
      "403": decodeError("ListClusters403", ListClusters403),
      "500": decodeError("ListClusters500", ListClusters500),
      orElse: unexpectedStatus
    }))
  ),
    "ListDaemonSets": (options) => HttpClientRequest.post(`/api/v2/infra_monitoring/daemonsets`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListDaemonSets200),
      "400": decodeError("ListDaemonSets400", ListDaemonSets400),
      "401": decodeError("ListDaemonSets401", ListDaemonSets401),
      "403": decodeError("ListDaemonSets403", ListDaemonSets403),
      "500": decodeError("ListDaemonSets500", ListDaemonSets500),
      orElse: unexpectedStatus
    }))
  ),
    "ListDeployments": (options) => HttpClientRequest.post(`/api/v2/infra_monitoring/deployments`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListDeployments200),
      "400": decodeError("ListDeployments400", ListDeployments400),
      "401": decodeError("ListDeployments401", ListDeployments401),
      "403": decodeError("ListDeployments403", ListDeployments403),
      "500": decodeError("ListDeployments500", ListDeployments500),
      orElse: unexpectedStatus
    }))
  ),
    "ListHosts": (options) => HttpClientRequest.post(`/api/v2/infra_monitoring/hosts`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListHosts200),
      "400": decodeError("ListHosts400", ListHosts400),
      "401": decodeError("ListHosts401", ListHosts401),
      "403": decodeError("ListHosts403", ListHosts403),
      "500": decodeError("ListHosts500", ListHosts500),
      orElse: unexpectedStatus
    }))
  ),
    "ListJobs": (options) => HttpClientRequest.post(`/api/v2/infra_monitoring/jobs`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListJobs200),
      "400": decodeError("ListJobs400", ListJobs400),
      "401": decodeError("ListJobs401", ListJobs401),
      "403": decodeError("ListJobs403", ListJobs403),
      "500": decodeError("ListJobs500", ListJobs500),
      orElse: unexpectedStatus
    }))
  ),
    "ListContainers": (options) => HttpClientRequest.post(`/api/v2/infra_monitoring/kube_containers`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListContainers200),
      "400": decodeError("ListContainers400", ListContainers400),
      "401": decodeError("ListContainers401", ListContainers401),
      "403": decodeError("ListContainers403", ListContainers403),
      "500": decodeError("ListContainers500", ListContainers500),
      orElse: unexpectedStatus
    }))
  ),
    "ListNamespaces": (options) => HttpClientRequest.post(`/api/v2/infra_monitoring/namespaces`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListNamespaces200),
      "400": decodeError("ListNamespaces400", ListNamespaces400),
      "401": decodeError("ListNamespaces401", ListNamespaces401),
      "403": decodeError("ListNamespaces403", ListNamespaces403),
      "500": decodeError("ListNamespaces500", ListNamespaces500),
      orElse: unexpectedStatus
    }))
  ),
    "ListNodes": (options) => HttpClientRequest.post(`/api/v2/infra_monitoring/nodes`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListNodes200),
      "400": decodeError("ListNodes400", ListNodes400),
      "401": decodeError("ListNodes401", ListNodes401),
      "403": decodeError("ListNodes403", ListNodes403),
      "500": decodeError("ListNodes500", ListNodes500),
      orElse: unexpectedStatus
    }))
  ),
    "ListPods": (options) => HttpClientRequest.post(`/api/v2/infra_monitoring/pods`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListPods200),
      "400": decodeError("ListPods400", ListPods400),
      "401": decodeError("ListPods401", ListPods401),
      "403": decodeError("ListPods403", ListPods403),
      "500": decodeError("ListPods500", ListPods500),
      orElse: unexpectedStatus
    }))
  ),
    "ListVolumes": (options) => HttpClientRequest.post(`/api/v2/infra_monitoring/pvcs`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListVolumes200),
      "400": decodeError("ListVolumes400", ListVolumes400),
      "401": decodeError("ListVolumes401", ListVolumes401),
      "403": decodeError("ListVolumes403", ListVolumes403),
      "500": decodeError("ListVolumes500", ListVolumes500),
      orElse: unexpectedStatus
    }))
  ),
    "ListStatefulSets": (options) => HttpClientRequest.post(`/api/v2/infra_monitoring/statefulsets`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListStatefulSets200),
      "400": decodeError("ListStatefulSets400", ListStatefulSets400),
      "401": decodeError("ListStatefulSets401", ListStatefulSets401),
      "403": decodeError("ListStatefulSets403", ListStatefulSets403),
      "500": decodeError("ListStatefulSets500", ListStatefulSets500),
      orElse: unexpectedStatus
    }))
  ),
    "Livez": (options) => HttpClientRequest.get(`/api/v2/livez`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(Livez200),
      "500": decodeError("Livez500", Livez500),
      orElse: unexpectedStatus
    }))
  ),
    "ListMetricReductionRules": (options) => HttpClientRequest.get(`/api/v2/metric_reduction_rules`).pipe(
    HttpClientRequest.setUrlParams({ "orderBy": options?.params?.["orderBy"] as any, "order": options?.params?.["order"] as any, "search": options?.params?.["search"] as any, "metricName": options?.params?.["metricName"] as any, "offset": options?.params?.["offset"] as any, "limit": options?.params?.["limit"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListMetricReductionRules200),
      "401": decodeError("ListMetricReductionRules401", ListMetricReductionRules401),
      "403": decodeError("ListMetricReductionRules403", ListMetricReductionRules403),
      "451": decodeError("ListMetricReductionRules451", ListMetricReductionRules451),
      "500": decodeError("ListMetricReductionRules500", ListMetricReductionRules500),
      "501": decodeError("ListMetricReductionRules501", ListMetricReductionRules501),
      orElse: unexpectedStatus
    }))
  ),
    "CreateMetricReductionRule": (options) => HttpClientRequest.post(`/api/v2/metric_reduction_rules`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreateMetricReductionRule201),
      "400": decodeError("CreateMetricReductionRule400", CreateMetricReductionRule400),
      "401": decodeError("CreateMetricReductionRule401", CreateMetricReductionRule401),
      "403": decodeError("CreateMetricReductionRule403", CreateMetricReductionRule403),
      "409": decodeError("CreateMetricReductionRule409", CreateMetricReductionRule409),
      "451": decodeError("CreateMetricReductionRule451", CreateMetricReductionRule451),
      "500": decodeError("CreateMetricReductionRule500", CreateMetricReductionRule500),
      "501": decodeError("CreateMetricReductionRule501", CreateMetricReductionRule501),
      orElse: unexpectedStatus
    }))
  ),
    "GetMetricReductionRuleByID": (id, options) => HttpClientRequest.get(`/api/v2/metric_reduction_rules/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetMetricReductionRuleByID200),
      "401": decodeError("GetMetricReductionRuleByID401", GetMetricReductionRuleByID401),
      "403": decodeError("GetMetricReductionRuleByID403", GetMetricReductionRuleByID403),
      "404": decodeError("GetMetricReductionRuleByID404", GetMetricReductionRuleByID404),
      "451": decodeError("GetMetricReductionRuleByID451", GetMetricReductionRuleByID451),
      "500": decodeError("GetMetricReductionRuleByID500", GetMetricReductionRuleByID500),
      "501": decodeError("GetMetricReductionRuleByID501", GetMetricReductionRuleByID501),
      orElse: unexpectedStatus
    }))
  ),
    "UpdateMetricReductionRuleByID": (id, options) => HttpClientRequest.put(`/api/v2/metric_reduction_rules/${id}`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(UpdateMetricReductionRuleByID200),
      "400": decodeError("UpdateMetricReductionRuleByID400", UpdateMetricReductionRuleByID400),
      "401": decodeError("UpdateMetricReductionRuleByID401", UpdateMetricReductionRuleByID401),
      "403": decodeError("UpdateMetricReductionRuleByID403", UpdateMetricReductionRuleByID403),
      "404": decodeError("UpdateMetricReductionRuleByID404", UpdateMetricReductionRuleByID404),
      "451": decodeError("UpdateMetricReductionRuleByID451", UpdateMetricReductionRuleByID451),
      "500": decodeError("UpdateMetricReductionRuleByID500", UpdateMetricReductionRuleByID500),
      "501": decodeError("UpdateMetricReductionRuleByID501", UpdateMetricReductionRuleByID501),
      orElse: unexpectedStatus
    }))
  ),
    "DeleteMetricReductionRuleByID": (id, options) => HttpClientRequest.delete(`/api/v2/metric_reduction_rules/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "401": decodeError("DeleteMetricReductionRuleByID401", DeleteMetricReductionRuleByID401),
      "403": decodeError("DeleteMetricReductionRuleByID403", DeleteMetricReductionRuleByID403),
      "404": decodeError("DeleteMetricReductionRuleByID404", DeleteMetricReductionRuleByID404),
      "451": decodeError("DeleteMetricReductionRuleByID451", DeleteMetricReductionRuleByID451),
      "500": decodeError("DeleteMetricReductionRuleByID500", DeleteMetricReductionRuleByID500),
      "501": decodeError("DeleteMetricReductionRuleByID501", DeleteMetricReductionRuleByID501),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "PreviewMetricReductionRule": (options) => HttpClientRequest.post(`/api/v2/metric_reduction_rules/preview`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(PreviewMetricReductionRule200),
      "400": decodeError("PreviewMetricReductionRule400", PreviewMetricReductionRule400),
      "401": decodeError("PreviewMetricReductionRule401", PreviewMetricReductionRule401),
      "403": decodeError("PreviewMetricReductionRule403", PreviewMetricReductionRule403),
      "404": decodeError("PreviewMetricReductionRule404", PreviewMetricReductionRule404),
      "451": decodeError("PreviewMetricReductionRule451", PreviewMetricReductionRule451),
      "500": decodeError("PreviewMetricReductionRule500", PreviewMetricReductionRule500),
      "501": decodeError("PreviewMetricReductionRule501", PreviewMetricReductionRule501),
      orElse: unexpectedStatus
    }))
  ),
    "GetMetricReductionRuleStats": (options) => HttpClientRequest.get(`/api/v2/metric_reduction_rules/stats`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetMetricReductionRuleStats200),
      "401": decodeError("GetMetricReductionRuleStats401", GetMetricReductionRuleStats401),
      "403": decodeError("GetMetricReductionRuleStats403", GetMetricReductionRuleStats403),
      "451": decodeError("GetMetricReductionRuleStats451", GetMetricReductionRuleStats451),
      "500": decodeError("GetMetricReductionRuleStats500", GetMetricReductionRuleStats500),
      "501": decodeError("GetMetricReductionRuleStats501", GetMetricReductionRuleStats501),
      orElse: unexpectedStatus
    }))
  ),
    "GetMetricReductionRuleTimeseries": (options) => HttpClientRequest.get(`/api/v2/metric_reduction_rules/timeseries`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetMetricReductionRuleTimeseries200),
      "401": decodeError("GetMetricReductionRuleTimeseries401", GetMetricReductionRuleTimeseries401),
      "403": decodeError("GetMetricReductionRuleTimeseries403", GetMetricReductionRuleTimeseries403),
      "451": decodeError("GetMetricReductionRuleTimeseries451", GetMetricReductionRuleTimeseries451),
      "500": decodeError("GetMetricReductionRuleTimeseries500", GetMetricReductionRuleTimeseries500),
      "501": decodeError("GetMetricReductionRuleTimeseries501", GetMetricReductionRuleTimeseries501),
      orElse: unexpectedStatus
    }))
  ),
    "ListMetrics": (options) => HttpClientRequest.get(`/api/v2/metrics`).pipe(
    HttpClientRequest.setUrlParams({ "start": options?.params?.["start"] as any, "end": options?.params?.["end"] as any, "limit": options?.params?.["limit"] as any, "searchText": options?.params?.["searchText"] as any, "source": options?.params?.["source"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListMetrics200),
      "400": decodeError("ListMetrics400", ListMetrics400),
      "401": decodeError("ListMetrics401", ListMetrics401),
      "403": decodeError("ListMetrics403", ListMetrics403),
      "500": decodeError("ListMetrics500", ListMetrics500),
      orElse: unexpectedStatus
    }))
  ),
    "GetMetricAlerts": (options) => HttpClientRequest.get(`/api/v2/metrics/alerts`).pipe(
    HttpClientRequest.setUrlParams({ "metricName": options.params["metricName"] as any }),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetMetricAlerts200),
      "400": decodeError("GetMetricAlerts400", GetMetricAlerts400),
      "401": decodeError("GetMetricAlerts401", GetMetricAlerts401),
      "403": decodeError("GetMetricAlerts403", GetMetricAlerts403),
      "404": decodeError("GetMetricAlerts404", GetMetricAlerts404),
      "500": decodeError("GetMetricAlerts500", GetMetricAlerts500),
      orElse: unexpectedStatus
    }))
  ),
    "GetMetricAttributes": (options) => HttpClientRequest.get(`/api/v2/metrics/attributes`).pipe(
    HttpClientRequest.setUrlParams({ "metricName": options.params["metricName"] as any, "start": options.params["start"] as any, "end": options.params["end"] as any }),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetMetricAttributes200),
      "400": decodeError("GetMetricAttributes400", GetMetricAttributes400),
      "401": decodeError("GetMetricAttributes401", GetMetricAttributes401),
      "403": decodeError("GetMetricAttributes403", GetMetricAttributes403),
      "404": decodeError("GetMetricAttributes404", GetMetricAttributes404),
      "500": decodeError("GetMetricAttributes500", GetMetricAttributes500),
      orElse: unexpectedStatus
    }))
  ),
    "GetMetricDashboards": (options) => HttpClientRequest.get(`/api/v2/metrics/dashboards`).pipe(
    HttpClientRequest.setUrlParams({ "metricName": options.params["metricName"] as any }),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetMetricDashboards200),
      "400": decodeError("GetMetricDashboards400", GetMetricDashboards400),
      "401": decodeError("GetMetricDashboards401", GetMetricDashboards401),
      "403": decodeError("GetMetricDashboards403", GetMetricDashboards403),
      "404": decodeError("GetMetricDashboards404", GetMetricDashboards404),
      "500": decodeError("GetMetricDashboards500", GetMetricDashboards500),
      orElse: unexpectedStatus
    }))
  ),
    "GetMetricHighlights": (options) => HttpClientRequest.get(`/api/v2/metrics/highlights`).pipe(
    HttpClientRequest.setUrlParams({ "metricName": options.params["metricName"] as any }),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetMetricHighlights200),
      "400": decodeError("GetMetricHighlights400", GetMetricHighlights400),
      "401": decodeError("GetMetricHighlights401", GetMetricHighlights401),
      "403": decodeError("GetMetricHighlights403", GetMetricHighlights403),
      "404": decodeError("GetMetricHighlights404", GetMetricHighlights404),
      "500": decodeError("GetMetricHighlights500", GetMetricHighlights500),
      orElse: unexpectedStatus
    }))
  ),
    "InspectMetrics": (options) => HttpClientRequest.post(`/api/v2/metrics/inspect`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(InspectMetrics200),
      "400": decodeError("InspectMetrics400", InspectMetrics400),
      "401": decodeError("InspectMetrics401", InspectMetrics401),
      "403": decodeError("InspectMetrics403", InspectMetrics403),
      "500": decodeError("InspectMetrics500", InspectMetrics500),
      orElse: unexpectedStatus
    }))
  ),
    "GetMetricMetadata": (options) => HttpClientRequest.get(`/api/v2/metrics/metadata`).pipe(
    HttpClientRequest.setUrlParams({ "metricName": options.params["metricName"] as any }),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetMetricMetadata200),
      "400": decodeError("GetMetricMetadata400", GetMetricMetadata400),
      "401": decodeError("GetMetricMetadata401", GetMetricMetadata401),
      "403": decodeError("GetMetricMetadata403", GetMetricMetadata403),
      "404": decodeError("GetMetricMetadata404", GetMetricMetadata404),
      "500": decodeError("GetMetricMetadata500", GetMetricMetadata500),
      orElse: unexpectedStatus
    }))
  ),
    "UpdateMetricMetadata": (options) => HttpClientRequest.post(`/api/v2/metrics/metadata`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("UpdateMetricMetadata400", UpdateMetricMetadata400),
      "401": decodeError("UpdateMetricMetadata401", UpdateMetricMetadata401),
      "403": decodeError("UpdateMetricMetadata403", UpdateMetricMetadata403),
      "500": decodeError("UpdateMetricMetadata500", UpdateMetricMetadata500),
      "200": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "GetMetricsOnboardingStatus": (options) => HttpClientRequest.get(`/api/v2/metrics/onboarding`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetMetricsOnboardingStatus200),
      "401": decodeError("GetMetricsOnboardingStatus401", GetMetricsOnboardingStatus401),
      "403": decodeError("GetMetricsOnboardingStatus403", GetMetricsOnboardingStatus403),
      "500": decodeError("GetMetricsOnboardingStatus500", GetMetricsOnboardingStatus500),
      orElse: unexpectedStatus
    }))
  ),
    "GetMetricsStats": (options) => HttpClientRequest.post(`/api/v2/metrics/stats`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetMetricsStats200),
      "400": decodeError("GetMetricsStats400", GetMetricsStats400),
      "401": decodeError("GetMetricsStats401", GetMetricsStats401),
      "403": decodeError("GetMetricsStats403", GetMetricsStats403),
      "500": decodeError("GetMetricsStats500", GetMetricsStats500),
      orElse: unexpectedStatus
    }))
  ),
    "GetMetricsTreemap": (options) => HttpClientRequest.post(`/api/v2/metrics/treemap`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetMetricsTreemap200),
      "400": decodeError("GetMetricsTreemap400", GetMetricsTreemap400),
      "401": decodeError("GetMetricsTreemap401", GetMetricsTreemap401),
      "403": decodeError("GetMetricsTreemap403", GetMetricsTreemap403),
      "500": decodeError("GetMetricsTreemap500", GetMetricsTreemap500),
      orElse: unexpectedStatus
    }))
  ),
    "GetMyOrganization": (options) => HttpClientRequest.get(`/api/v2/orgs/me`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetMyOrganization200),
      "401": decodeError("GetMyOrganization401", GetMyOrganization401),
      "403": decodeError("GetMyOrganization403", GetMyOrganization403),
      "500": decodeError("GetMyOrganization500", GetMyOrganization500),
      orElse: unexpectedStatus
    }))
  ),
    "UpdateMyOrganization": (options) => HttpClientRequest.put(`/api/v2/orgs/me`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("UpdateMyOrganization400", UpdateMyOrganization400),
      "401": decodeError("UpdateMyOrganization401", UpdateMyOrganization401),
      "403": decodeError("UpdateMyOrganization403", UpdateMyOrganization403),
      "409": decodeError("UpdateMyOrganization409", UpdateMyOrganization409),
      "500": decodeError("UpdateMyOrganization500", UpdateMyOrganization500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "GetPublicDashboardDataV2": (id, options) => HttpClientRequest.get(`/api/v2/public/dashboards/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetPublicDashboardDataV2200),
      "400": decodeError("GetPublicDashboardDataV2400", GetPublicDashboardDataV2400),
      "401": decodeError("GetPublicDashboardDataV2401", GetPublicDashboardDataV2401),
      "403": decodeError("GetPublicDashboardDataV2403", GetPublicDashboardDataV2403),
      "404": decodeError("GetPublicDashboardDataV2404", GetPublicDashboardDataV2404),
      "500": decodeError("GetPublicDashboardDataV2500", GetPublicDashboardDataV2500),
      orElse: unexpectedStatus
    }))
  ),
    "GetPublicDashboardPanelQueryRangeV2": (id, key, options) => HttpClientRequest.get(`/api/v2/public/dashboards/${id}/panels/${key}/query_range`).pipe(
    HttpClientRequest.setUrlParams({ "startTime": options?.params?.["startTime"] as any, "endTime": options?.params?.["endTime"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetPublicDashboardPanelQueryRangeV2200),
      "400": decodeError("GetPublicDashboardPanelQueryRangeV2400", GetPublicDashboardPanelQueryRangeV2400),
      "401": decodeError("GetPublicDashboardPanelQueryRangeV2401", GetPublicDashboardPanelQueryRangeV2401),
      "403": decodeError("GetPublicDashboardPanelQueryRangeV2403", GetPublicDashboardPanelQueryRangeV2403),
      "404": decodeError("GetPublicDashboardPanelQueryRangeV2404", GetPublicDashboardPanelQueryRangeV2404),
      "500": decodeError("GetPublicDashboardPanelQueryRangeV2500", GetPublicDashboardPanelQueryRangeV2500),
      orElse: unexpectedStatus
    }))
  ),
    "Readyz": (options) => HttpClientRequest.get(`/api/v2/readyz`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(Readyz200),
      "503": decodeError("Readyz503", Readyz503),
      orElse: unexpectedStatus
    }))
  ),
    "VerifyResetPasswordToken": (options) => HttpClientRequest.post(`/api/v2/reset_password_tokens/verify`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("VerifyResetPasswordToken400", VerifyResetPasswordToken400),
      "404": decodeError("VerifyResetPasswordToken404", VerifyResetPasswordToken404),
      "500": decodeError("VerifyResetPasswordToken500", VerifyResetPasswordToken500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "GetUsersByRoleID": (id, options) => HttpClientRequest.get(`/api/v2/roles/${id}/users`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetUsersByRoleID200),
      "401": decodeError("GetUsersByRoleID401", GetUsersByRoleID401),
      "403": decodeError("GetUsersByRoleID403", GetUsersByRoleID403),
      "404": decodeError("GetUsersByRoleID404", GetUsersByRoleID404),
      "500": decodeError("GetUsersByRoleID500", GetUsersByRoleID500),
      orElse: unexpectedStatus
    }))
  ),
    "ListRules": (options) => HttpClientRequest.get(`/api/v2/rules`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListRules200),
      "401": decodeError("ListRules401", ListRules401),
      "403": decodeError("ListRules403", ListRules403),
      "500": decodeError("ListRules500", ListRules500),
      orElse: unexpectedStatus
    }))
  ),
    "CreateRule": (options) => HttpClientRequest.post(`/api/v2/rules`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreateRule201),
      "400": decodeError("CreateRule400", CreateRule400),
      "401": decodeError("CreateRule401", CreateRule401),
      "403": decodeError("CreateRule403", CreateRule403),
      "500": decodeError("CreateRule500", CreateRule500),
      orElse: unexpectedStatus
    }))
  ),
    "GetRuleByID": (id, options) => HttpClientRequest.get(`/api/v2/rules/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetRuleByID200),
      "401": decodeError("GetRuleByID401", GetRuleByID401),
      "403": decodeError("GetRuleByID403", GetRuleByID403),
      "404": decodeError("GetRuleByID404", GetRuleByID404),
      "500": decodeError("GetRuleByID500", GetRuleByID500),
      orElse: unexpectedStatus
    }))
  ),
    "UpdateRuleByID": (id, options) => HttpClientRequest.put(`/api/v2/rules/${id}`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("UpdateRuleByID400", UpdateRuleByID400),
      "401": decodeError("UpdateRuleByID401", UpdateRuleByID401),
      "403": decodeError("UpdateRuleByID403", UpdateRuleByID403),
      "404": decodeError("UpdateRuleByID404", UpdateRuleByID404),
      "500": decodeError("UpdateRuleByID500", UpdateRuleByID500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "DeleteRuleByID": (id, options) => HttpClientRequest.delete(`/api/v2/rules/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "401": decodeError("DeleteRuleByID401", DeleteRuleByID401),
      "403": decodeError("DeleteRuleByID403", DeleteRuleByID403),
      "404": decodeError("DeleteRuleByID404", DeleteRuleByID404),
      "500": decodeError("DeleteRuleByID500", DeleteRuleByID500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "PatchRuleByID": (id, options) => HttpClientRequest.patch(`/api/v2/rules/${id}`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(PatchRuleByID200),
      "400": decodeError("PatchRuleByID400", PatchRuleByID400),
      "401": decodeError("PatchRuleByID401", PatchRuleByID401),
      "403": decodeError("PatchRuleByID403", PatchRuleByID403),
      "404": decodeError("PatchRuleByID404", PatchRuleByID404),
      "500": decodeError("PatchRuleByID500", PatchRuleByID500),
      orElse: unexpectedStatus
    }))
  ),
    "GetRuleHistoryFilterKeys": (id, options) => HttpClientRequest.get(`/api/v2/rules/${id}/history/filter_keys`).pipe(
    HttpClientRequest.setUrlParams({ "signal": options?.params?.["signal"] as any, "source": options?.params?.["source"] as any, "limit": options?.params?.["limit"] as any, "startUnixMilli": options?.params?.["startUnixMilli"] as any, "endUnixMilli": options?.params?.["endUnixMilli"] as any, "fieldContext": options?.params?.["fieldContext"] as any, "fieldDataType": options?.params?.["fieldDataType"] as any, "metricName": options?.params?.["metricName"] as any, "metricNamespace": options?.params?.["metricNamespace"] as any, "searchText": options?.params?.["searchText"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetRuleHistoryFilterKeys200),
      "400": decodeError("GetRuleHistoryFilterKeys400", GetRuleHistoryFilterKeys400),
      "401": decodeError("GetRuleHistoryFilterKeys401", GetRuleHistoryFilterKeys401),
      "403": decodeError("GetRuleHistoryFilterKeys403", GetRuleHistoryFilterKeys403),
      "500": decodeError("GetRuleHistoryFilterKeys500", GetRuleHistoryFilterKeys500),
      orElse: unexpectedStatus
    }))
  ),
    "GetRuleHistoryFilterValues": (id, options) => HttpClientRequest.get(`/api/v2/rules/${id}/history/filter_values`).pipe(
    HttpClientRequest.setUrlParams({ "signal": options?.params?.["signal"] as any, "source": options?.params?.["source"] as any, "limit": options?.params?.["limit"] as any, "startUnixMilli": options?.params?.["startUnixMilli"] as any, "endUnixMilli": options?.params?.["endUnixMilli"] as any, "fieldContext": options?.params?.["fieldContext"] as any, "fieldDataType": options?.params?.["fieldDataType"] as any, "metricName": options?.params?.["metricName"] as any, "metricNamespace": options?.params?.["metricNamespace"] as any, "searchText": options?.params?.["searchText"] as any, "name": options?.params?.["name"] as any, "existingQuery": options?.params?.["existingQuery"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetRuleHistoryFilterValues200),
      "400": decodeError("GetRuleHistoryFilterValues400", GetRuleHistoryFilterValues400),
      "401": decodeError("GetRuleHistoryFilterValues401", GetRuleHistoryFilterValues401),
      "403": decodeError("GetRuleHistoryFilterValues403", GetRuleHistoryFilterValues403),
      "500": decodeError("GetRuleHistoryFilterValues500", GetRuleHistoryFilterValues500),
      orElse: unexpectedStatus
    }))
  ),
    "GetRuleHistoryOverallStatus": (id, options) => HttpClientRequest.get(`/api/v2/rules/${id}/history/overall_status`).pipe(
    HttpClientRequest.setUrlParams({ "start": options.params["start"] as any, "end": options.params["end"] as any }),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetRuleHistoryOverallStatus200),
      "400": decodeError("GetRuleHistoryOverallStatus400", GetRuleHistoryOverallStatus400),
      "401": decodeError("GetRuleHistoryOverallStatus401", GetRuleHistoryOverallStatus401),
      "403": decodeError("GetRuleHistoryOverallStatus403", GetRuleHistoryOverallStatus403),
      "500": decodeError("GetRuleHistoryOverallStatus500", GetRuleHistoryOverallStatus500),
      orElse: unexpectedStatus
    }))
  ),
    "GetRuleHistoryStats": (id, options) => HttpClientRequest.get(`/api/v2/rules/${id}/history/stats`).pipe(
    HttpClientRequest.setUrlParams({ "start": options.params["start"] as any, "end": options.params["end"] as any }),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetRuleHistoryStats200),
      "400": decodeError("GetRuleHistoryStats400", GetRuleHistoryStats400),
      "401": decodeError("GetRuleHistoryStats401", GetRuleHistoryStats401),
      "403": decodeError("GetRuleHistoryStats403", GetRuleHistoryStats403),
      "500": decodeError("GetRuleHistoryStats500", GetRuleHistoryStats500),
      orElse: unexpectedStatus
    }))
  ),
    "GetRuleHistoryTimeline": (id, options) => HttpClientRequest.get(`/api/v2/rules/${id}/history/timeline`).pipe(
    HttpClientRequest.setUrlParams({ "start": options.params["start"] as any, "end": options.params["end"] as any, "state": options.params["state"] as any, "filterExpression": options.params["filterExpression"] as any, "limit": options.params["limit"] as any, "order": options.params["order"] as any, "cursor": options.params["cursor"] as any }),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetRuleHistoryTimeline200),
      "400": decodeError("GetRuleHistoryTimeline400", GetRuleHistoryTimeline400),
      "401": decodeError("GetRuleHistoryTimeline401", GetRuleHistoryTimeline401),
      "403": decodeError("GetRuleHistoryTimeline403", GetRuleHistoryTimeline403),
      "500": decodeError("GetRuleHistoryTimeline500", GetRuleHistoryTimeline500),
      orElse: unexpectedStatus
    }))
  ),
    "GetRuleHistoryTopContributors": (id, options) => HttpClientRequest.get(`/api/v2/rules/${id}/history/top_contributors`).pipe(
    HttpClientRequest.setUrlParams({ "start": options.params["start"] as any, "end": options.params["end"] as any }),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetRuleHistoryTopContributors200),
      "400": decodeError("GetRuleHistoryTopContributors400", GetRuleHistoryTopContributors400),
      "401": decodeError("GetRuleHistoryTopContributors401", GetRuleHistoryTopContributors401),
      "403": decodeError("GetRuleHistoryTopContributors403", GetRuleHistoryTopContributors403),
      "500": decodeError("GetRuleHistoryTopContributors500", GetRuleHistoryTopContributors500),
      orElse: unexpectedStatus
    }))
  ),
    "TestRule": (options) => HttpClientRequest.post(`/api/v2/rules/test`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(TestRule200),
      "400": decodeError("TestRule400", TestRule400),
      "401": decodeError("TestRule401", TestRule401),
      "403": decodeError("TestRule403", TestRule403),
      "500": decodeError("TestRule500", TestRule500),
      orElse: unexpectedStatus
    }))
  ),
    "DeleteSession": (options) => HttpClientRequest.delete(`/api/v2/sessions`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("DeleteSession400", DeleteSession400),
      "401": decodeError("DeleteSession401", DeleteSession401),
      "403": decodeError("DeleteSession403", DeleteSession403),
      "500": decodeError("DeleteSession500", DeleteSession500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "GetSessionContext": (options) => HttpClientRequest.get(`/api/v2/sessions/context`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetSessionContext200),
      "400": decodeError("GetSessionContext400", GetSessionContext400),
      "500": decodeError("GetSessionContext500", GetSessionContext500),
      orElse: unexpectedStatus
    }))
  ),
    "CreateSessionByEmailPassword": (options) => HttpClientRequest.post(`/api/v2/sessions/email_password`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreateSessionByEmailPassword200),
      "400": decodeError("CreateSessionByEmailPassword400", CreateSessionByEmailPassword400),
      "404": decodeError("CreateSessionByEmailPassword404", CreateSessionByEmailPassword404),
      "500": decodeError("CreateSessionByEmailPassword500", CreateSessionByEmailPassword500),
      orElse: unexpectedStatus
    }))
  ),
    "RotateSession": (options) => HttpClientRequest.post(`/api/v2/sessions/rotate`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RotateSession200),
      "400": decodeError("RotateSession400", RotateSession400),
      "500": decodeError("RotateSession500", RotateSession500),
      orElse: unexpectedStatus
    }))
  ),
    "CreateUserRole": (options) => HttpClientRequest.post(`/api/v2/user_roles`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreateUserRole201),
      "400": decodeError("CreateUserRole400", CreateUserRole400),
      "401": decodeError("CreateUserRole401", CreateUserRole401),
      "403": decodeError("CreateUserRole403", CreateUserRole403),
      "404": decodeError("CreateUserRole404", CreateUserRole404),
      "500": decodeError("CreateUserRole500", CreateUserRole500),
      orElse: unexpectedStatus
    }))
  ),
    "GetUserRole": (id, options) => HttpClientRequest.get(`/api/v2/user_roles/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetUserRole200),
      "400": decodeError("GetUserRole400", GetUserRole400),
      "401": decodeError("GetUserRole401", GetUserRole401),
      "403": decodeError("GetUserRole403", GetUserRole403),
      "404": decodeError("GetUserRole404", GetUserRole404),
      "500": decodeError("GetUserRole500", GetUserRole500),
      orElse: unexpectedStatus
    }))
  ),
    "DeleteUserRole": (id, options) => HttpClientRequest.delete(`/api/v2/user_roles/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("DeleteUserRole400", DeleteUserRole400),
      "401": decodeError("DeleteUserRole401", DeleteUserRole401),
      "403": decodeError("DeleteUserRole403", DeleteUserRole403),
      "404": decodeError("DeleteUserRole404", DeleteUserRole404),
      "500": decodeError("DeleteUserRole500", DeleteUserRole500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "ListUsers": (options) => HttpClientRequest.get(`/api/v2/users`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListUsers200),
      "401": decodeError("ListUsers401", ListUsers401),
      "403": decodeError("ListUsers403", ListUsers403),
      "500": decodeError("ListUsers500", ListUsers500),
      orElse: unexpectedStatus
    }))
  ),
    "CreateUser": (options) => HttpClientRequest.post(`/api/v2/users`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreateUser201),
      "400": decodeError("CreateUser400", CreateUser400),
      "401": decodeError("CreateUser401", CreateUser401),
      "403": decodeError("CreateUser403", CreateUser403),
      "409": decodeError("CreateUser409", CreateUser409),
      "500": decodeError("CreateUser500", CreateUser500),
      orElse: unexpectedStatus
    }))
  ),
    "GetUser": (id, options) => HttpClientRequest.get(`/api/v2/users/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetUser200),
      "401": decodeError("GetUser401", GetUser401),
      "403": decodeError("GetUser403", GetUser403),
      "404": decodeError("GetUser404", GetUser404),
      "500": decodeError("GetUser500", GetUser500),
      orElse: unexpectedStatus
    }))
  ),
    "UpdateUser": (id, options) => HttpClientRequest.put(`/api/v2/users/${id}`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("UpdateUser400", UpdateUser400),
      "401": decodeError("UpdateUser401", UpdateUser401),
      "403": decodeError("UpdateUser403", UpdateUser403),
      "404": decodeError("UpdateUser404", UpdateUser404),
      "500": decodeError("UpdateUser500", UpdateUser500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "DeleteUser": (id, options) => HttpClientRequest.delete(`/api/v2/users/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "401": decodeError("DeleteUser401", DeleteUser401),
      "403": decodeError("DeleteUser403", DeleteUser403),
      "404": decodeError("DeleteUser404", DeleteUser404),
      "500": decodeError("DeleteUser500", DeleteUser500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "GetResetPasswordToken": (id, options) => HttpClientRequest.get(`/api/v2/users/${id}/reset_password_tokens`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetResetPasswordToken200),
      "401": decodeError("GetResetPasswordToken401", GetResetPasswordToken401),
      "403": decodeError("GetResetPasswordToken403", GetResetPasswordToken403),
      "404": decodeError("GetResetPasswordToken404", GetResetPasswordToken404),
      "500": decodeError("GetResetPasswordToken500", GetResetPasswordToken500),
      orElse: unexpectedStatus
    }))
  ),
    "CreateResetPasswordToken": (id, options) => HttpClientRequest.put(`/api/v2/users/${id}/reset_password_tokens`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CreateResetPasswordToken201),
      "400": decodeError("CreateResetPasswordToken400", CreateResetPasswordToken400),
      "401": decodeError("CreateResetPasswordToken401", CreateResetPasswordToken401),
      "403": decodeError("CreateResetPasswordToken403", CreateResetPasswordToken403),
      "404": decodeError("CreateResetPasswordToken404", CreateResetPasswordToken404),
      "500": decodeError("CreateResetPasswordToken500", CreateResetPasswordToken500),
      orElse: unexpectedStatus
    }))
  ),
    "GetRolesByUserID": (id, options) => HttpClientRequest.get(`/api/v2/users/${id}/roles`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetRolesByUserID200),
      "401": decodeError("GetRolesByUserID401", GetRolesByUserID401),
      "403": decodeError("GetRolesByUserID403", GetRolesByUserID403),
      "404": decodeError("GetRolesByUserID404", GetRolesByUserID404),
      "500": decodeError("GetRolesByUserID500", GetRolesByUserID500),
      orElse: unexpectedStatus
    }))
  ),
    "SetRoleByUserID": (id, options) => HttpClientRequest.post(`/api/v2/users/${id}/roles`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "401": decodeError("SetRoleByUserID401", SetRoleByUserID401),
      "403": decodeError("SetRoleByUserID403", SetRoleByUserID403),
      "404": decodeError("SetRoleByUserID404", SetRoleByUserID404),
      "500": decodeError("SetRoleByUserID500", SetRoleByUserID500),
      "200": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "RemoveUserRoleByUserIDAndRoleID": (id, roleId, options) => HttpClientRequest.delete(`/api/v2/users/${id}/roles/${roleId}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "401": decodeError("RemoveUserRoleByUserIDAndRoleID401", RemoveUserRoleByUserIDAndRoleID401),
      "403": decodeError("RemoveUserRoleByUserIDAndRoleID403", RemoveUserRoleByUserIDAndRoleID403),
      "404": decodeError("RemoveUserRoleByUserIDAndRoleID404", RemoveUserRoleByUserIDAndRoleID404),
      "500": decodeError("RemoveUserRoleByUserIDAndRoleID500", RemoveUserRoleByUserIDAndRoleID500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "GetMyUser": (options) => HttpClientRequest.get(`/api/v2/users/me`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetMyUser200),
      "401": decodeError("GetMyUser401", GetMyUser401),
      "403": decodeError("GetMyUser403", GetMyUser403),
      "500": decodeError("GetMyUser500", GetMyUser500),
      orElse: unexpectedStatus
    }))
  ),
    "UpdateMyUserV2": (options) => HttpClientRequest.put(`/api/v2/users/me`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "401": decodeError("UpdateMyUserV2401", UpdateMyUserV2401),
      "403": decodeError("UpdateMyUserV2403", UpdateMyUserV2403),
      "500": decodeError("UpdateMyUserV2500", UpdateMyUserV2500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "ListDashboardsForUserV2": (options) => HttpClientRequest.get(`/api/v2/users/me/dashboards`).pipe(
    HttpClientRequest.setUrlParams({ "query": options?.params?.["query"] as any, "sort": options?.params?.["sort"] as any, "order": options?.params?.["order"] as any, "limit": options?.params?.["limit"] as any, "offset": options?.params?.["offset"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListDashboardsForUserV2200),
      "400": decodeError("ListDashboardsForUserV2400", ListDashboardsForUserV2400),
      "401": decodeError("ListDashboardsForUserV2401", ListDashboardsForUserV2401),
      "403": decodeError("ListDashboardsForUserV2403", ListDashboardsForUserV2403),
      "500": decodeError("ListDashboardsForUserV2500", ListDashboardsForUserV2500),
      orElse: unexpectedStatus
    }))
  ),
    "PinDashboardV2": (id, options) => HttpClientRequest.put(`/api/v2/users/me/dashboards/${id}/pins`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("PinDashboardV2400", PinDashboardV2400),
      "401": decodeError("PinDashboardV2401", PinDashboardV2401),
      "403": decodeError("PinDashboardV2403", PinDashboardV2403),
      "404": decodeError("PinDashboardV2404", PinDashboardV2404),
      "409": decodeError("PinDashboardV2409", PinDashboardV2409),
      "500": decodeError("PinDashboardV2500", PinDashboardV2500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "UnpinDashboardV2": (id, options) => HttpClientRequest.delete(`/api/v2/users/me/dashboards/${id}/pins`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("UnpinDashboardV2400", UnpinDashboardV2400),
      "401": decodeError("UnpinDashboardV2401", UnpinDashboardV2401),
      "403": decodeError("UnpinDashboardV2403", UnpinDashboardV2403),
      "500": decodeError("UnpinDashboardV2500", UnpinDashboardV2500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "UpdateMyPassword": (options) => HttpClientRequest.put(`/api/v2/users/me/factor_password`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("UpdateMyPassword400", UpdateMyPassword400),
      "401": decodeError("UpdateMyPassword401", UpdateMyPassword401),
      "403": decodeError("UpdateMyPassword403", UpdateMyPassword403),
      "404": decodeError("UpdateMyPassword404", UpdateMyPassword404),
      "500": decodeError("UpdateMyPassword500", UpdateMyPassword500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "GetHosts": (options) => HttpClientRequest.get(`/api/v2/zeus/hosts`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetHosts200),
      "400": decodeError("GetHosts400", GetHosts400),
      "401": decodeError("GetHosts401", GetHosts401),
      "403": decodeError("GetHosts403", GetHosts403),
      "404": decodeError("GetHosts404", GetHosts404),
      "500": decodeError("GetHosts500", GetHosts500),
      orElse: unexpectedStatus
    }))
  ),
    "PutHost": (options) => HttpClientRequest.put(`/api/v2/zeus/hosts`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("PutHost400", PutHost400),
      "401": decodeError("PutHost401", PutHost401),
      "403": decodeError("PutHost403", PutHost403),
      "404": decodeError("PutHost404", PutHost404),
      "409": decodeError("PutHost409", PutHost409),
      "500": decodeError("PutHost500", PutHost500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "PutProfile": (options) => HttpClientRequest.put(`/api/v2/zeus/profiles`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("PutProfile400", PutProfile400),
      "401": decodeError("PutProfile401", PutProfile401),
      "403": decodeError("PutProfile403", PutProfile403),
      "404": decodeError("PutProfile404", PutProfile404),
      "409": decodeError("PutProfile409", PutProfile409),
      "500": decodeError("PutProfile500", PutProfile500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "GetMetricDashboardsV2": (options) => HttpClientRequest.get(`/api/v3/metrics/dashboards`).pipe(
    HttpClientRequest.setUrlParams({ "metricName": options.params["metricName"] as any }),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetMetricDashboardsV2200),
      "400": decodeError("GetMetricDashboardsV2400", GetMetricDashboardsV2400),
      "401": decodeError("GetMetricDashboardsV2401", GetMetricDashboardsV2401),
      "403": decodeError("GetMetricDashboardsV2403", GetMetricDashboardsV2403),
      "404": decodeError("GetMetricDashboardsV2404", GetMetricDashboardsV2404),
      "500": decodeError("GetMetricDashboardsV2500", GetMetricDashboardsV2500),
      orElse: unexpectedStatus
    }))
  ),
    "GetFlamegraph": (traceID, options) => HttpClientRequest.post(`/api/v3/traces/${traceID}/flamegraph`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetFlamegraph200),
      "400": decodeError("GetFlamegraph400", GetFlamegraph400),
      "401": decodeError("GetFlamegraph401", GetFlamegraph401),
      "403": decodeError("GetFlamegraph403", GetFlamegraph403),
      "404": decodeError("GetFlamegraph404", GetFlamegraph404),
      "500": decodeError("GetFlamegraph500", GetFlamegraph500),
      orElse: unexpectedStatus
    }))
  ),
    "GetWaterfallV4": (traceID, options) => HttpClientRequest.post(`/api/v4/traces/${traceID}/waterfall`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetWaterfallV4200),
      "400": decodeError("GetWaterfallV4400", GetWaterfallV4400),
      "401": decodeError("GetWaterfallV4401", GetWaterfallV4401),
      "403": decodeError("GetWaterfallV4403", GetWaterfallV4403),
      "404": decodeError("GetWaterfallV4404", GetWaterfallV4404),
      "500": decodeError("GetWaterfallV4500", GetWaterfallV4500),
      orElse: unexpectedStatus
    }))
  ),
    "QueryRangeV5": (options) => HttpClientRequest.post(`/api/v5/query_range`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(QueryRangeV5200),
      "400": decodeError("QueryRangeV5400", QueryRangeV5400),
      "401": decodeError("QueryRangeV5401", QueryRangeV5401),
      "403": decodeError("QueryRangeV5403", QueryRangeV5403),
      "500": decodeError("QueryRangeV5500", QueryRangeV5500),
      orElse: unexpectedStatus
    }))
  ),
    "QueryRangePreviewV5": (options) => HttpClientRequest.post(`/api/v5/query_range/preview`).pipe(
    HttpClientRequest.setUrlParams({ "verbose": options.params?.["verbose"] as any }),
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(QueryRangePreviewV5200),
      "400": decodeError("QueryRangePreviewV5400", QueryRangePreviewV5400),
      "401": decodeError("QueryRangePreviewV5401", QueryRangePreviewV5401),
      "403": decodeError("QueryRangePreviewV5403", QueryRangePreviewV5403),
      "500": decodeError("QueryRangePreviewV5500", QueryRangePreviewV5500),
      orElse: unexpectedStatus
    }))
  ),
    "ReplaceVariables": (options) => HttpClientRequest.post(`/api/v5/substitute_vars`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ReplaceVariables200),
      "400": decodeError("ReplaceVariables400", ReplaceVariables400),
      "401": decodeError("ReplaceVariables401", ReplaceVariables401),
      "403": decodeError("ReplaceVariables403", ReplaceVariables403),
      "500": decodeError("ReplaceVariables500", ReplaceVariables500),
      orElse: unexpectedStatus
    }))
  )
  }
}

export interface SigNoz {
  readonly httpClient: HttpClient.HttpClient
  /**
* This endpoint returns alerts for the organization
*/
readonly "GetAlerts": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetAlerts200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetAlerts401", typeof GetAlerts401.Type> | SigNozError<"GetAlerts403", typeof GetAlerts403.Type> | SigNozError<"GetAlerts500", typeof GetAlerts500.Type>>
  /**
* Checks if the authenticated user has permissions for given transactions
*/
readonly "AuthzCheck": <Config extends OperationConfig>(options: { readonly payload: typeof AuthzCheckRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof AuthzCheck200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"AuthzCheck500", typeof AuthzCheck500.Type>>
  /**
* This endpoint lists all notification channels for the organization
*/
readonly "ListChannels": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ListChannels200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ListChannels401", typeof ListChannels401.Type> | SigNozError<"ListChannels403", typeof ListChannels403.Type> | SigNozError<"ListChannels500", typeof ListChannels500.Type>>
  /**
* This endpoint creates a notification channel
*/
readonly "CreateChannel": <Config extends OperationConfig>(options: { readonly payload: typeof CreateChannelRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof CreateChannel201.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"CreateChannel400", typeof CreateChannel400.Type> | SigNozError<"CreateChannel401", typeof CreateChannel401.Type> | SigNozError<"CreateChannel403", typeof CreateChannel403.Type> | SigNozError<"CreateChannel500", typeof CreateChannel500.Type>>
  /**
* This endpoint returns a notification channel by ID
*/
readonly "GetChannelByID": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetChannelByID200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetChannelByID401", typeof GetChannelByID401.Type> | SigNozError<"GetChannelByID403", typeof GetChannelByID403.Type> | SigNozError<"GetChannelByID404", typeof GetChannelByID404.Type> | SigNozError<"GetChannelByID500", typeof GetChannelByID500.Type>>
  /**
* This endpoint updates a notification channel by ID
*/
readonly "UpdateChannelByID": <Config extends OperationConfig>(id: string, options: { readonly payload: typeof UpdateChannelByIDRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"UpdateChannelByID400", typeof UpdateChannelByID400.Type> | SigNozError<"UpdateChannelByID401", typeof UpdateChannelByID401.Type> | SigNozError<"UpdateChannelByID403", typeof UpdateChannelByID403.Type> | SigNozError<"UpdateChannelByID404", typeof UpdateChannelByID404.Type> | SigNozError<"UpdateChannelByID500", typeof UpdateChannelByID500.Type>>
  /**
* This endpoint deletes a notification channel by ID
*/
readonly "DeleteChannelByID": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"DeleteChannelByID401", typeof DeleteChannelByID401.Type> | SigNozError<"DeleteChannelByID403", typeof DeleteChannelByID403.Type> | SigNozError<"DeleteChannelByID404", typeof DeleteChannelByID404.Type> | SigNozError<"DeleteChannelByID500", typeof DeleteChannelByID500.Type>>
  /**
* This endpoint tests a notification channel by sending a test notification
*/
readonly "TestChannel": <Config extends OperationConfig>(options: { readonly payload: typeof TestChannelRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"TestChannel400", typeof TestChannel400.Type> | SigNozError<"TestChannel401", typeof TestChannel401.Type> | SigNozError<"TestChannel403", typeof TestChannel403.Type> | SigNozError<"TestChannel500", typeof TestChannel500.Type>>
  /**
* [Deprecated] This endpoint is called by the deployed agent to check in
*/
readonly "AgentCheckInDeprecated": <Config extends OperationConfig>(cloudProvider: string, options: { readonly payload: typeof AgentCheckInDeprecatedRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof AgentCheckInDeprecated200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"AgentCheckInDeprecated401", typeof AgentCheckInDeprecated401.Type> | SigNozError<"AgentCheckInDeprecated403", typeof AgentCheckInDeprecated403.Type> | SigNozError<"AgentCheckInDeprecated500", typeof AgentCheckInDeprecated500.Type>>
  /**
* This endpoint lists the accounts for the specified cloud provider
*/
readonly "ListAccounts": <Config extends OperationConfig>(cloudProvider: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ListAccounts200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ListAccounts401", typeof ListAccounts401.Type> | SigNozError<"ListAccounts403", typeof ListAccounts403.Type> | SigNozError<"ListAccounts500", typeof ListAccounts500.Type>>
  /**
* This endpoint creates a new cloud integration account for the specified cloud provider
*/
readonly "CreateAccount": <Config extends OperationConfig>(cloudProvider: string, options: { readonly payload: typeof CreateAccountRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof CreateAccount201.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"CreateAccount401", typeof CreateAccount401.Type> | SigNozError<"CreateAccount403", typeof CreateAccount403.Type> | SigNozError<"CreateAccount500", typeof CreateAccount500.Type>>
  /**
* This endpoint gets an account for the specified cloud provider
*/
readonly "GetAccount": <Config extends OperationConfig>(cloudProvider: string, id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetAccount200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetAccount400", typeof GetAccount400.Type> | SigNozError<"GetAccount401", typeof GetAccount401.Type> | SigNozError<"GetAccount403", typeof GetAccount403.Type> | SigNozError<"GetAccount404", typeof GetAccount404.Type> | SigNozError<"GetAccount500", typeof GetAccount500.Type>>
  /**
* This endpoint updates an account for the specified cloud provider
*/
readonly "UpdateAccount": <Config extends OperationConfig>(cloudProvider: string, id: string, options: { readonly payload: typeof UpdateAccountRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"UpdateAccount401", typeof UpdateAccount401.Type> | SigNozError<"UpdateAccount403", typeof UpdateAccount403.Type> | SigNozError<"UpdateAccount500", typeof UpdateAccount500.Type>>
  /**
* This endpoint disconnects an account for the specified cloud provider
*/
readonly "DisconnectAccount": <Config extends OperationConfig>(cloudProvider: string, id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"DisconnectAccount401", typeof DisconnectAccount401.Type> | SigNozError<"DisconnectAccount403", typeof DisconnectAccount403.Type> | SigNozError<"DisconnectAccount500", typeof DisconnectAccount500.Type>>
  /**
* This endpoint lists the services metadata for the specified account and cloud provider
*/
readonly "ListAccountServicesMetadata": <Config extends OperationConfig>(cloudProvider: string, id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ListAccountServicesMetadata200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ListAccountServicesMetadata401", typeof ListAccountServicesMetadata401.Type> | SigNozError<"ListAccountServicesMetadata403", typeof ListAccountServicesMetadata403.Type> | SigNozError<"ListAccountServicesMetadata500", typeof ListAccountServicesMetadata500.Type>>
  /**
* This endpoint gets a service and its configuration for the specified cloud integration account
*/
readonly "GetAccountService": <Config extends OperationConfig>(cloudProvider: string, id: string, serviceId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetAccountService200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetAccountService400", typeof GetAccountService400.Type> | SigNozError<"GetAccountService401", typeof GetAccountService401.Type> | SigNozError<"GetAccountService403", typeof GetAccountService403.Type> | SigNozError<"GetAccountService404", typeof GetAccountService404.Type> | SigNozError<"GetAccountService500", typeof GetAccountService500.Type>>
  /**
* This endpoint updates a service for the specified cloud provider
*/
readonly "UpdateService": <Config extends OperationConfig>(cloudProvider: string, id: string, serviceId: string, options: { readonly payload: typeof UpdateServiceRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"UpdateService401", typeof UpdateService401.Type> | SigNozError<"UpdateService403", typeof UpdateService403.Type> | SigNozError<"UpdateService500", typeof UpdateService500.Type>>
  /**
* This endpoint is called by the deployed agent to check in
*/
readonly "AgentCheckIn": <Config extends OperationConfig>(cloudProvider: string, options: { readonly payload: typeof AgentCheckInRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof AgentCheckIn200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"AgentCheckIn401", typeof AgentCheckIn401.Type> | SigNozError<"AgentCheckIn403", typeof AgentCheckIn403.Type> | SigNozError<"AgentCheckIn500", typeof AgentCheckIn500.Type>>
  /**
* This endpoint retrieves the connection credentials required for integration
*/
readonly "GetConnectionCredentials": <Config extends OperationConfig>(cloudProvider: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetConnectionCredentials200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetConnectionCredentials401", typeof GetConnectionCredentials401.Type> | SigNozError<"GetConnectionCredentials403", typeof GetConnectionCredentials403.Type> | SigNozError<"GetConnectionCredentials500", typeof GetConnectionCredentials500.Type>>
  /**
* This endpoint lists the services metadata for the specified cloud provider
*/
readonly "ListServicesMetadata": <Config extends OperationConfig>(cloudProvider: string, options: { readonly params?: typeof ListServicesMetadataParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ListServicesMetadata200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ListServicesMetadata401", typeof ListServicesMetadata401.Type> | SigNozError<"ListServicesMetadata403", typeof ListServicesMetadata403.Type> | SigNozError<"ListServicesMetadata500", typeof ListServicesMetadata500.Type>>
  /**
* This endpoint gets a service for the specified cloud provider
*/
readonly "GetService": <Config extends OperationConfig>(cloudProvider: string, serviceId: string, options: { readonly params?: typeof GetServiceParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetService200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetService401", typeof GetService401.Type> | SigNozError<"GetService403", typeof GetService403.Type> | SigNozError<"GetService500", typeof GetService500.Type>>
  /**
* This endpoint creates a session for a user using google callback
*/
readonly "CreateSessionByGoogleCallback": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof CreateSessionByGoogleCallback303.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"CreateSessionByGoogleCallback400", typeof CreateSessionByGoogleCallback400.Type> | SigNozError<"CreateSessionByGoogleCallback404", typeof CreateSessionByGoogleCallback404.Type> | SigNozError<"CreateSessionByGoogleCallback500", typeof CreateSessionByGoogleCallback500.Type>>
  /**
* This endpoint creates a session for a user using oidc callback
*/
readonly "CreateSessionByOIDCCallback": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof CreateSessionByOIDCCallback303.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"CreateSessionByOIDCCallback400", typeof CreateSessionByOIDCCallback400.Type> | SigNozError<"CreateSessionByOIDCCallback404", typeof CreateSessionByOIDCCallback404.Type> | SigNozError<"CreateSessionByOIDCCallback451", typeof CreateSessionByOIDCCallback451.Type> | SigNozError<"CreateSessionByOIDCCallback500", typeof CreateSessionByOIDCCallback500.Type>>
  /**
* This endpoint creates a session for a user using saml callback
*/
readonly "CreateSessionBySAMLCallback": <Config extends OperationConfig>(options: { readonly params?: typeof CreateSessionBySAMLCallbackParams.Encoded | undefined; readonly payload: typeof CreateSessionBySAMLCallbackRequestFormUrlEncoded.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof CreateSessionBySAMLCallback303.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"CreateSessionBySAMLCallback400", typeof CreateSessionBySAMLCallback400.Type> | SigNozError<"CreateSessionBySAMLCallback404", typeof CreateSessionBySAMLCallback404.Type> | SigNozError<"CreateSessionBySAMLCallback451", typeof CreateSessionBySAMLCallback451.Type> | SigNozError<"CreateSessionBySAMLCallback500", typeof CreateSessionBySAMLCallback500.Type>>
  /**
* This endpoint returns public sharing config for a dashboard
*/
readonly "GetPublicDashboard": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetPublicDashboard200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetPublicDashboard401", typeof GetPublicDashboard401.Type> | SigNozError<"GetPublicDashboard403", typeof GetPublicDashboard403.Type> | SigNozError<"GetPublicDashboard500", typeof GetPublicDashboard500.Type>>
  /**
* This endpoint updates the public sharing config for a dashboard
*/
readonly "UpdatePublicDashboard": <Config extends OperationConfig>(id: string, options: { readonly payload: typeof UpdatePublicDashboardRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"UpdatePublicDashboard401", typeof UpdatePublicDashboard401.Type> | SigNozError<"UpdatePublicDashboard403", typeof UpdatePublicDashboard403.Type> | SigNozError<"UpdatePublicDashboard500", typeof UpdatePublicDashboard500.Type>>
  /**
* This endpoint creates public sharing config and enables public sharing of the dashboard
*/
readonly "CreatePublicDashboard": <Config extends OperationConfig>(id: string, options: { readonly payload: typeof CreatePublicDashboardRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof CreatePublicDashboard201.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"CreatePublicDashboard401", typeof CreatePublicDashboard401.Type> | SigNozError<"CreatePublicDashboard403", typeof CreatePublicDashboard403.Type> | SigNozError<"CreatePublicDashboard500", typeof CreatePublicDashboard500.Type>>
  /**
* This endpoint deletes the public sharing config and disables the public sharing of a dashboard
*/
readonly "DeletePublicDashboard": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"DeletePublicDashboard401", typeof DeletePublicDashboard401.Type> | SigNozError<"DeletePublicDashboard403", typeof DeletePublicDashboard403.Type> | SigNozError<"DeletePublicDashboard500", typeof DeletePublicDashboard500.Type>>
  /**
* This endpoint lists all auth domains
*/
readonly "ListAuthDomains": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ListAuthDomains200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ListAuthDomains401", typeof ListAuthDomains401.Type> | SigNozError<"ListAuthDomains403", typeof ListAuthDomains403.Type> | SigNozError<"ListAuthDomains500", typeof ListAuthDomains500.Type>>
  /**
* This endpoint creates an auth domain
*/
readonly "CreateAuthDomain": <Config extends OperationConfig>(options: { readonly payload: typeof CreateAuthDomainRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof CreateAuthDomain201.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"CreateAuthDomain400", typeof CreateAuthDomain400.Type> | SigNozError<"CreateAuthDomain401", typeof CreateAuthDomain401.Type> | SigNozError<"CreateAuthDomain403", typeof CreateAuthDomain403.Type> | SigNozError<"CreateAuthDomain409", typeof CreateAuthDomain409.Type> | SigNozError<"CreateAuthDomain500", typeof CreateAuthDomain500.Type>>
  /**
* This endpoint returns an auth domain by ID
*/
readonly "GetAuthDomain": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetAuthDomain200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetAuthDomain401", typeof GetAuthDomain401.Type> | SigNozError<"GetAuthDomain403", typeof GetAuthDomain403.Type> | SigNozError<"GetAuthDomain404", typeof GetAuthDomain404.Type> | SigNozError<"GetAuthDomain500", typeof GetAuthDomain500.Type>>
  /**
* This endpoint updates an auth domain
*/
readonly "UpdateAuthDomain": <Config extends OperationConfig>(id: string, options: { readonly payload: typeof UpdateAuthDomainRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"UpdateAuthDomain400", typeof UpdateAuthDomain400.Type> | SigNozError<"UpdateAuthDomain401", typeof UpdateAuthDomain401.Type> | SigNozError<"UpdateAuthDomain403", typeof UpdateAuthDomain403.Type> | SigNozError<"UpdateAuthDomain409", typeof UpdateAuthDomain409.Type> | SigNozError<"UpdateAuthDomain500", typeof UpdateAuthDomain500.Type>>
  /**
* This endpoint deletes an auth domain
*/
readonly "DeleteAuthDomain": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"DeleteAuthDomain400", typeof DeleteAuthDomain400.Type> | SigNozError<"DeleteAuthDomain401", typeof DeleteAuthDomain401.Type> | SigNozError<"DeleteAuthDomain403", typeof DeleteAuthDomain403.Type> | SigNozError<"DeleteAuthDomain500", typeof DeleteAuthDomain500.Type>>
  /**
* This endpoint lists all planned maintenance / downtime schedules
*/
readonly "ListDowntimeSchedules": <Config extends OperationConfig>(options: { readonly params?: typeof ListDowntimeSchedulesParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ListDowntimeSchedules200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ListDowntimeSchedules401", typeof ListDowntimeSchedules401.Type> | SigNozError<"ListDowntimeSchedules403", typeof ListDowntimeSchedules403.Type> | SigNozError<"ListDowntimeSchedules500", typeof ListDowntimeSchedules500.Type>>
  /**
* This endpoint creates a new planned maintenance / downtime schedule
*/
readonly "CreateDowntimeSchedule": <Config extends OperationConfig>(options: { readonly payload: typeof CreateDowntimeScheduleRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof CreateDowntimeSchedule201.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"CreateDowntimeSchedule400", typeof CreateDowntimeSchedule400.Type> | SigNozError<"CreateDowntimeSchedule401", typeof CreateDowntimeSchedule401.Type> | SigNozError<"CreateDowntimeSchedule403", typeof CreateDowntimeSchedule403.Type> | SigNozError<"CreateDowntimeSchedule500", typeof CreateDowntimeSchedule500.Type>>
  /**
* This endpoint returns a downtime schedule by ID
*/
readonly "GetDowntimeScheduleByID": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetDowntimeScheduleByID200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetDowntimeScheduleByID401", typeof GetDowntimeScheduleByID401.Type> | SigNozError<"GetDowntimeScheduleByID403", typeof GetDowntimeScheduleByID403.Type> | SigNozError<"GetDowntimeScheduleByID404", typeof GetDowntimeScheduleByID404.Type> | SigNozError<"GetDowntimeScheduleByID500", typeof GetDowntimeScheduleByID500.Type>>
  /**
* This endpoint updates a downtime schedule by ID
*/
readonly "UpdateDowntimeScheduleByID": <Config extends OperationConfig>(id: string, options: { readonly payload: typeof UpdateDowntimeScheduleByIDRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"UpdateDowntimeScheduleByID400", typeof UpdateDowntimeScheduleByID400.Type> | SigNozError<"UpdateDowntimeScheduleByID401", typeof UpdateDowntimeScheduleByID401.Type> | SigNozError<"UpdateDowntimeScheduleByID403", typeof UpdateDowntimeScheduleByID403.Type> | SigNozError<"UpdateDowntimeScheduleByID404", typeof UpdateDowntimeScheduleByID404.Type> | SigNozError<"UpdateDowntimeScheduleByID500", typeof UpdateDowntimeScheduleByID500.Type>>
  /**
* This endpoint deletes a downtime schedule by ID
*/
readonly "DeleteDowntimeScheduleByID": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"DeleteDowntimeScheduleByID401", typeof DeleteDowntimeScheduleByID401.Type> | SigNozError<"DeleteDowntimeScheduleByID403", typeof DeleteDowntimeScheduleByID403.Type> | SigNozError<"DeleteDowntimeScheduleByID404", typeof DeleteDowntimeScheduleByID404.Type> | SigNozError<"DeleteDowntimeScheduleByID500", typeof DeleteDowntimeScheduleByID500.Type>>
  /**
* This endpoints allows complex query exporting raw data for traces and logs
*/
readonly "HandleExportRawDataPOST": <Config extends OperationConfig>(options: { readonly params?: typeof HandleExportRawDataPOSTParams.Encoded | undefined; readonly payload: typeof HandleExportRawDataPOSTRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"HandleExportRawDataPOST400", typeof HandleExportRawDataPOST400.Type> | SigNozError<"HandleExportRawDataPOST401", typeof HandleExportRawDataPOST401.Type> | SigNozError<"HandleExportRawDataPOST403", typeof HandleExportRawDataPOST403.Type> | SigNozError<"HandleExportRawDataPOST500", typeof HandleExportRawDataPOST500.Type>>
  /**
* This endpoint returns field keys
*/
readonly "GetFieldsKeys": <Config extends OperationConfig>(options: { readonly params?: typeof GetFieldsKeysParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetFieldsKeys200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetFieldsKeys401", typeof GetFieldsKeys401.Type> | SigNozError<"GetFieldsKeys403", typeof GetFieldsKeys403.Type> | SigNozError<"GetFieldsKeys500", typeof GetFieldsKeys500.Type>>
  /**
* This endpoint returns field values
*/
readonly "GetFieldsValues": <Config extends OperationConfig>(options: { readonly params?: typeof GetFieldsValuesParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetFieldsValues200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetFieldsValues401", typeof GetFieldsValues401.Type> | SigNozError<"GetFieldsValues403", typeof GetFieldsValues403.Type> | SigNozError<"GetFieldsValues500", typeof GetFieldsValues500.Type>>
  /**
* This endpoint returns the reset password token by id
*/
readonly "GetResetPasswordTokenDeprecated": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetResetPasswordTokenDeprecated200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetResetPasswordTokenDeprecated400", typeof GetResetPasswordTokenDeprecated400.Type> | SigNozError<"GetResetPasswordTokenDeprecated401", typeof GetResetPasswordTokenDeprecated401.Type> | SigNozError<"GetResetPasswordTokenDeprecated403", typeof GetResetPasswordTokenDeprecated403.Type> | SigNozError<"GetResetPasswordTokenDeprecated404", typeof GetResetPasswordTokenDeprecated404.Type> | SigNozError<"GetResetPasswordTokenDeprecated500", typeof GetResetPasswordTokenDeprecated500.Type>>
  /**
* This endpoint returns global config
*/
readonly "GetGlobalConfig": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetGlobalConfig200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetGlobalConfig500", typeof GetGlobalConfig500.Type>>
  /**
* This endpoint creates an invite for a user
*/
readonly "CreateInvite": <Config extends OperationConfig>(options: { readonly payload: typeof CreateInviteRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof CreateInvite201.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"CreateInvite400", typeof CreateInvite400.Type> | SigNozError<"CreateInvite401", typeof CreateInvite401.Type> | SigNozError<"CreateInvite403", typeof CreateInvite403.Type> | SigNozError<"CreateInvite409", typeof CreateInvite409.Type> | SigNozError<"CreateInvite500", typeof CreateInvite500.Type>>
  /**
* This endpoint creates a bulk invite for a user
*/
readonly "CreateBulkInvite": <Config extends OperationConfig>(options: { readonly payload: typeof CreateBulkInviteRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"CreateBulkInvite400", typeof CreateBulkInvite400.Type> | SigNozError<"CreateBulkInvite401", typeof CreateBulkInvite401.Type> | SigNozError<"CreateBulkInvite403", typeof CreateBulkInvite403.Type> | SigNozError<"CreateBulkInvite409", typeof CreateBulkInvite409.Type> | SigNozError<"CreateBulkInvite500", typeof CreateBulkInvite500.Type>>
  /**
* Returns all LLM pricing rules for the authenticated org, with pagination.
*/
readonly "ListLLMPricingRules": <Config extends OperationConfig>(options: { readonly params?: typeof ListLLMPricingRulesParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ListLLMPricingRules200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ListLLMPricingRules400", typeof ListLLMPricingRules400.Type> | SigNozError<"ListLLMPricingRules401", typeof ListLLMPricingRules401.Type> | SigNozError<"ListLLMPricingRules403", typeof ListLLMPricingRules403.Type> | SigNozError<"ListLLMPricingRules500", typeof ListLLMPricingRules500.Type>>
  /**
* Single write endpoint used by both the user and the Zeus sync job. Per-rule match is by id, then sourceId, then insert. Override rows (is_override=true) are fully preserved when the request does not provide isOverride; only synced_at is stamped.
*/
readonly "CreateOrUpdateLLMPricingRules": <Config extends OperationConfig>(options: { readonly payload: typeof CreateOrUpdateLLMPricingRulesRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"CreateOrUpdateLLMPricingRules400", typeof CreateOrUpdateLLMPricingRules400.Type> | SigNozError<"CreateOrUpdateLLMPricingRules401", typeof CreateOrUpdateLLMPricingRules401.Type> | SigNozError<"CreateOrUpdateLLMPricingRules403", typeof CreateOrUpdateLLMPricingRules403.Type> | SigNozError<"CreateOrUpdateLLMPricingRules500", typeof CreateOrUpdateLLMPricingRules500.Type>>
  /**
* Returns a single LLM pricing rule by ID.
*/
readonly "GetLLMPricingRule": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetLLMPricingRule200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetLLMPricingRule401", typeof GetLLMPricingRule401.Type> | SigNozError<"GetLLMPricingRule403", typeof GetLLMPricingRule403.Type> | SigNozError<"GetLLMPricingRule404", typeof GetLLMPricingRule404.Type> | SigNozError<"GetLLMPricingRule500", typeof GetLLMPricingRule500.Type>>
  /**
* Hard-deletes a pricing rule. If auto-synced, it will be recreated on the next sync cycle.
*/
readonly "DeleteLLMPricingRule": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"DeleteLLMPricingRule401", typeof DeleteLLMPricingRule401.Type> | SigNozError<"DeleteLLMPricingRule403", typeof DeleteLLMPricingRule403.Type> | SigNozError<"DeleteLLMPricingRule404", typeof DeleteLLMPricingRule404.Type> | SigNozError<"DeleteLLMPricingRule500", typeof DeleteLLMPricingRule500.Type>>
  /**
* Returns models seen in the last hour of trace data (gen_ai.request.model) that no pricing rule pattern matches, so the user can add them to an existing rule or create a new one.
*/
readonly "ListUnmappedLLMModels": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ListUnmappedLLMModels200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ListUnmappedLLMModels400", typeof ListUnmappedLLMModels400.Type> | SigNozError<"ListUnmappedLLMModels401", typeof ListUnmappedLLMModels401.Type> | SigNozError<"ListUnmappedLLMModels403", typeof ListUnmappedLLMModels403.Type> | SigNozError<"ListUnmappedLLMModels500", typeof ListUnmappedLLMModels500.Type>>
  /**
* This endpoints promotes and indexes paths
*/
readonly "ListPromotedAndIndexedPaths": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ListPromotedAndIndexedPaths200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ListPromotedAndIndexedPaths400", typeof ListPromotedAndIndexedPaths400.Type> | SigNozError<"ListPromotedAndIndexedPaths401", typeof ListPromotedAndIndexedPaths401.Type> | SigNozError<"ListPromotedAndIndexedPaths403", typeof ListPromotedAndIndexedPaths403.Type> | SigNozError<"ListPromotedAndIndexedPaths500", typeof ListPromotedAndIndexedPaths500.Type>>
  /**
* This endpoints promotes and indexes paths
*/
readonly "HandlePromoteAndIndexPaths": <Config extends OperationConfig>(options: { readonly payload: typeof HandlePromoteAndIndexPathsRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"HandlePromoteAndIndexPaths400", typeof HandlePromoteAndIndexPaths400.Type> | SigNozError<"HandlePromoteAndIndexPaths401", typeof HandlePromoteAndIndexPaths401.Type> | SigNozError<"HandlePromoteAndIndexPaths403", typeof HandlePromoteAndIndexPaths403.Type> | SigNozError<"HandlePromoteAndIndexPaths500", typeof HandlePromoteAndIndexPaths500.Type>>
  /**
* This endpoint lists all org preferences
*/
readonly "ListOrgPreferences": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ListOrgPreferences200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ListOrgPreferences401", typeof ListOrgPreferences401.Type> | SigNozError<"ListOrgPreferences403", typeof ListOrgPreferences403.Type> | SigNozError<"ListOrgPreferences500", typeof ListOrgPreferences500.Type>>
  /**
* This endpoint returns the org preference by name
*/
readonly "GetOrgPreference": <Config extends OperationConfig>(name: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetOrgPreference200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetOrgPreference400", typeof GetOrgPreference400.Type> | SigNozError<"GetOrgPreference401", typeof GetOrgPreference401.Type> | SigNozError<"GetOrgPreference403", typeof GetOrgPreference403.Type> | SigNozError<"GetOrgPreference404", typeof GetOrgPreference404.Type> | SigNozError<"GetOrgPreference500", typeof GetOrgPreference500.Type>>
  /**
* This endpoint updates the org preference by name
*/
readonly "UpdateOrgPreference": <Config extends OperationConfig>(name: string, options: { readonly payload: typeof UpdateOrgPreferenceRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"UpdateOrgPreference400", typeof UpdateOrgPreference400.Type> | SigNozError<"UpdateOrgPreference401", typeof UpdateOrgPreference401.Type> | SigNozError<"UpdateOrgPreference403", typeof UpdateOrgPreference403.Type> | SigNozError<"UpdateOrgPreference404", typeof UpdateOrgPreference404.Type> | SigNozError<"UpdateOrgPreference500", typeof UpdateOrgPreference500.Type>>
  /**
* This endpoint returns the sanitized dashboard data for public access
*/
readonly "GetPublicDashboardData": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetPublicDashboardData200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetPublicDashboardData401", typeof GetPublicDashboardData401.Type> | SigNozError<"GetPublicDashboardData403", typeof GetPublicDashboardData403.Type> | SigNozError<"GetPublicDashboardData500", typeof GetPublicDashboardData500.Type>>
  /**
* This endpoint return query range results for a widget of public dashboard
*/
readonly "GetPublicDashboardWidgetQueryRange": <Config extends OperationConfig>(id: string, idx: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetPublicDashboardWidgetQueryRange200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetPublicDashboardWidgetQueryRange401", typeof GetPublicDashboardWidgetQueryRange401.Type> | SigNozError<"GetPublicDashboardWidgetQueryRange403", typeof GetPublicDashboardWidgetQueryRange403.Type> | SigNozError<"GetPublicDashboardWidgetQueryRange500", typeof GetPublicDashboardWidgetQueryRange500.Type>>
  /**
* This endpoint resets the password by token
*/
readonly "ResetPassword": <Config extends OperationConfig>(options: { readonly payload: typeof ResetPasswordRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ResetPassword400", typeof ResetPassword400.Type> | SigNozError<"ResetPassword409", typeof ResetPassword409.Type> | SigNozError<"ResetPassword500", typeof ResetPassword500.Type>>
  /**
* This endpoint lists all roles
*/
readonly "ListRoles": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ListRoles200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ListRoles401", typeof ListRoles401.Type> | SigNozError<"ListRoles403", typeof ListRoles403.Type> | SigNozError<"ListRoles500", typeof ListRoles500.Type>>
  /**
* This endpoint creates a role
*/
readonly "CreateRole": <Config extends OperationConfig>(options: { readonly payload: typeof CreateRoleRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof CreateRole201.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"CreateRole400", typeof CreateRole400.Type> | SigNozError<"CreateRole401", typeof CreateRole401.Type> | SigNozError<"CreateRole403", typeof CreateRole403.Type> | SigNozError<"CreateRole409", typeof CreateRole409.Type> | SigNozError<"CreateRole451", typeof CreateRole451.Type> | SigNozError<"CreateRole500", typeof CreateRole500.Type> | SigNozError<"CreateRole501", typeof CreateRole501.Type>>
  /**
* This endpoint gets a role
*/
readonly "GetRole": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetRole200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetRole401", typeof GetRole401.Type> | SigNozError<"GetRole403", typeof GetRole403.Type> | SigNozError<"GetRole500", typeof GetRole500.Type>>
  /**
* This endpoint updates a role
*/
readonly "UpdateRole": <Config extends OperationConfig>(id: string, options: { readonly payload: typeof UpdateRoleRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"UpdateRole401", typeof UpdateRole401.Type> | SigNozError<"UpdateRole403", typeof UpdateRole403.Type> | SigNozError<"UpdateRole404", typeof UpdateRole404.Type> | SigNozError<"UpdateRole451", typeof UpdateRole451.Type> | SigNozError<"UpdateRole500", typeof UpdateRole500.Type> | SigNozError<"UpdateRole501", typeof UpdateRole501.Type>>
  /**
* This endpoint deletes a role
*/
readonly "DeleteRole": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"DeleteRole401", typeof DeleteRole401.Type> | SigNozError<"DeleteRole403", typeof DeleteRole403.Type> | SigNozError<"DeleteRole404", typeof DeleteRole404.Type> | SigNozError<"DeleteRole451", typeof DeleteRole451.Type> | SigNozError<"DeleteRole500", typeof DeleteRole500.Type> | SigNozError<"DeleteRole501", typeof DeleteRole501.Type>>
  /**
* This endpoint lists all route policies for the organization
*/
readonly "GetAllRoutePolicies": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetAllRoutePolicies200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetAllRoutePolicies401", typeof GetAllRoutePolicies401.Type> | SigNozError<"GetAllRoutePolicies403", typeof GetAllRoutePolicies403.Type> | SigNozError<"GetAllRoutePolicies500", typeof GetAllRoutePolicies500.Type>>
  /**
* This endpoint creates a route policy
*/
readonly "CreateRoutePolicy": <Config extends OperationConfig>(options: { readonly payload: typeof CreateRoutePolicyRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof CreateRoutePolicy201.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"CreateRoutePolicy400", typeof CreateRoutePolicy400.Type> | SigNozError<"CreateRoutePolicy401", typeof CreateRoutePolicy401.Type> | SigNozError<"CreateRoutePolicy403", typeof CreateRoutePolicy403.Type> | SigNozError<"CreateRoutePolicy500", typeof CreateRoutePolicy500.Type>>
  /**
* This endpoint returns a route policy by ID
*/
readonly "GetRoutePolicyByID": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetRoutePolicyByID200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetRoutePolicyByID401", typeof GetRoutePolicyByID401.Type> | SigNozError<"GetRoutePolicyByID403", typeof GetRoutePolicyByID403.Type> | SigNozError<"GetRoutePolicyByID404", typeof GetRoutePolicyByID404.Type> | SigNozError<"GetRoutePolicyByID500", typeof GetRoutePolicyByID500.Type>>
  /**
* This endpoint updates a route policy by ID
*/
readonly "UpdateRoutePolicy": <Config extends OperationConfig>(id: string, options: { readonly payload: typeof UpdateRoutePolicyRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof UpdateRoutePolicy200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"UpdateRoutePolicy400", typeof UpdateRoutePolicy400.Type> | SigNozError<"UpdateRoutePolicy401", typeof UpdateRoutePolicy401.Type> | SigNozError<"UpdateRoutePolicy403", typeof UpdateRoutePolicy403.Type> | SigNozError<"UpdateRoutePolicy404", typeof UpdateRoutePolicy404.Type> | SigNozError<"UpdateRoutePolicy500", typeof UpdateRoutePolicy500.Type>>
  /**
* This endpoint deletes a route policy by ID
*/
readonly "DeleteRoutePolicyByID": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"DeleteRoutePolicyByID401", typeof DeleteRoutePolicyByID401.Type> | SigNozError<"DeleteRoutePolicyByID403", typeof DeleteRoutePolicyByID403.Type> | SigNozError<"DeleteRoutePolicyByID404", typeof DeleteRoutePolicyByID404.Type> | SigNozError<"DeleteRoutePolicyByID500", typeof DeleteRoutePolicyByID500.Type>>
  /**
* This endpoint assigns a role to a service account
*/
readonly "CreateServiceAccountRole": <Config extends OperationConfig>(options: { readonly payload: typeof CreateServiceAccountRoleRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof CreateServiceAccountRole201.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"CreateServiceAccountRole400", typeof CreateServiceAccountRole400.Type> | SigNozError<"CreateServiceAccountRole401", typeof CreateServiceAccountRole401.Type> | SigNozError<"CreateServiceAccountRole403", typeof CreateServiceAccountRole403.Type> | SigNozError<"CreateServiceAccountRole404", typeof CreateServiceAccountRole404.Type> | SigNozError<"CreateServiceAccountRole500", typeof CreateServiceAccountRole500.Type>>
  /**
* This endpoint gets an existing service account role
*/
readonly "GetServiceAccountRole": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetServiceAccountRole200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetServiceAccountRole400", typeof GetServiceAccountRole400.Type> | SigNozError<"GetServiceAccountRole401", typeof GetServiceAccountRole401.Type> | SigNozError<"GetServiceAccountRole403", typeof GetServiceAccountRole403.Type> | SigNozError<"GetServiceAccountRole404", typeof GetServiceAccountRole404.Type> | SigNozError<"GetServiceAccountRole500", typeof GetServiceAccountRole500.Type>>
  /**
* This endpoint revokes a role from a service account
*/
readonly "DeleteServiceAccountRole": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"DeleteServiceAccountRole400", typeof DeleteServiceAccountRole400.Type> | SigNozError<"DeleteServiceAccountRole401", typeof DeleteServiceAccountRole401.Type> | SigNozError<"DeleteServiceAccountRole403", typeof DeleteServiceAccountRole403.Type> | SigNozError<"DeleteServiceAccountRole404", typeof DeleteServiceAccountRole404.Type> | SigNozError<"DeleteServiceAccountRole500", typeof DeleteServiceAccountRole500.Type>>
  /**
* This endpoint lists the service accounts for an organisation
*/
readonly "ListServiceAccounts": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ListServiceAccounts200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ListServiceAccounts401", typeof ListServiceAccounts401.Type> | SigNozError<"ListServiceAccounts403", typeof ListServiceAccounts403.Type> | SigNozError<"ListServiceAccounts500", typeof ListServiceAccounts500.Type>>
  /**
* This endpoint creates a service account
*/
readonly "CreateServiceAccount": <Config extends OperationConfig>(options: { readonly payload: typeof CreateServiceAccountRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof CreateServiceAccount201.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"CreateServiceAccount400", typeof CreateServiceAccount400.Type> | SigNozError<"CreateServiceAccount401", typeof CreateServiceAccount401.Type> | SigNozError<"CreateServiceAccount403", typeof CreateServiceAccount403.Type> | SigNozError<"CreateServiceAccount409", typeof CreateServiceAccount409.Type> | SigNozError<"CreateServiceAccount500", typeof CreateServiceAccount500.Type>>
  /**
* This endpoint gets an existing service account
*/
readonly "GetServiceAccount": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetServiceAccount200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetServiceAccount401", typeof GetServiceAccount401.Type> | SigNozError<"GetServiceAccount403", typeof GetServiceAccount403.Type> | SigNozError<"GetServiceAccount404", typeof GetServiceAccount404.Type> | SigNozError<"GetServiceAccount500", typeof GetServiceAccount500.Type>>
  /**
* This endpoint updates an existing service account
*/
readonly "UpdateServiceAccount": <Config extends OperationConfig>(id: string, options: { readonly payload: typeof UpdateServiceAccountRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"UpdateServiceAccount400", typeof UpdateServiceAccount400.Type> | SigNozError<"UpdateServiceAccount401", typeof UpdateServiceAccount401.Type> | SigNozError<"UpdateServiceAccount403", typeof UpdateServiceAccount403.Type> | SigNozError<"UpdateServiceAccount404", typeof UpdateServiceAccount404.Type> | SigNozError<"UpdateServiceAccount500", typeof UpdateServiceAccount500.Type>>
  /**
* This endpoint deletes an existing service account
*/
readonly "DeleteServiceAccount": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"DeleteServiceAccount401", typeof DeleteServiceAccount401.Type> | SigNozError<"DeleteServiceAccount403", typeof DeleteServiceAccount403.Type> | SigNozError<"DeleteServiceAccount404", typeof DeleteServiceAccount404.Type> | SigNozError<"DeleteServiceAccount500", typeof DeleteServiceAccount500.Type>>
  /**
* This endpoint lists the service account keys
*/
readonly "ListServiceAccountKeys": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ListServiceAccountKeys200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ListServiceAccountKeys401", typeof ListServiceAccountKeys401.Type> | SigNozError<"ListServiceAccountKeys403", typeof ListServiceAccountKeys403.Type> | SigNozError<"ListServiceAccountKeys500", typeof ListServiceAccountKeys500.Type>>
  /**
* This endpoint creates a service account key
*/
readonly "CreateServiceAccountKey": <Config extends OperationConfig>(id: string, options: { readonly payload: typeof CreateServiceAccountKeyRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof CreateServiceAccountKey201.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"CreateServiceAccountKey400", typeof CreateServiceAccountKey400.Type> | SigNozError<"CreateServiceAccountKey401", typeof CreateServiceAccountKey401.Type> | SigNozError<"CreateServiceAccountKey403", typeof CreateServiceAccountKey403.Type> | SigNozError<"CreateServiceAccountKey409", typeof CreateServiceAccountKey409.Type> | SigNozError<"CreateServiceAccountKey500", typeof CreateServiceAccountKey500.Type>>
  /**
* This endpoint updates an existing service account key
*/
readonly "UpdateServiceAccountKey": <Config extends OperationConfig>(id: string, fid: string, options: { readonly payload: typeof UpdateServiceAccountKeyRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"UpdateServiceAccountKey400", typeof UpdateServiceAccountKey400.Type> | SigNozError<"UpdateServiceAccountKey401", typeof UpdateServiceAccountKey401.Type> | SigNozError<"UpdateServiceAccountKey403", typeof UpdateServiceAccountKey403.Type> | SigNozError<"UpdateServiceAccountKey404", typeof UpdateServiceAccountKey404.Type> | SigNozError<"UpdateServiceAccountKey500", typeof UpdateServiceAccountKey500.Type>>
  /**
* This endpoint revokes an existing service account key
*/
readonly "RevokeServiceAccountKey": <Config extends OperationConfig>(id: string, fid: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"RevokeServiceAccountKey401", typeof RevokeServiceAccountKey401.Type> | SigNozError<"RevokeServiceAccountKey403", typeof RevokeServiceAccountKey403.Type> | SigNozError<"RevokeServiceAccountKey404", typeof RevokeServiceAccountKey404.Type> | SigNozError<"RevokeServiceAccountKey500", typeof RevokeServiceAccountKey500.Type>>
  /**
* This endpoint gets all the roles for the existing service account
*/
readonly "GetServiceAccountRoles": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetServiceAccountRoles200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetServiceAccountRoles401", typeof GetServiceAccountRoles401.Type> | SigNozError<"GetServiceAccountRoles403", typeof GetServiceAccountRoles403.Type> | SigNozError<"GetServiceAccountRoles404", typeof GetServiceAccountRoles404.Type> | SigNozError<"GetServiceAccountRoles500", typeof GetServiceAccountRoles500.Type>>
  /**
* This endpoint assigns a role to a service account
*/
readonly "CreateServiceAccountRoleDeprecated": <Config extends OperationConfig>(id: string, options: { readonly payload: typeof CreateServiceAccountRoleDeprecatedRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof CreateServiceAccountRoleDeprecated201.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"CreateServiceAccountRoleDeprecated400", typeof CreateServiceAccountRoleDeprecated400.Type> | SigNozError<"CreateServiceAccountRoleDeprecated401", typeof CreateServiceAccountRoleDeprecated401.Type> | SigNozError<"CreateServiceAccountRoleDeprecated403", typeof CreateServiceAccountRoleDeprecated403.Type> | SigNozError<"CreateServiceAccountRoleDeprecated500", typeof CreateServiceAccountRoleDeprecated500.Type>>
  /**
* This endpoint revokes a role from service account
*/
readonly "DeleteServiceAccountRoleDeprecated": <Config extends OperationConfig>(id: string, rid: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"DeleteServiceAccountRoleDeprecated401", typeof DeleteServiceAccountRoleDeprecated401.Type> | SigNozError<"DeleteServiceAccountRoleDeprecated403", typeof DeleteServiceAccountRoleDeprecated403.Type> | SigNozError<"DeleteServiceAccountRoleDeprecated500", typeof DeleteServiceAccountRoleDeprecated500.Type>>
  /**
* This endpoint gets my service account
*/
readonly "GetMyServiceAccount": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetMyServiceAccount200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetMyServiceAccount404", typeof GetMyServiceAccount404.Type> | SigNozError<"GetMyServiceAccount500", typeof GetMyServiceAccount500.Type>>
  /**
* This endpoint gets my service account
*/
readonly "UpdateMyServiceAccount": <Config extends OperationConfig>(options: { readonly payload: typeof UpdateMyServiceAccountRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"UpdateMyServiceAccount404", typeof UpdateMyServiceAccount404.Type> | SigNozError<"UpdateMyServiceAccount500", typeof UpdateMyServiceAccount500.Type>>
  /**
* Returns all span attribute mapping groups for the authenticated org.
*/
readonly "ListSpanMapperGroups": <Config extends OperationConfig>(options: { readonly params?: typeof ListSpanMapperGroupsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ListSpanMapperGroups200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ListSpanMapperGroups400", typeof ListSpanMapperGroups400.Type> | SigNozError<"ListSpanMapperGroups401", typeof ListSpanMapperGroups401.Type> | SigNozError<"ListSpanMapperGroups403", typeof ListSpanMapperGroups403.Type> | SigNozError<"ListSpanMapperGroups500", typeof ListSpanMapperGroups500.Type>>
  /**
* Creates a new span attribute mapping group for the org.
*/
readonly "CreateSpanMapperGroup": <Config extends OperationConfig>(options: { readonly payload: typeof CreateSpanMapperGroupRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof CreateSpanMapperGroup201.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"CreateSpanMapperGroup400", typeof CreateSpanMapperGroup400.Type> | SigNozError<"CreateSpanMapperGroup401", typeof CreateSpanMapperGroup401.Type> | SigNozError<"CreateSpanMapperGroup403", typeof CreateSpanMapperGroup403.Type> | SigNozError<"CreateSpanMapperGroup409", typeof CreateSpanMapperGroup409.Type> | SigNozError<"CreateSpanMapperGroup500", typeof CreateSpanMapperGroup500.Type>>
  /**
* Hard-deletes a mapping group and cascades to all its mappers.
*/
readonly "DeleteSpanMapperGroup": <Config extends OperationConfig>(groupId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"DeleteSpanMapperGroup401", typeof DeleteSpanMapperGroup401.Type> | SigNozError<"DeleteSpanMapperGroup403", typeof DeleteSpanMapperGroup403.Type> | SigNozError<"DeleteSpanMapperGroup404", typeof DeleteSpanMapperGroup404.Type> | SigNozError<"DeleteSpanMapperGroup500", typeof DeleteSpanMapperGroup500.Type>>
  /**
* Partially updates an existing mapping group's name, condition, or enabled state.
*/
readonly "UpdateSpanMapperGroup": <Config extends OperationConfig>(groupId: string, options: { readonly payload: typeof UpdateSpanMapperGroupRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"UpdateSpanMapperGroup400", typeof UpdateSpanMapperGroup400.Type> | SigNozError<"UpdateSpanMapperGroup401", typeof UpdateSpanMapperGroup401.Type> | SigNozError<"UpdateSpanMapperGroup403", typeof UpdateSpanMapperGroup403.Type> | SigNozError<"UpdateSpanMapperGroup404", typeof UpdateSpanMapperGroup404.Type> | SigNozError<"UpdateSpanMapperGroup500", typeof UpdateSpanMapperGroup500.Type>>
  /**
* Returns all mappers belonging to a mapping group.
*/
readonly "ListSpanMappers": <Config extends OperationConfig>(groupId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ListSpanMappers200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ListSpanMappers400", typeof ListSpanMappers400.Type> | SigNozError<"ListSpanMappers401", typeof ListSpanMappers401.Type> | SigNozError<"ListSpanMappers403", typeof ListSpanMappers403.Type> | SigNozError<"ListSpanMappers404", typeof ListSpanMappers404.Type> | SigNozError<"ListSpanMappers500", typeof ListSpanMappers500.Type>>
  /**
* Adds a new mapper to the specified mapping group.
*/
readonly "CreateSpanMapper": <Config extends OperationConfig>(groupId: string, options: { readonly payload: typeof CreateSpanMapperRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof CreateSpanMapper201.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"CreateSpanMapper400", typeof CreateSpanMapper400.Type> | SigNozError<"CreateSpanMapper401", typeof CreateSpanMapper401.Type> | SigNozError<"CreateSpanMapper403", typeof CreateSpanMapper403.Type> | SigNozError<"CreateSpanMapper404", typeof CreateSpanMapper404.Type> | SigNozError<"CreateSpanMapper409", typeof CreateSpanMapper409.Type> | SigNozError<"CreateSpanMapper500", typeof CreateSpanMapper500.Type>>
  /**
* Hard-deletes a mapper from a mapping group.
*/
readonly "DeleteSpanMapper": <Config extends OperationConfig>(groupId: string, mapperId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"DeleteSpanMapper401", typeof DeleteSpanMapper401.Type> | SigNozError<"DeleteSpanMapper403", typeof DeleteSpanMapper403.Type> | SigNozError<"DeleteSpanMapper404", typeof DeleteSpanMapper404.Type> | SigNozError<"DeleteSpanMapper500", typeof DeleteSpanMapper500.Type>>
  /**
* Partially updates an existing mapper's field context, config, or enabled state.
*/
readonly "UpdateSpanMapper": <Config extends OperationConfig>(groupId: string, mapperId: string, options: { readonly payload: typeof UpdateSpanMapperRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"UpdateSpanMapper400", typeof UpdateSpanMapper400.Type> | SigNozError<"UpdateSpanMapper401", typeof UpdateSpanMapper401.Type> | SigNozError<"UpdateSpanMapper403", typeof UpdateSpanMapper403.Type> | SigNozError<"UpdateSpanMapper404", typeof UpdateSpanMapper404.Type> | SigNozError<"UpdateSpanMapper500", typeof UpdateSpanMapper500.Type>>
  /**
* Tests how span mappers would transform sample spans
*/
readonly "TestSpanMappers": <Config extends OperationConfig>(options: { readonly payload: typeof TestSpanMappersRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof TestSpanMappers200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"TestSpanMappers400", typeof TestSpanMappers400.Type> | SigNozError<"TestSpanMappers401", typeof TestSpanMappers401.Type> | SigNozError<"TestSpanMappers403", typeof TestSpanMappers403.Type> | SigNozError<"TestSpanMappers404", typeof TestSpanMappers404.Type> | SigNozError<"TestSpanMappers500", typeof TestSpanMappers500.Type>>
  /**
* This endpoint returns the collected stats for the organization
*/
readonly "GetStats": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetStats200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetStats401", typeof GetStats401.Type> | SigNozError<"GetStats403", typeof GetStats403.Type> | SigNozError<"GetStats500", typeof GetStats500.Type>>
  /**
* Deprecated: use /api/v1/channels/test instead
*/
readonly "TestChannelDeprecated": <Config extends OperationConfig>(options: { readonly payload: typeof TestChannelDeprecatedRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"TestChannelDeprecated400", typeof TestChannelDeprecated400.Type> | SigNozError<"TestChannelDeprecated401", typeof TestChannelDeprecated401.Type> | SigNozError<"TestChannelDeprecated403", typeof TestChannelDeprecated403.Type> | SigNozError<"TestChannelDeprecated500", typeof TestChannelDeprecated500.Type>>
  /**
* Computes span aggregations grouped by requested field.
*/
readonly "GetTraceAggregations": <Config extends OperationConfig>(traceID: string, options: { readonly payload: typeof GetTraceAggregationsRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof GetTraceAggregations200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetTraceAggregations400", typeof GetTraceAggregations400.Type> | SigNozError<"GetTraceAggregations401", typeof GetTraceAggregations401.Type> | SigNozError<"GetTraceAggregations403", typeof GetTraceAggregations403.Type> | SigNozError<"GetTraceAggregations404", typeof GetTraceAggregations404.Type> | SigNozError<"GetTraceAggregations500", typeof GetTraceAggregations500.Type>>
  /**
* This endpoint lists all users
*/
readonly "ListUsersDeprecated": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ListUsersDeprecated200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ListUsersDeprecated401", typeof ListUsersDeprecated401.Type> | SigNozError<"ListUsersDeprecated403", typeof ListUsersDeprecated403.Type> | SigNozError<"ListUsersDeprecated500", typeof ListUsersDeprecated500.Type>>
  /**
* This endpoint returns the user by id
*/
readonly "GetUserDeprecated": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetUserDeprecated200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetUserDeprecated401", typeof GetUserDeprecated401.Type> | SigNozError<"GetUserDeprecated403", typeof GetUserDeprecated403.Type> | SigNozError<"GetUserDeprecated404", typeof GetUserDeprecated404.Type> | SigNozError<"GetUserDeprecated500", typeof GetUserDeprecated500.Type>>
  /**
* This endpoint updates the user by id
*/
readonly "UpdateUserDeprecated": <Config extends OperationConfig>(id: string, options: { readonly payload: typeof UpdateUserDeprecatedRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof UpdateUserDeprecated200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"UpdateUserDeprecated400", typeof UpdateUserDeprecated400.Type> | SigNozError<"UpdateUserDeprecated401", typeof UpdateUserDeprecated401.Type> | SigNozError<"UpdateUserDeprecated403", typeof UpdateUserDeprecated403.Type> | SigNozError<"UpdateUserDeprecated404", typeof UpdateUserDeprecated404.Type> | SigNozError<"UpdateUserDeprecated500", typeof UpdateUserDeprecated500.Type>>
  /**
* This endpoint deletes the user by id
*/
readonly "DeleteUserDeprecated": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"DeleteUserDeprecated401", typeof DeleteUserDeprecated401.Type> | SigNozError<"DeleteUserDeprecated403", typeof DeleteUserDeprecated403.Type> | SigNozError<"DeleteUserDeprecated404", typeof DeleteUserDeprecated404.Type> | SigNozError<"DeleteUserDeprecated500", typeof DeleteUserDeprecated500.Type>>
  /**
* This endpoint returns the user I belong to
*/
readonly "GetMyUserDeprecated": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetMyUserDeprecated200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetMyUserDeprecated401", typeof GetMyUserDeprecated401.Type> | SigNozError<"GetMyUserDeprecated403", typeof GetMyUserDeprecated403.Type> | SigNozError<"GetMyUserDeprecated500", typeof GetMyUserDeprecated500.Type>>
  /**
* This endpoint lists all user preferences
*/
readonly "ListUserPreferences": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ListUserPreferences200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ListUserPreferences401", typeof ListUserPreferences401.Type> | SigNozError<"ListUserPreferences403", typeof ListUserPreferences403.Type> | SigNozError<"ListUserPreferences500", typeof ListUserPreferences500.Type>>
  /**
* This endpoint returns the user preference by name
*/
readonly "GetUserPreference": <Config extends OperationConfig>(name: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetUserPreference200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetUserPreference401", typeof GetUserPreference401.Type> | SigNozError<"GetUserPreference403", typeof GetUserPreference403.Type> | SigNozError<"GetUserPreference404", typeof GetUserPreference404.Type> | SigNozError<"GetUserPreference500", typeof GetUserPreference500.Type>>
  /**
* This endpoint updates the user preference by name
*/
readonly "UpdateUserPreference": <Config extends OperationConfig>(name: string, options: { readonly payload: typeof UpdateUserPreferenceRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"UpdateUserPreference400", typeof UpdateUserPreference400.Type> | SigNozError<"UpdateUserPreference401", typeof UpdateUserPreference401.Type> | SigNozError<"UpdateUserPreference403", typeof UpdateUserPreference403.Type> | SigNozError<"UpdateUserPreference404", typeof UpdateUserPreference404.Type> | SigNozError<"UpdateUserPreference500", typeof UpdateUserPreference500.Type>>
  /**
* Returns every saved view in the calling user's org. Saved views are shared org-wide.
*/
readonly "ListDashboardViews": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ListDashboardViews200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ListDashboardViews401", typeof ListDashboardViews401.Type> | SigNozError<"ListDashboardViews403", typeof ListDashboardViews403.Type> | SigNozError<"ListDashboardViews500", typeof ListDashboardViews500.Type>>
  /**
* Persists the calling user's dashboard listing state (query, sort, order) as a named, reusable view shared across the org.
*/
readonly "CreateDashboardView": <Config extends OperationConfig>(options: { readonly payload: typeof CreateDashboardViewRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof CreateDashboardView201.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"CreateDashboardView400", typeof CreateDashboardView400.Type> | SigNozError<"CreateDashboardView401", typeof CreateDashboardView401.Type> | SigNozError<"CreateDashboardView403", typeof CreateDashboardView403.Type> | SigNozError<"CreateDashboardView500", typeof CreateDashboardView500.Type>>
  /**
* Replaces a saved view's name and data. Saved views are shared org-wide.
*/
readonly "UpdateDashboardView": <Config extends OperationConfig>(id: string, options: { readonly payload: typeof UpdateDashboardViewRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof UpdateDashboardView200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"UpdateDashboardView400", typeof UpdateDashboardView400.Type> | SigNozError<"UpdateDashboardView401", typeof UpdateDashboardView401.Type> | SigNozError<"UpdateDashboardView403", typeof UpdateDashboardView403.Type> | SigNozError<"UpdateDashboardView404", typeof UpdateDashboardView404.Type> | SigNozError<"UpdateDashboardView500", typeof UpdateDashboardView500.Type>>
  /**
* Removes a saved view. Saved views are shared org-wide. Deleting a non-existent view returns 404.
*/
readonly "DeleteDashboardView": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"DeleteDashboardView400", typeof DeleteDashboardView400.Type> | SigNozError<"DeleteDashboardView401", typeof DeleteDashboardView401.Type> | SigNozError<"DeleteDashboardView403", typeof DeleteDashboardView403.Type> | SigNozError<"DeleteDashboardView404", typeof DeleteDashboardView404.Type> | SigNozError<"DeleteDashboardView500", typeof DeleteDashboardView500.Type>>
  /**
* Returns a page of v2-shape dashboards for the org. This is the pure, user-independent list — it carries no pin state. Use ListDashboardsForUserV2 for the personalized, pin-aware list. Supports a filter DSL (`query`), sort (`updated_at`/`created_at`/`name`), order (`asc`/`desc`), and offset-based pagination (`limit`/`offset`).
*/
readonly "ListDashboardsV2": <Config extends OperationConfig>(options: { readonly params?: typeof ListDashboardsV2Params.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ListDashboardsV2200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ListDashboardsV2400", typeof ListDashboardsV2400.Type> | SigNozError<"ListDashboardsV2401", typeof ListDashboardsV2401.Type> | SigNozError<"ListDashboardsV2403", typeof ListDashboardsV2403.Type> | SigNozError<"ListDashboardsV2500", typeof ListDashboardsV2500.Type>>
  /**
* This endpoint creates a dashboard in the v2 format that follows Perses spec.
*/
readonly "CreateDashboardV2": <Config extends OperationConfig>(options: { readonly payload: typeof CreateDashboardV2RequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof CreateDashboardV2201.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"CreateDashboardV2400", typeof CreateDashboardV2400.Type> | SigNozError<"CreateDashboardV2401", typeof CreateDashboardV2401.Type> | SigNozError<"CreateDashboardV2403", typeof CreateDashboardV2403.Type> | SigNozError<"CreateDashboardV2500", typeof CreateDashboardV2500.Type>>
  /**
* This endpoint returns a v2-shape dashboard.
*/
readonly "GetDashboardV2": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetDashboardV2200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetDashboardV2400", typeof GetDashboardV2400.Type> | SigNozError<"GetDashboardV2401", typeof GetDashboardV2401.Type> | SigNozError<"GetDashboardV2403", typeof GetDashboardV2403.Type> | SigNozError<"GetDashboardV2404", typeof GetDashboardV2404.Type> | SigNozError<"GetDashboardV2500", typeof GetDashboardV2500.Type>>
  /**
* This endpoint updates a v2-shape dashboard's metadata, data, and tag set. Locked dashboards are rejected.
*/
readonly "UpdateDashboardV2": <Config extends OperationConfig>(id: string, options: { readonly payload: typeof UpdateDashboardV2RequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof UpdateDashboardV2200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"UpdateDashboardV2400", typeof UpdateDashboardV2400.Type> | SigNozError<"UpdateDashboardV2401", typeof UpdateDashboardV2401.Type> | SigNozError<"UpdateDashboardV2403", typeof UpdateDashboardV2403.Type> | SigNozError<"UpdateDashboardV2404", typeof UpdateDashboardV2404.Type> | SigNozError<"UpdateDashboardV2500", typeof UpdateDashboardV2500.Type>>
  /**
* This endpoint deletes a v2-shape dashboard along with its tag relations. Locked dashboards are rejected.
*/
readonly "DeleteDashboardV2": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"DeleteDashboardV2400", typeof DeleteDashboardV2400.Type> | SigNozError<"DeleteDashboardV2401", typeof DeleteDashboardV2401.Type> | SigNozError<"DeleteDashboardV2403", typeof DeleteDashboardV2403.Type> | SigNozError<"DeleteDashboardV2404", typeof DeleteDashboardV2404.Type> | SigNozError<"DeleteDashboardV2500", typeof DeleteDashboardV2500.Type>>
  /**
* This endpoint applies an RFC 6902 JSON Patch to a v2-shape dashboard. The patch is applied against the postable view of the dashboard (metadata, data, tags), so individual panels, queries, variables, layouts, or tags can be updated without re-sending the rest of the dashboard. Apply is lenient: `remove` on a missing path is a no-op (idempotent) and `add` creates any missing parent objects, rather than failing as strict RFC 6902 would. The resulting dashboard is still validated. Locked dashboards are rejected.
*/
readonly "PatchDashboardV2": <Config extends OperationConfig>(id: string, options: { readonly payload: typeof PatchDashboardV2RequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof PatchDashboardV2200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"PatchDashboardV2400", typeof PatchDashboardV2400.Type> | SigNozError<"PatchDashboardV2401", typeof PatchDashboardV2401.Type> | SigNozError<"PatchDashboardV2403", typeof PatchDashboardV2403.Type> | SigNozError<"PatchDashboardV2404", typeof PatchDashboardV2404.Type> | SigNozError<"PatchDashboardV2500", typeof PatchDashboardV2500.Type>>
  /**
* This endpoint clones an existing v2-shape dashboard. User and integration dashboards can be cloned; system dashboards are rejected. The clone keeps the source's display name, panels, and tags, but gets a freshly generated unique internal name and is always created as an unlocked user dashboard owned by the caller.
*/
readonly "CloneDashboardV2": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof CloneDashboardV2201.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"CloneDashboardV2400", typeof CloneDashboardV2400.Type> | SigNozError<"CloneDashboardV2401", typeof CloneDashboardV2401.Type> | SigNozError<"CloneDashboardV2403", typeof CloneDashboardV2403.Type> | SigNozError<"CloneDashboardV2404", typeof CloneDashboardV2404.Type> | SigNozError<"CloneDashboardV2500", typeof CloneDashboardV2500.Type>>
  /**
* This endpoint locks a v2-shape dashboard. Only the dashboard's creator or an org admin may lock or unlock.
*/
readonly "LockDashboardV2": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"LockDashboardV2400", typeof LockDashboardV2400.Type> | SigNozError<"LockDashboardV2401", typeof LockDashboardV2401.Type> | SigNozError<"LockDashboardV2403", typeof LockDashboardV2403.Type> | SigNozError<"LockDashboardV2404", typeof LockDashboardV2404.Type> | SigNozError<"LockDashboardV2500", typeof LockDashboardV2500.Type>>
  /**
* This endpoint unlocks a v2-shape dashboard. Only the dashboard's creator or an org admin may lock or unlock.
*/
readonly "UnlockDashboardV2": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"UnlockDashboardV2400", typeof UnlockDashboardV2400.Type> | SigNozError<"UnlockDashboardV2401", typeof UnlockDashboardV2401.Type> | SigNozError<"UnlockDashboardV2403", typeof UnlockDashboardV2403.Type> | SigNozError<"UnlockDashboardV2404", typeof UnlockDashboardV2404.Type> | SigNozError<"UnlockDashboardV2500", typeof UnlockDashboardV2500.Type>>
  /**
* This endpoint initiates the forgot password flow by sending a reset password email
*/
readonly "ForgotPassword": <Config extends OperationConfig>(options: { readonly payload: typeof ForgotPasswordRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ForgotPassword400", typeof ForgotPassword400.Type> | SigNozError<"ForgotPassword422", typeof ForgotPassword422.Type> | SigNozError<"ForgotPassword500", typeof ForgotPassword500.Type>>
  /**
* This endpoint returns the supported features and their details
*/
readonly "GetFeatures": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetFeatures200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetFeatures401", typeof GetFeatures401.Type> | SigNozError<"GetFeatures403", typeof GetFeatures403.Type> | SigNozError<"GetFeatures500", typeof GetFeatures500.Type>>
  /**
* This endpoint returns the ingestion keys for a workspace
*/
readonly "GetIngestionKeys": <Config extends OperationConfig>(options: { readonly params?: typeof GetIngestionKeysParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetIngestionKeys200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetIngestionKeys401", typeof GetIngestionKeys401.Type> | SigNozError<"GetIngestionKeys403", typeof GetIngestionKeys403.Type> | SigNozError<"GetIngestionKeys500", typeof GetIngestionKeys500.Type>>
  /**
* This endpoint creates an ingestion key for the workspace
*/
readonly "CreateIngestionKey": <Config extends OperationConfig>(options: { readonly payload: typeof CreateIngestionKeyRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof CreateIngestionKey201.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"CreateIngestionKey401", typeof CreateIngestionKey401.Type> | SigNozError<"CreateIngestionKey403", typeof CreateIngestionKey403.Type> | SigNozError<"CreateIngestionKey500", typeof CreateIngestionKey500.Type>>
  /**
* This endpoint deletes an ingestion key for the workspace
*/
readonly "DeleteIngestionKey": <Config extends OperationConfig>(keyId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"DeleteIngestionKey401", typeof DeleteIngestionKey401.Type> | SigNozError<"DeleteIngestionKey403", typeof DeleteIngestionKey403.Type> | SigNozError<"DeleteIngestionKey500", typeof DeleteIngestionKey500.Type>>
  /**
* This endpoint updates an ingestion key for the workspace
*/
readonly "UpdateIngestionKey": <Config extends OperationConfig>(keyId: string, options: { readonly payload: typeof UpdateIngestionKeyRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"UpdateIngestionKey401", typeof UpdateIngestionKey401.Type> | SigNozError<"UpdateIngestionKey403", typeof UpdateIngestionKey403.Type> | SigNozError<"UpdateIngestionKey500", typeof UpdateIngestionKey500.Type>>
  /**
* This endpoint creates an ingestion key limit
*/
readonly "CreateIngestionKeyLimit": <Config extends OperationConfig>(keyId: string, options: { readonly payload: typeof CreateIngestionKeyLimitRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof CreateIngestionKeyLimit201.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"CreateIngestionKeyLimit401", typeof CreateIngestionKeyLimit401.Type> | SigNozError<"CreateIngestionKeyLimit403", typeof CreateIngestionKeyLimit403.Type> | SigNozError<"CreateIngestionKeyLimit500", typeof CreateIngestionKeyLimit500.Type>>
  /**
* This endpoint deletes an ingestion key limit
*/
readonly "DeleteIngestionKeyLimit": <Config extends OperationConfig>(limitId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"DeleteIngestionKeyLimit401", typeof DeleteIngestionKeyLimit401.Type> | SigNozError<"DeleteIngestionKeyLimit403", typeof DeleteIngestionKeyLimit403.Type> | SigNozError<"DeleteIngestionKeyLimit500", typeof DeleteIngestionKeyLimit500.Type>>
  /**
* This endpoint updates an ingestion key limit
*/
readonly "UpdateIngestionKeyLimit": <Config extends OperationConfig>(limitId: string, options: { readonly payload: typeof UpdateIngestionKeyLimitRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"UpdateIngestionKeyLimit401", typeof UpdateIngestionKeyLimit401.Type> | SigNozError<"UpdateIngestionKeyLimit403", typeof UpdateIngestionKeyLimit403.Type> | SigNozError<"UpdateIngestionKeyLimit500", typeof UpdateIngestionKeyLimit500.Type>>
  /**
* This endpoint returns the ingestion keys for a workspace
*/
readonly "SearchIngestionKeys": <Config extends OperationConfig>(options: { readonly params: typeof SearchIngestionKeysParams.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof SearchIngestionKeys200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"SearchIngestionKeys401", typeof SearchIngestionKeys401.Type> | SigNozError<"SearchIngestionKeys403", typeof SearchIngestionKeys403.Type> | SigNozError<"SearchIngestionKeys500", typeof SearchIngestionKeys500.Type>>
  /**
* Health check
*/
readonly "Healthz": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof Healthz200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"Healthz503", typeof Healthz503.Type>>
  /**
* Checks whether the metrics and attributes required to power the infra-monitoring section selected by the 'type' query parameter (hosts, processes, pods, nodes, deployments, daemonsets, statefulsets, jobs, namespaces, clusters, volumes) are being received. For each collector receiver or processor that contributes required metrics or attributes, lists what is present and what is missing, with a prebuilt user-facing message and a docs link per missing component. Default-enabled metrics are those expected as soon as the receiver is configured; optional metrics require 'enabled: true' in receiver config. 'ready' is true only when every missing list is empty.
*/
readonly "GetChecks": <Config extends OperationConfig>(options: { readonly params: typeof GetChecksParams.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof GetChecks200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetChecks400", typeof GetChecks400.Type> | SigNozError<"GetChecks401", typeof GetChecks401.Type> | SigNozError<"GetChecks403", typeof GetChecks403.Type> | SigNozError<"GetChecks500", typeof GetChecks500.Type>>
  /**
* Returns a paginated list of Kubernetes clusters with key aggregated metrics derived by summing per-node values within the group: CPU usage, CPU allocatable, memory working set, memory allocatable. Each row also reports per-group nodeCountsByReadiness ({ ready, notReady } from each node's latest k8s.node.condition_ready value) and per-group podCountsByPhase ({ pending, running, succeeded, failed, unknown } from each pod's latest k8s.pod.phase value). Each cluster includes metadata attributes (k8s.cluster.name). The response type is 'list' for the default k8s.cluster.name grouping or 'grouped_list' for custom groupBy keys; in both modes every row aggregates nodes and pods in the group. Supports filtering via a filter expression, custom groupBy, ordering by cpu / cpu_allocatable / memory / memory_allocatable, and pagination via offset/limit. Also reports whether the requested time range falls before the data retention boundary. Numeric metric fields (clusterCPU, clusterCPUAllocatable, clusterMemory, clusterMemoryAllocatable) return -1 as a sentinel when no data is available for that field.
*/
readonly "ListClusters": <Config extends OperationConfig>(options: { readonly payload: typeof ListClustersRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof ListClusters200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ListClusters400", typeof ListClusters400.Type> | SigNozError<"ListClusters401", typeof ListClusters401.Type> | SigNozError<"ListClusters403", typeof ListClusters403.Type> | SigNozError<"ListClusters500", typeof ListClusters500.Type>>
  /**
* Returns a paginated list of Kubernetes DaemonSets with key aggregated pod metrics: CPU usage and memory working set summed across pods owned by the daemonset, plus average CPU/memory request and limit utilization (daemonSetCPURequest, daemonSetCPULimit, daemonSetMemoryRequest, daemonSetMemoryLimit). Each row also reports the latest known node-level counters from kube-state-metrics: desiredNodes (k8s.daemonset.desired_scheduled_nodes, the number of nodes the daemonset wants to run on), currentNodes (k8s.daemonset.current_scheduled_nodes, the number of nodes the daemonset currently runs on), readyNodes (k8s.daemonset.ready_nodes, the number of nodes running at least one ready daemon pod) and misscheduledNodes (k8s.daemonset.misscheduled_nodes, the number of nodes running the daemon pod but not supposed to) — note these are node counts, not pod counts. It also reports per-group podCountsByPhase ({ pending, running, succeeded, failed, unknown } from each pod's latest k8s.pod.phase value). Each daemonset includes metadata attributes (k8s.daemonset.name, k8s.namespace.name, k8s.cluster.name). The response type is 'list' for the default k8s.daemonset.name grouping or 'grouped_list' for custom groupBy keys; in both modes every row aggregates pods owned by daemonsets in the group. Supports filtering via a filter expression, custom groupBy, ordering by cpu / cpu_request / cpu_limit / memory / memory_request / memory_limit / desired_nodes / current_nodes / ready_nodes / misscheduled_nodes, and pagination via offset/limit. Also reports whether the requested time range falls before the data retention boundary. Numeric metric fields (daemonSetCPU, daemonSetCPURequest, daemonSetCPULimit, daemonSetMemory, daemonSetMemoryRequest, daemonSetMemoryLimit, desiredNodes, currentNodes, readyNodes, misscheduledNodes) return -1 as a sentinel when no data is available for that field.
*/
readonly "ListDaemonSets": <Config extends OperationConfig>(options: { readonly payload: typeof ListDaemonSetsRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof ListDaemonSets200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ListDaemonSets400", typeof ListDaemonSets400.Type> | SigNozError<"ListDaemonSets401", typeof ListDaemonSets401.Type> | SigNozError<"ListDaemonSets403", typeof ListDaemonSets403.Type> | SigNozError<"ListDaemonSets500", typeof ListDaemonSets500.Type>>
  /**
* Returns a paginated list of Kubernetes Deployments with key aggregated pod metrics: CPU usage and memory working set summed across pods owned by the deployment, plus average CPU/memory request and limit utilization (deploymentCPURequest, deploymentCPULimit, deploymentMemoryRequest, deploymentMemoryLimit). Each row also reports the latest known desiredPods (k8s.deployment.desired) and availablePods (k8s.deployment.available) replica counts and per-group podCountsByPhase ({ pending, running, succeeded, failed, unknown } from each pod's latest k8s.pod.phase value). Each deployment includes metadata attributes (k8s.deployment.name, k8s.namespace.name, k8s.cluster.name). The response type is 'list' for the default k8s.deployment.name grouping or 'grouped_list' for custom groupBy keys; in both modes every row aggregates pods owned by deployments in the group. Supports filtering via a filter expression, custom groupBy, ordering by cpu / cpu_request / cpu_limit / memory / memory_request / memory_limit / desired_pods / available_pods, and pagination via offset/limit. Also reports whether the requested time range falls before the data retention boundary. Numeric metric fields (deploymentCPU, deploymentCPURequest, deploymentCPULimit, deploymentMemory, deploymentMemoryRequest, deploymentMemoryLimit, desiredPods, availablePods) return -1 as a sentinel when no data is available for that field.
*/
readonly "ListDeployments": <Config extends OperationConfig>(options: { readonly payload: typeof ListDeploymentsRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof ListDeployments200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ListDeployments400", typeof ListDeployments400.Type> | SigNozError<"ListDeployments401", typeof ListDeployments401.Type> | SigNozError<"ListDeployments403", typeof ListDeployments403.Type> | SigNozError<"ListDeployments500", typeof ListDeployments500.Type>>
  /**
* Returns a paginated list of hosts with key infrastructure metrics: CPU usage (%), memory usage (%), I/O wait (%), disk usage (%), and 15-minute load average. Each host includes its current status (active/inactive based on metrics reported in the last 10 minutes) and metadata attributes (e.g., os.type). Supports filtering via a filter expression, filtering by host status, custom groupBy to aggregate hosts by any attribute, ordering by any of the five metrics, and pagination via offset/limit. The response type is 'list' for the default host.name grouping or 'grouped_list' for custom groupBy keys. Also reports whether the requested time range falls before the data retention boundary. Numeric metric fields (cpu, memory, wait, load15, diskUsage) return -1 as a sentinel when no data is available for that field.
*/
readonly "ListHosts": <Config extends OperationConfig>(options: { readonly payload: typeof ListHostsRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof ListHosts200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ListHosts400", typeof ListHosts400.Type> | SigNozError<"ListHosts401", typeof ListHosts401.Type> | SigNozError<"ListHosts403", typeof ListHosts403.Type> | SigNozError<"ListHosts500", typeof ListHosts500.Type>>
  /**
* Returns a paginated list of Kubernetes Jobs with key aggregated pod metrics: CPU usage and memory working set summed across pods owned by the job, plus average CPU/memory request and limit utilization (jobCPURequest, jobCPULimit, jobMemoryRequest, jobMemoryLimit). Each row also reports the latest known job-level counters from kube-state-metrics: desiredSuccessfulPods (k8s.job.desired_successful_pods, the target completion count), activePods (k8s.job.active_pods), failedPods (k8s.job.failed_pods, cumulative across the lifetime of the job), and successfulPods (k8s.job.successful_pods, cumulative). It also reports per-group podCountsByPhase ({ pending, running, succeeded, failed, unknown } from each pod's latest k8s.pod.phase value); note podCountsByPhase.failed (current pod-phase) is distinct from failedPods (cumulative job kube-state-metric). Each job includes metadata attributes (k8s.job.name, k8s.namespace.name, k8s.cluster.name). The response type is 'list' for the default k8s.job.name grouping or 'grouped_list' for custom groupBy keys; in both modes every row aggregates pods owned by jobs in the group. Supports filtering via a filter expression, custom groupBy, ordering by cpu / cpu_request / cpu_limit / memory / memory_request / memory_limit / desired_successful_pods / active_pods / failed_pods / successful_pods, and pagination via offset/limit. Also reports whether the requested time range falls before the data retention boundary. Numeric metric fields (jobCPU, jobCPURequest, jobCPULimit, jobMemory, jobMemoryRequest, jobMemoryLimit, desiredSuccessfulPods, activePods, failedPods, successfulPods) return -1 as a sentinel when no data is available for that field.
*/
readonly "ListJobs": <Config extends OperationConfig>(options: { readonly payload: typeof ListJobsRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof ListJobs200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ListJobs400", typeof ListJobs400.Type> | SigNozError<"ListJobs401", typeof ListJobs401.Type> | SigNozError<"ListJobs403", typeof ListJobs403.Type> | SigNozError<"ListJobs500", typeof ListJobs500.Type>>
  /**
* Returns a paginated list of Kubernetes containers with key kubeletstats metrics: CPU usage (cores), CPU request/limit utilization, memory working set, and memory request/limit utilization. Each container also reports health signals from the k8s_cluster receiver: status (kubectl-style display status derived from k8s.container.status.state + k8s.container.status.reason), restarts (absolute count from k8s.container.restarts), and ready (ready/not_ready from k8s.container.ready). The row identity is (k8s.pod.uid, k8s.container.name), stable across container restarts. Each container includes metadata attributes (k8s.container.name, k8s.pod.name, container.image.name, container.image.tag, k8s.namespace.name, k8s.node.name, k8s.cluster.name, and workload owner such as deployment/statefulset/daemonset/job). The response type is 'list' for the default (k8s.pod.uid, k8s.container.name) grouping (each row is one container with its current status and ready state) or 'grouped_list' for custom groupBy keys (each row aggregates containers in the group with per-status counts under containerCountsByStatus, per-readiness counts under containerCountsByReady, and restarts as the group sum). Status requires the optional k8s.container.status.state and k8s.container.status.reason metrics; when either is missing, status is omitted and a warning is returned while restarts and ready are still computed. Supports filtering via a filter expression, custom groupBy, ordering by any of the six metrics (cpu, cpu_request, cpu_limit, memory, memory_request, memory_limit), and pagination via offset/limit. Also reports whether the requested time range falls before the data retention boundary. Numeric metric fields (cpu, cpuRequestUtilization, cpuLimitUtilization, memory, memoryRequestUtilization, memoryLimitUtilization) and restarts return -1 as a sentinel when no data is available for that field.
*/
readonly "ListContainers": <Config extends OperationConfig>(options: { readonly payload: typeof ListContainersRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof ListContainers200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ListContainers400", typeof ListContainers400.Type> | SigNozError<"ListContainers401", typeof ListContainers401.Type> | SigNozError<"ListContainers403", typeof ListContainers403.Type> | SigNozError<"ListContainers500", typeof ListContainers500.Type>>
  /**
* Returns a paginated list of Kubernetes namespaces with key aggregated pod metrics: CPU usage and memory working set (summed across pods in the group), plus per-group podCountsByPhase ({ pending, running, succeeded, failed, unknown } from each pod's latest k8s.pod.phase value in the window). Each namespace includes metadata attributes (k8s.namespace.name, k8s.cluster.name). The response type is 'list' for the default k8s.namespace.name grouping or 'grouped_list' for custom groupBy keys; in both modes every row aggregates pods in the group. Supports filtering via a filter expression, custom groupBy, ordering by cpu / memory, and pagination via offset/limit. Also reports whether the requested time range falls before the data retention boundary. Numeric metric fields (namespaceCPU, namespaceMemory) return -1 as a sentinel when no data is available for that field.
*/
readonly "ListNamespaces": <Config extends OperationConfig>(options: { readonly payload: typeof ListNamespacesRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof ListNamespaces200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ListNamespaces400", typeof ListNamespaces400.Type> | SigNozError<"ListNamespaces401", typeof ListNamespaces401.Type> | SigNozError<"ListNamespaces403", typeof ListNamespaces403.Type> | SigNozError<"ListNamespaces500", typeof ListNamespaces500.Type>>
  /**
* Returns a paginated list of Kubernetes nodes with key metrics: CPU usage, CPU allocatable, memory working set, memory allocatable, per-group nodeCountsByReadiness ({ ready, notReady } from each node's latest k8s.node.condition_ready in the window) and per-group podCountsByPhase ({ pending, running, succeeded, failed, unknown } for pods scheduled on the listed nodes). Each node includes metadata attributes (k8s.node.uid, k8s.cluster.name). The response type is 'list' for the default k8s.node.name grouping (each row is one node with its current condition string: ready / not_ready / no_data) or 'grouped_list' for custom groupBy keys (each row aggregates nodes in the group; condition stays no_data). Supports filtering via a filter expression, custom groupBy, ordering by cpu / cpu_allocatable / memory / memory_allocatable, and pagination via offset/limit. Also reports whether the requested time range falls before the data retention boundary. Numeric metric fields (nodeCPU, nodeCPUAllocatable, nodeMemory, nodeMemoryAllocatable) return -1 as a sentinel when no data is available for that field.
*/
readonly "ListNodes": <Config extends OperationConfig>(options: { readonly payload: typeof ListNodesRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof ListNodes200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ListNodes400", typeof ListNodes400.Type> | SigNozError<"ListNodes401", typeof ListNodes401.Type> | SigNozError<"ListNodes403", typeof ListNodes403.Type> | SigNozError<"ListNodes500", typeof ListNodes500.Type>>
  /**
* Returns a paginated list of Kubernetes pods with key metrics: CPU usage, CPU request/limit utilization, memory working set, memory request/limit utilization, current pod phase (pending/running/succeeded/failed/unknown/no_data), and pod age (ms since start time). Each pod includes metadata attributes (namespace, node, workload owner such as deployment/statefulset/daemonset/job/cronjob, cluster). Supports filtering via a filter expression, custom groupBy to aggregate pods by any attribute, ordering by any of the six metrics (cpu, cpu_request, cpu_limit, memory, memory_request, memory_limit), and pagination via offset/limit. The response type is 'list' for the default k8s.pod.uid grouping (each row is one pod with its current phase) or 'grouped_list' for custom groupBy keys (each row aggregates pods in the group with per-phase counts under podCountsByPhase: { pending, running, succeeded, failed, unknown } derived from each pod's latest phase in the window). Also reports whether the requested time range falls before the data retention boundary. Numeric metric fields (podCPU, podCPURequest, podCPULimit, podMemory, podMemoryRequest, podMemoryLimit, podAge) return -1 as a sentinel when no data is available for that field.
*/
readonly "ListPods": <Config extends OperationConfig>(options: { readonly payload: typeof ListPodsRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof ListPods200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ListPods400", typeof ListPods400.Type> | SigNozError<"ListPods401", typeof ListPods401.Type> | SigNozError<"ListPods403", typeof ListPods403.Type> | SigNozError<"ListPods500", typeof ListPods500.Type>>
  /**
* Returns a paginated list of Kubernetes persistent volume claims (PVCs) with key volume metrics: available bytes, capacity bytes, usage (capacity - available), inodes, free inodes, and used inodes. Each row also includes metadata attributes (k8s.persistentvolumeclaim.name, k8s.pod.uid, k8s.pod.name, k8s.namespace.name, k8s.node.name, k8s.statefulset.name, k8s.cluster.name). Supports filtering via a filter expression, custom groupBy to aggregate volumes by any attribute, ordering by any of the six metrics (available, capacity, usage, inodes, inodes_free, inodes_used), and pagination via offset/limit. The response type is 'list' for the default k8s.persistentvolumeclaim.name grouping or 'grouped_list' for custom groupBy keys; in both modes every row aggregates volumes in the group. Also reports whether the requested time range falls before the data retention boundary. Numeric metric fields (volumeAvailable, volumeCapacity, volumeUsage, volumeInodes, volumeInodesFree, volumeInodesUsed) return -1 as a sentinel when no data is available for that field.
*/
readonly "ListVolumes": <Config extends OperationConfig>(options: { readonly payload: typeof ListVolumesRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof ListVolumes200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ListVolumes400", typeof ListVolumes400.Type> | SigNozError<"ListVolumes401", typeof ListVolumes401.Type> | SigNozError<"ListVolumes403", typeof ListVolumes403.Type> | SigNozError<"ListVolumes500", typeof ListVolumes500.Type>>
  /**
* Returns a paginated list of Kubernetes StatefulSets with key aggregated pod metrics: CPU usage and memory working set summed across pods owned by the statefulset, plus average CPU/memory request and limit utilization (statefulSetCPURequest, statefulSetCPULimit, statefulSetMemoryRequest, statefulSetMemoryLimit). Each row also reports the latest known desiredPods (k8s.statefulset.desired_pods) and currentPods (k8s.statefulset.current_pods) replica counts and per-group podCountsByPhase ({ pending, running, succeeded, failed, unknown } from each pod's latest k8s.pod.phase value). Each statefulset includes metadata attributes (k8s.statefulset.name, k8s.namespace.name, k8s.cluster.name). The response type is 'list' for the default k8s.statefulset.name grouping or 'grouped_list' for custom groupBy keys; in both modes every row aggregates pods owned by statefulsets in the group. Supports filtering via a filter expression, custom groupBy, ordering by cpu / cpu_request / cpu_limit / memory / memory_request / memory_limit / desired_pods / current_pods, and pagination via offset/limit. Also reports whether the requested time range falls before the data retention boundary. Numeric metric fields (statefulSetCPU, statefulSetCPURequest, statefulSetCPULimit, statefulSetMemory, statefulSetMemoryRequest, statefulSetMemoryLimit, desiredPods, currentPods) return -1 as a sentinel when no data is available for that field.
*/
readonly "ListStatefulSets": <Config extends OperationConfig>(options: { readonly payload: typeof ListStatefulSetsRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof ListStatefulSets200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ListStatefulSets400", typeof ListStatefulSets400.Type> | SigNozError<"ListStatefulSets401", typeof ListStatefulSets401.Type> | SigNozError<"ListStatefulSets403", typeof ListStatefulSets403.Type> | SigNozError<"ListStatefulSets500", typeof ListStatefulSets500.Type>>
  /**
* Liveness check
*/
readonly "Livez": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof Livez200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"Livez500", typeof Livez500.Type>>
  /**
* Returns active metric volume-control (label reduction) rules.
*/
readonly "ListMetricReductionRules": <Config extends OperationConfig>(options: { readonly params?: typeof ListMetricReductionRulesParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ListMetricReductionRules200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ListMetricReductionRules401", typeof ListMetricReductionRules401.Type> | SigNozError<"ListMetricReductionRules403", typeof ListMetricReductionRules403.Type> | SigNozError<"ListMetricReductionRules451", typeof ListMetricReductionRules451.Type> | SigNozError<"ListMetricReductionRules500", typeof ListMetricReductionRules500.Type> | SigNozError<"ListMetricReductionRules501", typeof ListMetricReductionRules501.Type>>
  /**
* Creates a volume-control rule for a metric and returns it with its id; fails if the metric already has a rule.
*/
readonly "CreateMetricReductionRule": <Config extends OperationConfig>(options: { readonly payload: typeof CreateMetricReductionRuleRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof CreateMetricReductionRule201.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"CreateMetricReductionRule400", typeof CreateMetricReductionRule400.Type> | SigNozError<"CreateMetricReductionRule401", typeof CreateMetricReductionRule401.Type> | SigNozError<"CreateMetricReductionRule403", typeof CreateMetricReductionRule403.Type> | SigNozError<"CreateMetricReductionRule409", typeof CreateMetricReductionRule409.Type> | SigNozError<"CreateMetricReductionRule451", typeof CreateMetricReductionRule451.Type> | SigNozError<"CreateMetricReductionRule500", typeof CreateMetricReductionRule500.Type> | SigNozError<"CreateMetricReductionRule501", typeof CreateMetricReductionRule501.Type>>
  /**
* Returns a single volume-control rule by its id.
*/
readonly "GetMetricReductionRuleByID": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetMetricReductionRuleByID200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetMetricReductionRuleByID401", typeof GetMetricReductionRuleByID401.Type> | SigNozError<"GetMetricReductionRuleByID403", typeof GetMetricReductionRuleByID403.Type> | SigNozError<"GetMetricReductionRuleByID404", typeof GetMetricReductionRuleByID404.Type> | SigNozError<"GetMetricReductionRuleByID451", typeof GetMetricReductionRuleByID451.Type> | SigNozError<"GetMetricReductionRuleByID500", typeof GetMetricReductionRuleByID500.Type> | SigNozError<"GetMetricReductionRuleByID501", typeof GetMetricReductionRuleByID501.Type>>
  /**
* Updates the match type and labels of a volume-control rule by its id; the metric name is immutable.
*/
readonly "UpdateMetricReductionRuleByID": <Config extends OperationConfig>(id: string, options: { readonly payload: typeof UpdateMetricReductionRuleByIDRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof UpdateMetricReductionRuleByID200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"UpdateMetricReductionRuleByID400", typeof UpdateMetricReductionRuleByID400.Type> | SigNozError<"UpdateMetricReductionRuleByID401", typeof UpdateMetricReductionRuleByID401.Type> | SigNozError<"UpdateMetricReductionRuleByID403", typeof UpdateMetricReductionRuleByID403.Type> | SigNozError<"UpdateMetricReductionRuleByID404", typeof UpdateMetricReductionRuleByID404.Type> | SigNozError<"UpdateMetricReductionRuleByID451", typeof UpdateMetricReductionRuleByID451.Type> | SigNozError<"UpdateMetricReductionRuleByID500", typeof UpdateMetricReductionRuleByID500.Type> | SigNozError<"UpdateMetricReductionRuleByID501", typeof UpdateMetricReductionRuleByID501.Type>>
  /**
* Deletes a volume-control rule by its id.
*/
readonly "DeleteMetricReductionRuleByID": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"DeleteMetricReductionRuleByID401", typeof DeleteMetricReductionRuleByID401.Type> | SigNozError<"DeleteMetricReductionRuleByID403", typeof DeleteMetricReductionRuleByID403.Type> | SigNozError<"DeleteMetricReductionRuleByID404", typeof DeleteMetricReductionRuleByID404.Type> | SigNozError<"DeleteMetricReductionRuleByID451", typeof DeleteMetricReductionRuleByID451.Type> | SigNozError<"DeleteMetricReductionRuleByID500", typeof DeleteMetricReductionRuleByID500.Type> | SigNozError<"DeleteMetricReductionRuleByID501", typeof DeleteMetricReductionRuleByID501.Type>>
  /**
* Estimates the series reduction and related-asset impact of a candidate volume-control rule without persisting it.
*/
readonly "PreviewMetricReductionRule": <Config extends OperationConfig>(options: { readonly payload: typeof PreviewMetricReductionRuleRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof PreviewMetricReductionRule200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"PreviewMetricReductionRule400", typeof PreviewMetricReductionRule400.Type> | SigNozError<"PreviewMetricReductionRule401", typeof PreviewMetricReductionRule401.Type> | SigNozError<"PreviewMetricReductionRule403", typeof PreviewMetricReductionRule403.Type> | SigNozError<"PreviewMetricReductionRule404", typeof PreviewMetricReductionRule404.Type> | SigNozError<"PreviewMetricReductionRule451", typeof PreviewMetricReductionRule451.Type> | SigNozError<"PreviewMetricReductionRule500", typeof PreviewMetricReductionRule500.Type> | SigNozError<"PreviewMetricReductionRule501", typeof PreviewMetricReductionRule501.Type>>
  /**
* Returns total ingested vs retained series and the estimated monthly savings across all volume-control rules.
*/
readonly "GetMetricReductionRuleStats": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetMetricReductionRuleStats200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetMetricReductionRuleStats401", typeof GetMetricReductionRuleStats401.Type> | SigNozError<"GetMetricReductionRuleStats403", typeof GetMetricReductionRuleStats403.Type> | SigNozError<"GetMetricReductionRuleStats451", typeof GetMetricReductionRuleStats451.Type> | SigNozError<"GetMetricReductionRuleStats500", typeof GetMetricReductionRuleStats500.Type> | SigNozError<"GetMetricReductionRuleStats501", typeof GetMetricReductionRuleStats501.Type>>
  /**
* Returns ingested vs retained series over time across all volume-control rules (hourly buckets), in the query-range time-series response shape.
*/
readonly "GetMetricReductionRuleTimeseries": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetMetricReductionRuleTimeseries200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetMetricReductionRuleTimeseries401", typeof GetMetricReductionRuleTimeseries401.Type> | SigNozError<"GetMetricReductionRuleTimeseries403", typeof GetMetricReductionRuleTimeseries403.Type> | SigNozError<"GetMetricReductionRuleTimeseries451", typeof GetMetricReductionRuleTimeseries451.Type> | SigNozError<"GetMetricReductionRuleTimeseries500", typeof GetMetricReductionRuleTimeseries500.Type> | SigNozError<"GetMetricReductionRuleTimeseries501", typeof GetMetricReductionRuleTimeseries501.Type>>
  /**
* This endpoint returns a list of distinct metric names within the specified time range
*/
readonly "ListMetrics": <Config extends OperationConfig>(options: { readonly params?: typeof ListMetricsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ListMetrics200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ListMetrics400", typeof ListMetrics400.Type> | SigNozError<"ListMetrics401", typeof ListMetrics401.Type> | SigNozError<"ListMetrics403", typeof ListMetrics403.Type> | SigNozError<"ListMetrics500", typeof ListMetrics500.Type>>
  /**
* This endpoint returns associated alerts for a specified metric
*/
readonly "GetMetricAlerts": <Config extends OperationConfig>(options: { readonly params: typeof GetMetricAlertsParams.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof GetMetricAlerts200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetMetricAlerts400", typeof GetMetricAlerts400.Type> | SigNozError<"GetMetricAlerts401", typeof GetMetricAlerts401.Type> | SigNozError<"GetMetricAlerts403", typeof GetMetricAlerts403.Type> | SigNozError<"GetMetricAlerts404", typeof GetMetricAlerts404.Type> | SigNozError<"GetMetricAlerts500", typeof GetMetricAlerts500.Type>>
  /**
* This endpoint returns attribute keys and their unique values for a specified metric
*/
readonly "GetMetricAttributes": <Config extends OperationConfig>(options: { readonly params: typeof GetMetricAttributesParams.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof GetMetricAttributes200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetMetricAttributes400", typeof GetMetricAttributes400.Type> | SigNozError<"GetMetricAttributes401", typeof GetMetricAttributes401.Type> | SigNozError<"GetMetricAttributes403", typeof GetMetricAttributes403.Type> | SigNozError<"GetMetricAttributes404", typeof GetMetricAttributes404.Type> | SigNozError<"GetMetricAttributes500", typeof GetMetricAttributes500.Type>>
  /**
* This endpoint returns associated dashboards for a specified metric
*/
readonly "GetMetricDashboards": <Config extends OperationConfig>(options: { readonly params: typeof GetMetricDashboardsParams.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof GetMetricDashboards200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetMetricDashboards400", typeof GetMetricDashboards400.Type> | SigNozError<"GetMetricDashboards401", typeof GetMetricDashboards401.Type> | SigNozError<"GetMetricDashboards403", typeof GetMetricDashboards403.Type> | SigNozError<"GetMetricDashboards404", typeof GetMetricDashboards404.Type> | SigNozError<"GetMetricDashboards500", typeof GetMetricDashboards500.Type>>
  /**
* This endpoint returns highlights like number of datapoints, totaltimeseries, active time series, last received time for a specified metric
*/
readonly "GetMetricHighlights": <Config extends OperationConfig>(options: { readonly params: typeof GetMetricHighlightsParams.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof GetMetricHighlights200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetMetricHighlights400", typeof GetMetricHighlights400.Type> | SigNozError<"GetMetricHighlights401", typeof GetMetricHighlights401.Type> | SigNozError<"GetMetricHighlights403", typeof GetMetricHighlights403.Type> | SigNozError<"GetMetricHighlights404", typeof GetMetricHighlights404.Type> | SigNozError<"GetMetricHighlights500", typeof GetMetricHighlights500.Type>>
  /**
* Returns raw time series data points for a metric within a time range (max 30 minutes). Each series includes labels and timestamp/value pairs.
*/
readonly "InspectMetrics": <Config extends OperationConfig>(options: { readonly payload: typeof InspectMetricsRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof InspectMetrics200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"InspectMetrics400", typeof InspectMetrics400.Type> | SigNozError<"InspectMetrics401", typeof InspectMetrics401.Type> | SigNozError<"InspectMetrics403", typeof InspectMetrics403.Type> | SigNozError<"InspectMetrics500", typeof InspectMetrics500.Type>>
  /**
* This endpoint returns metadata information like metric description, unit, type, temporality, monotonicity for a specified metric
*/
readonly "GetMetricMetadata": <Config extends OperationConfig>(options: { readonly params: typeof GetMetricMetadataParams.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof GetMetricMetadata200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetMetricMetadata400", typeof GetMetricMetadata400.Type> | SigNozError<"GetMetricMetadata401", typeof GetMetricMetadata401.Type> | SigNozError<"GetMetricMetadata403", typeof GetMetricMetadata403.Type> | SigNozError<"GetMetricMetadata404", typeof GetMetricMetadata404.Type> | SigNozError<"GetMetricMetadata500", typeof GetMetricMetadata500.Type>>
  /**
* This endpoint helps to update metadata information like metric description, unit, type, temporality, monotonicity for a specified metric
*/
readonly "UpdateMetricMetadata": <Config extends OperationConfig>(options: { readonly payload: typeof UpdateMetricMetadataRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"UpdateMetricMetadata400", typeof UpdateMetricMetadata400.Type> | SigNozError<"UpdateMetricMetadata401", typeof UpdateMetricMetadata401.Type> | SigNozError<"UpdateMetricMetadata403", typeof UpdateMetricMetadata403.Type> | SigNozError<"UpdateMetricMetadata500", typeof UpdateMetricMetadata500.Type>>
  /**
* Lightweight endpoint that checks if any non-SigNoz metrics have been ingested, used for onboarding status detection
*/
readonly "GetMetricsOnboardingStatus": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetMetricsOnboardingStatus200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetMetricsOnboardingStatus401", typeof GetMetricsOnboardingStatus401.Type> | SigNozError<"GetMetricsOnboardingStatus403", typeof GetMetricsOnboardingStatus403.Type> | SigNozError<"GetMetricsOnboardingStatus500", typeof GetMetricsOnboardingStatus500.Type>>
  /**
* This endpoint provides list of metrics with their number of samples and timeseries for the given time range
*/
readonly "GetMetricsStats": <Config extends OperationConfig>(options: { readonly payload: typeof GetMetricsStatsRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof GetMetricsStats200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetMetricsStats400", typeof GetMetricsStats400.Type> | SigNozError<"GetMetricsStats401", typeof GetMetricsStats401.Type> | SigNozError<"GetMetricsStats403", typeof GetMetricsStats403.Type> | SigNozError<"GetMetricsStats500", typeof GetMetricsStats500.Type>>
  /**
* This endpoint returns a treemap visualization showing the proportional distribution of metrics by sample count or time series count
*/
readonly "GetMetricsTreemap": <Config extends OperationConfig>(options: { readonly payload: typeof GetMetricsTreemapRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof GetMetricsTreemap200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetMetricsTreemap400", typeof GetMetricsTreemap400.Type> | SigNozError<"GetMetricsTreemap401", typeof GetMetricsTreemap401.Type> | SigNozError<"GetMetricsTreemap403", typeof GetMetricsTreemap403.Type> | SigNozError<"GetMetricsTreemap500", typeof GetMetricsTreemap500.Type>>
  /**
* This endpoint returns the organization I belong to
*/
readonly "GetMyOrganization": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetMyOrganization200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetMyOrganization401", typeof GetMyOrganization401.Type> | SigNozError<"GetMyOrganization403", typeof GetMyOrganization403.Type> | SigNozError<"GetMyOrganization500", typeof GetMyOrganization500.Type>>
  /**
* This endpoint updates the organization I belong to
*/
readonly "UpdateMyOrganization": <Config extends OperationConfig>(options: { readonly payload: typeof UpdateMyOrganizationRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"UpdateMyOrganization400", typeof UpdateMyOrganization400.Type> | SigNozError<"UpdateMyOrganization401", typeof UpdateMyOrganization401.Type> | SigNozError<"UpdateMyOrganization403", typeof UpdateMyOrganization403.Type> | SigNozError<"UpdateMyOrganization409", typeof UpdateMyOrganization409.Type> | SigNozError<"UpdateMyOrganization500", typeof UpdateMyOrganization500.Type>>
  /**
* This endpoint returns the sanitized v2-shape dashboard data for public access. Each panel query is reduced to a safe field subset, so filters and raw query strings are not exposed.
*/
readonly "GetPublicDashboardDataV2": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetPublicDashboardDataV2200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetPublicDashboardDataV2400", typeof GetPublicDashboardDataV2400.Type> | SigNozError<"GetPublicDashboardDataV2401", typeof GetPublicDashboardDataV2401.Type> | SigNozError<"GetPublicDashboardDataV2403", typeof GetPublicDashboardDataV2403.Type> | SigNozError<"GetPublicDashboardDataV2404", typeof GetPublicDashboardDataV2404.Type> | SigNozError<"GetPublicDashboardDataV2500", typeof GetPublicDashboardDataV2500.Type>>
  /**
* This endpoint returns query range results for a panel of a v2-shape public dashboard. The panel is addressed by its key in spec.panels.
*/
readonly "GetPublicDashboardPanelQueryRangeV2": <Config extends OperationConfig>(id: string, key: string, options: { readonly params?: typeof GetPublicDashboardPanelQueryRangeV2Params.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetPublicDashboardPanelQueryRangeV2200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetPublicDashboardPanelQueryRangeV2400", typeof GetPublicDashboardPanelQueryRangeV2400.Type> | SigNozError<"GetPublicDashboardPanelQueryRangeV2401", typeof GetPublicDashboardPanelQueryRangeV2401.Type> | SigNozError<"GetPublicDashboardPanelQueryRangeV2403", typeof GetPublicDashboardPanelQueryRangeV2403.Type> | SigNozError<"GetPublicDashboardPanelQueryRangeV2404", typeof GetPublicDashboardPanelQueryRangeV2404.Type> | SigNozError<"GetPublicDashboardPanelQueryRangeV2500", typeof GetPublicDashboardPanelQueryRangeV2500.Type>>
  /**
* Readiness check
*/
readonly "Readyz": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof Readyz200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"Readyz503", typeof Readyz503.Type>>
  /**
* This endpoint verifies whether a reset password token exists and is not expired
*/
readonly "VerifyResetPasswordToken": <Config extends OperationConfig>(options: { readonly payload: typeof VerifyResetPasswordTokenRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"VerifyResetPasswordToken400", typeof VerifyResetPasswordToken400.Type> | SigNozError<"VerifyResetPasswordToken404", typeof VerifyResetPasswordToken404.Type> | SigNozError<"VerifyResetPasswordToken500", typeof VerifyResetPasswordToken500.Type>>
  /**
* This endpoint returns the users having the role by role id
*/
readonly "GetUsersByRoleID": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetUsersByRoleID200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetUsersByRoleID401", typeof GetUsersByRoleID401.Type> | SigNozError<"GetUsersByRoleID403", typeof GetUsersByRoleID403.Type> | SigNozError<"GetUsersByRoleID404", typeof GetUsersByRoleID404.Type> | SigNozError<"GetUsersByRoleID500", typeof GetUsersByRoleID500.Type>>
  /**
* This endpoint lists all alert rules with their current evaluation state
*/
readonly "ListRules": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ListRules200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ListRules401", typeof ListRules401.Type> | SigNozError<"ListRules403", typeof ListRules403.Type> | SigNozError<"ListRules500", typeof ListRules500.Type>>
  /**
* This endpoint creates a new alert rule
*/
readonly "CreateRule": <Config extends OperationConfig>(options: { readonly payload: typeof CreateRuleRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof CreateRule201.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"CreateRule400", typeof CreateRule400.Type> | SigNozError<"CreateRule401", typeof CreateRule401.Type> | SigNozError<"CreateRule403", typeof CreateRule403.Type> | SigNozError<"CreateRule500", typeof CreateRule500.Type>>
  /**
* This endpoint returns an alert rule by ID
*/
readonly "GetRuleByID": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetRuleByID200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetRuleByID401", typeof GetRuleByID401.Type> | SigNozError<"GetRuleByID403", typeof GetRuleByID403.Type> | SigNozError<"GetRuleByID404", typeof GetRuleByID404.Type> | SigNozError<"GetRuleByID500", typeof GetRuleByID500.Type>>
  /**
* This endpoint updates an alert rule by ID
*/
readonly "UpdateRuleByID": <Config extends OperationConfig>(id: string, options: { readonly payload: typeof UpdateRuleByIDRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"UpdateRuleByID400", typeof UpdateRuleByID400.Type> | SigNozError<"UpdateRuleByID401", typeof UpdateRuleByID401.Type> | SigNozError<"UpdateRuleByID403", typeof UpdateRuleByID403.Type> | SigNozError<"UpdateRuleByID404", typeof UpdateRuleByID404.Type> | SigNozError<"UpdateRuleByID500", typeof UpdateRuleByID500.Type>>
  /**
* This endpoint deletes an alert rule by ID
*/
readonly "DeleteRuleByID": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"DeleteRuleByID401", typeof DeleteRuleByID401.Type> | SigNozError<"DeleteRuleByID403", typeof DeleteRuleByID403.Type> | SigNozError<"DeleteRuleByID404", typeof DeleteRuleByID404.Type> | SigNozError<"DeleteRuleByID500", typeof DeleteRuleByID500.Type>>
  /**
* This endpoint applies a partial update to an alert rule by ID
*/
readonly "PatchRuleByID": <Config extends OperationConfig>(id: string, options: { readonly payload: typeof PatchRuleByIDRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof PatchRuleByID200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"PatchRuleByID400", typeof PatchRuleByID400.Type> | SigNozError<"PatchRuleByID401", typeof PatchRuleByID401.Type> | SigNozError<"PatchRuleByID403", typeof PatchRuleByID403.Type> | SigNozError<"PatchRuleByID404", typeof PatchRuleByID404.Type> | SigNozError<"PatchRuleByID500", typeof PatchRuleByID500.Type>>
  /**
* Returns distinct label keys from rule history entries for the selected range.
*/
readonly "GetRuleHistoryFilterKeys": <Config extends OperationConfig>(id: string, options: { readonly params?: typeof GetRuleHistoryFilterKeysParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetRuleHistoryFilterKeys200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetRuleHistoryFilterKeys400", typeof GetRuleHistoryFilterKeys400.Type> | SigNozError<"GetRuleHistoryFilterKeys401", typeof GetRuleHistoryFilterKeys401.Type> | SigNozError<"GetRuleHistoryFilterKeys403", typeof GetRuleHistoryFilterKeys403.Type> | SigNozError<"GetRuleHistoryFilterKeys500", typeof GetRuleHistoryFilterKeys500.Type>>
  /**
* Returns distinct label values for a given key from rule history entries.
*/
readonly "GetRuleHistoryFilterValues": <Config extends OperationConfig>(id: string, options: { readonly params?: typeof GetRuleHistoryFilterValuesParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetRuleHistoryFilterValues200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetRuleHistoryFilterValues400", typeof GetRuleHistoryFilterValues400.Type> | SigNozError<"GetRuleHistoryFilterValues401", typeof GetRuleHistoryFilterValues401.Type> | SigNozError<"GetRuleHistoryFilterValues403", typeof GetRuleHistoryFilterValues403.Type> | SigNozError<"GetRuleHistoryFilterValues500", typeof GetRuleHistoryFilterValues500.Type>>
  /**
* Returns overall firing/inactive intervals for a rule in the selected time range.
*/
readonly "GetRuleHistoryOverallStatus": <Config extends OperationConfig>(id: string, options: { readonly params: typeof GetRuleHistoryOverallStatusParams.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof GetRuleHistoryOverallStatus200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetRuleHistoryOverallStatus400", typeof GetRuleHistoryOverallStatus400.Type> | SigNozError<"GetRuleHistoryOverallStatus401", typeof GetRuleHistoryOverallStatus401.Type> | SigNozError<"GetRuleHistoryOverallStatus403", typeof GetRuleHistoryOverallStatus403.Type> | SigNozError<"GetRuleHistoryOverallStatus500", typeof GetRuleHistoryOverallStatus500.Type>>
  /**
* Returns trigger and resolution statistics for a rule in the selected time range.
*/
readonly "GetRuleHistoryStats": <Config extends OperationConfig>(id: string, options: { readonly params: typeof GetRuleHistoryStatsParams.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof GetRuleHistoryStats200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetRuleHistoryStats400", typeof GetRuleHistoryStats400.Type> | SigNozError<"GetRuleHistoryStats401", typeof GetRuleHistoryStats401.Type> | SigNozError<"GetRuleHistoryStats403", typeof GetRuleHistoryStats403.Type> | SigNozError<"GetRuleHistoryStats500", typeof GetRuleHistoryStats500.Type>>
  /**
* Returns paginated timeline entries for rule state transitions.
*/
readonly "GetRuleHistoryTimeline": <Config extends OperationConfig>(id: string, options: { readonly params: typeof GetRuleHistoryTimelineParams.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof GetRuleHistoryTimeline200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetRuleHistoryTimeline400", typeof GetRuleHistoryTimeline400.Type> | SigNozError<"GetRuleHistoryTimeline401", typeof GetRuleHistoryTimeline401.Type> | SigNozError<"GetRuleHistoryTimeline403", typeof GetRuleHistoryTimeline403.Type> | SigNozError<"GetRuleHistoryTimeline500", typeof GetRuleHistoryTimeline500.Type>>
  /**
* Returns top label combinations contributing to rule firing in the selected time range.
*/
readonly "GetRuleHistoryTopContributors": <Config extends OperationConfig>(id: string, options: { readonly params: typeof GetRuleHistoryTopContributorsParams.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof GetRuleHistoryTopContributors200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetRuleHistoryTopContributors400", typeof GetRuleHistoryTopContributors400.Type> | SigNozError<"GetRuleHistoryTopContributors401", typeof GetRuleHistoryTopContributors401.Type> | SigNozError<"GetRuleHistoryTopContributors403", typeof GetRuleHistoryTopContributors403.Type> | SigNozError<"GetRuleHistoryTopContributors500", typeof GetRuleHistoryTopContributors500.Type>>
  /**
* This endpoint fires a test notification for the given rule definition
*/
readonly "TestRule": <Config extends OperationConfig>(options: { readonly payload: typeof TestRuleRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof TestRule200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"TestRule400", typeof TestRule400.Type> | SigNozError<"TestRule401", typeof TestRule401.Type> | SigNozError<"TestRule403", typeof TestRule403.Type> | SigNozError<"TestRule500", typeof TestRule500.Type>>
  /**
* This endpoint deletes the session
*/
readonly "DeleteSession": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"DeleteSession400", typeof DeleteSession400.Type> | SigNozError<"DeleteSession401", typeof DeleteSession401.Type> | SigNozError<"DeleteSession403", typeof DeleteSession403.Type> | SigNozError<"DeleteSession500", typeof DeleteSession500.Type>>
  /**
* This endpoint returns the context for the session
*/
readonly "GetSessionContext": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetSessionContext200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetSessionContext400", typeof GetSessionContext400.Type> | SigNozError<"GetSessionContext500", typeof GetSessionContext500.Type>>
  /**
* This endpoint creates a session for a user using email and password.
*/
readonly "CreateSessionByEmailPassword": <Config extends OperationConfig>(options: { readonly payload: typeof CreateSessionByEmailPasswordRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof CreateSessionByEmailPassword200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"CreateSessionByEmailPassword400", typeof CreateSessionByEmailPassword400.Type> | SigNozError<"CreateSessionByEmailPassword404", typeof CreateSessionByEmailPassword404.Type> | SigNozError<"CreateSessionByEmailPassword500", typeof CreateSessionByEmailPassword500.Type>>
  /**
* This endpoint rotates the session
*/
readonly "RotateSession": <Config extends OperationConfig>(options: { readonly payload: typeof RotateSessionRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof RotateSession200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"RotateSession400", typeof RotateSession400.Type> | SigNozError<"RotateSession500", typeof RotateSession500.Type>>
  /**
* This endpoint assigns a role to a user
*/
readonly "CreateUserRole": <Config extends OperationConfig>(options: { readonly payload: typeof CreateUserRoleRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof CreateUserRole201.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"CreateUserRole400", typeof CreateUserRole400.Type> | SigNozError<"CreateUserRole401", typeof CreateUserRole401.Type> | SigNozError<"CreateUserRole403", typeof CreateUserRole403.Type> | SigNozError<"CreateUserRole404", typeof CreateUserRole404.Type> | SigNozError<"CreateUserRole500", typeof CreateUserRole500.Type>>
  /**
* This endpoint gets an existing user role
*/
readonly "GetUserRole": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetUserRole200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetUserRole400", typeof GetUserRole400.Type> | SigNozError<"GetUserRole401", typeof GetUserRole401.Type> | SigNozError<"GetUserRole403", typeof GetUserRole403.Type> | SigNozError<"GetUserRole404", typeof GetUserRole404.Type> | SigNozError<"GetUserRole500", typeof GetUserRole500.Type>>
  /**
* This endpoint revokes a role from a user
*/
readonly "DeleteUserRole": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"DeleteUserRole400", typeof DeleteUserRole400.Type> | SigNozError<"DeleteUserRole401", typeof DeleteUserRole401.Type> | SigNozError<"DeleteUserRole403", typeof DeleteUserRole403.Type> | SigNozError<"DeleteUserRole404", typeof DeleteUserRole404.Type> | SigNozError<"DeleteUserRole500", typeof DeleteUserRole500.Type>>
  /**
* This endpoint lists all users for the organization
*/
readonly "ListUsers": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ListUsers200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ListUsers401", typeof ListUsers401.Type> | SigNozError<"ListUsers403", typeof ListUsers403.Type> | SigNozError<"ListUsers500", typeof ListUsers500.Type>>
  /**
* This endpoint creates a user for the organization
*/
readonly "CreateUser": <Config extends OperationConfig>(options: { readonly payload: typeof CreateUserRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof CreateUser201.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"CreateUser400", typeof CreateUser400.Type> | SigNozError<"CreateUser401", typeof CreateUser401.Type> | SigNozError<"CreateUser403", typeof CreateUser403.Type> | SigNozError<"CreateUser409", typeof CreateUser409.Type> | SigNozError<"CreateUser500", typeof CreateUser500.Type>>
  /**
* This endpoint returns the user by id
*/
readonly "GetUser": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetUser200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetUser401", typeof GetUser401.Type> | SigNozError<"GetUser403", typeof GetUser403.Type> | SigNozError<"GetUser404", typeof GetUser404.Type> | SigNozError<"GetUser500", typeof GetUser500.Type>>
  /**
* This endpoint updates the user by id
*/
readonly "UpdateUser": <Config extends OperationConfig>(id: string, options: { readonly payload: typeof UpdateUserRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"UpdateUser400", typeof UpdateUser400.Type> | SigNozError<"UpdateUser401", typeof UpdateUser401.Type> | SigNozError<"UpdateUser403", typeof UpdateUser403.Type> | SigNozError<"UpdateUser404", typeof UpdateUser404.Type> | SigNozError<"UpdateUser500", typeof UpdateUser500.Type>>
  /**
* This endpoint deletes the user by id
*/
readonly "DeleteUser": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"DeleteUser401", typeof DeleteUser401.Type> | SigNozError<"DeleteUser403", typeof DeleteUser403.Type> | SigNozError<"DeleteUser404", typeof DeleteUser404.Type> | SigNozError<"DeleteUser500", typeof DeleteUser500.Type>>
  /**
* This endpoint returns the existing reset password token for a user.
*/
readonly "GetResetPasswordToken": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetResetPasswordToken200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetResetPasswordToken401", typeof GetResetPasswordToken401.Type> | SigNozError<"GetResetPasswordToken403", typeof GetResetPasswordToken403.Type> | SigNozError<"GetResetPasswordToken404", typeof GetResetPasswordToken404.Type> | SigNozError<"GetResetPasswordToken500", typeof GetResetPasswordToken500.Type>>
  /**
* This endpoint creates or regenerates a reset password token for a user. If a valid token exists, it is returned. If expired, a new one is created.
*/
readonly "CreateResetPasswordToken": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof CreateResetPasswordToken201.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"CreateResetPasswordToken400", typeof CreateResetPasswordToken400.Type> | SigNozError<"CreateResetPasswordToken401", typeof CreateResetPasswordToken401.Type> | SigNozError<"CreateResetPasswordToken403", typeof CreateResetPasswordToken403.Type> | SigNozError<"CreateResetPasswordToken404", typeof CreateResetPasswordToken404.Type> | SigNozError<"CreateResetPasswordToken500", typeof CreateResetPasswordToken500.Type>>
  /**
* This endpoint returns the user roles by user id
*/
readonly "GetRolesByUserID": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetRolesByUserID200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetRolesByUserID401", typeof GetRolesByUserID401.Type> | SigNozError<"GetRolesByUserID403", typeof GetRolesByUserID403.Type> | SigNozError<"GetRolesByUserID404", typeof GetRolesByUserID404.Type> | SigNozError<"GetRolesByUserID500", typeof GetRolesByUserID500.Type>>
  /**
* This endpoint assigns the role to the user roles by user id
*/
readonly "SetRoleByUserID": <Config extends OperationConfig>(id: string, options: { readonly payload: typeof SetRoleByUserIDRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"SetRoleByUserID401", typeof SetRoleByUserID401.Type> | SigNozError<"SetRoleByUserID403", typeof SetRoleByUserID403.Type> | SigNozError<"SetRoleByUserID404", typeof SetRoleByUserID404.Type> | SigNozError<"SetRoleByUserID500", typeof SetRoleByUserID500.Type>>
  /**
* This endpoint removes a role from the user by user id and role id
*/
readonly "RemoveUserRoleByUserIDAndRoleID": <Config extends OperationConfig>(id: string, roleId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"RemoveUserRoleByUserIDAndRoleID401", typeof RemoveUserRoleByUserIDAndRoleID401.Type> | SigNozError<"RemoveUserRoleByUserIDAndRoleID403", typeof RemoveUserRoleByUserIDAndRoleID403.Type> | SigNozError<"RemoveUserRoleByUserIDAndRoleID404", typeof RemoveUserRoleByUserIDAndRoleID404.Type> | SigNozError<"RemoveUserRoleByUserIDAndRoleID500", typeof RemoveUserRoleByUserIDAndRoleID500.Type>>
  /**
* This endpoint returns the user I belong to
*/
readonly "GetMyUser": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetMyUser200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetMyUser401", typeof GetMyUser401.Type> | SigNozError<"GetMyUser403", typeof GetMyUser403.Type> | SigNozError<"GetMyUser500", typeof GetMyUser500.Type>>
  /**
* This endpoint updates the user I belong to
*/
readonly "UpdateMyUserV2": <Config extends OperationConfig>(options: { readonly payload: typeof UpdateMyUserV2RequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"UpdateMyUserV2401", typeof UpdateMyUserV2401.Type> | SigNozError<"UpdateMyUserV2403", typeof UpdateMyUserV2403.Type> | SigNozError<"UpdateMyUserV2500", typeof UpdateMyUserV2500.Type>>
  /**
* Same as ListDashboardsV2 but personalized for the calling user: each dashboard carries the caller's `pinned` state, and pinned dashboards float to the top of the requested ordering. Supports the same filter DSL, sort, order, and pagination.
*/
readonly "ListDashboardsForUserV2": <Config extends OperationConfig>(options: { readonly params?: typeof ListDashboardsForUserV2Params.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ListDashboardsForUserV2200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ListDashboardsForUserV2400", typeof ListDashboardsForUserV2400.Type> | SigNozError<"ListDashboardsForUserV2401", typeof ListDashboardsForUserV2401.Type> | SigNozError<"ListDashboardsForUserV2403", typeof ListDashboardsForUserV2403.Type> | SigNozError<"ListDashboardsForUserV2500", typeof ListDashboardsForUserV2500.Type>>
  /**
* Pins the dashboard for the calling user. A user can pin at most 10 dashboards; pinning when at the limit returns 409. Re-pinning an already-pinned dashboard is a no-op success.
*/
readonly "PinDashboardV2": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"PinDashboardV2400", typeof PinDashboardV2400.Type> | SigNozError<"PinDashboardV2401", typeof PinDashboardV2401.Type> | SigNozError<"PinDashboardV2403", typeof PinDashboardV2403.Type> | SigNozError<"PinDashboardV2404", typeof PinDashboardV2404.Type> | SigNozError<"PinDashboardV2409", typeof PinDashboardV2409.Type> | SigNozError<"PinDashboardV2500", typeof PinDashboardV2500.Type>>
  /**
* Removes the pin for the calling user. Idempotent — unpinning a dashboard that wasn't pinned still returns 204.
*/
readonly "UnpinDashboardV2": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"UnpinDashboardV2400", typeof UnpinDashboardV2400.Type> | SigNozError<"UnpinDashboardV2401", typeof UnpinDashboardV2401.Type> | SigNozError<"UnpinDashboardV2403", typeof UnpinDashboardV2403.Type> | SigNozError<"UnpinDashboardV2500", typeof UnpinDashboardV2500.Type>>
  /**
* This endpoint updates the password of the user I belong to
*/
readonly "UpdateMyPassword": <Config extends OperationConfig>(options: { readonly payload: typeof UpdateMyPasswordRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"UpdateMyPassword400", typeof UpdateMyPassword400.Type> | SigNozError<"UpdateMyPassword401", typeof UpdateMyPassword401.Type> | SigNozError<"UpdateMyPassword403", typeof UpdateMyPassword403.Type> | SigNozError<"UpdateMyPassword404", typeof UpdateMyPassword404.Type> | SigNozError<"UpdateMyPassword500", typeof UpdateMyPassword500.Type>>
  /**
* This endpoint gets the host info from zeus.
*/
readonly "GetHosts": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetHosts200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetHosts400", typeof GetHosts400.Type> | SigNozError<"GetHosts401", typeof GetHosts401.Type> | SigNozError<"GetHosts403", typeof GetHosts403.Type> | SigNozError<"GetHosts404", typeof GetHosts404.Type> | SigNozError<"GetHosts500", typeof GetHosts500.Type>>
  /**
* This endpoint saves the host of a deployment to zeus.
*/
readonly "PutHost": <Config extends OperationConfig>(options: { readonly payload: typeof PutHostRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"PutHost400", typeof PutHost400.Type> | SigNozError<"PutHost401", typeof PutHost401.Type> | SigNozError<"PutHost403", typeof PutHost403.Type> | SigNozError<"PutHost404", typeof PutHost404.Type> | SigNozError<"PutHost409", typeof PutHost409.Type> | SigNozError<"PutHost500", typeof PutHost500.Type>>
  /**
* This endpoint saves the profile of a deployment to zeus.
*/
readonly "PutProfile": <Config extends OperationConfig>(options: { readonly payload: typeof PutProfileRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"PutProfile400", typeof PutProfile400.Type> | SigNozError<"PutProfile401", typeof PutProfile401.Type> | SigNozError<"PutProfile403", typeof PutProfile403.Type> | SigNozError<"PutProfile404", typeof PutProfile404.Type> | SigNozError<"PutProfile409", typeof PutProfile409.Type> | SigNozError<"PutProfile500", typeof PutProfile500.Type>>
  /**
* This endpoint returns associated v2 dashboards for a specified metric
*/
readonly "GetMetricDashboardsV2": <Config extends OperationConfig>(options: { readonly params: typeof GetMetricDashboardsV2Params.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof GetMetricDashboardsV2200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetMetricDashboardsV2400", typeof GetMetricDashboardsV2400.Type> | SigNozError<"GetMetricDashboardsV2401", typeof GetMetricDashboardsV2401.Type> | SigNozError<"GetMetricDashboardsV2403", typeof GetMetricDashboardsV2403.Type> | SigNozError<"GetMetricDashboardsV2404", typeof GetMetricDashboardsV2404.Type> | SigNozError<"GetMetricDashboardsV2500", typeof GetMetricDashboardsV2500.Type>>
  /**
* Returns the flamegraph view of spans for a given trace ID.
*/
readonly "GetFlamegraph": <Config extends OperationConfig>(traceID: string, options: { readonly payload: typeof GetFlamegraphRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof GetFlamegraph200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetFlamegraph400", typeof GetFlamegraph400.Type> | SigNozError<"GetFlamegraph401", typeof GetFlamegraph401.Type> | SigNozError<"GetFlamegraph403", typeof GetFlamegraph403.Type> | SigNozError<"GetFlamegraph404", typeof GetFlamegraph404.Type> | SigNozError<"GetFlamegraph500", typeof GetFlamegraph500.Type>>
  /**
* Returns the waterfall view of spans including all spans if total spans are under a limit, a max count otherwise. Aggregations are dropped compared to v3
*/
readonly "GetWaterfallV4": <Config extends OperationConfig>(traceID: string, options: { readonly payload: typeof GetWaterfallV4RequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof GetWaterfallV4200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"GetWaterfallV4400", typeof GetWaterfallV4400.Type> | SigNozError<"GetWaterfallV4401", typeof GetWaterfallV4401.Type> | SigNozError<"GetWaterfallV4403", typeof GetWaterfallV4403.Type> | SigNozError<"GetWaterfallV4404", typeof GetWaterfallV4404.Type> | SigNozError<"GetWaterfallV4500", typeof GetWaterfallV4500.Type>>
  /**
* Execute a composite query over a time range. Supports builder queries (traces, logs, metrics), formulas, trace operators, PromQL, and ClickHouse SQL.
*/
readonly "QueryRangeV5": <Config extends OperationConfig>(options: { readonly payload: typeof QueryRangeV5RequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof QueryRangeV5200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"QueryRangeV5400", typeof QueryRangeV5400.Type> | SigNozError<"QueryRangeV5401", typeof QueryRangeV5401.Type> | SigNozError<"QueryRangeV5403", typeof QueryRangeV5403.Type> | SigNozError<"QueryRangeV5500", typeof QueryRangeV5500.Type>>
  /**
* Validate a composite query without executing it. Accepts the same payload as the query range endpoint. By default (verbose=true) returns, for each query, the rendered underlying ClickHouse statement(s) with each statement's EXPLAIN ESTIMATE (per-table parts/rows/marks) and granule index analysis (candidate/surviving granules and the per-index pruning funnel). Pass ?verbose=false for the lightweight per-query verdict (valid/error/warnings) with no rendered SQL and no ClickHouse round trips. Intended for agentic/dry-run consumption: per-query errors are reported in the response rather than failing the whole request.
*/
readonly "QueryRangePreviewV5": <Config extends OperationConfig>(options: { readonly params?: typeof QueryRangePreviewV5Params.Encoded | undefined; readonly payload: typeof QueryRangePreviewV5RequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof QueryRangePreviewV5200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"QueryRangePreviewV5400", typeof QueryRangePreviewV5400.Type> | SigNozError<"QueryRangePreviewV5401", typeof QueryRangePreviewV5401.Type> | SigNozError<"QueryRangePreviewV5403", typeof QueryRangePreviewV5403.Type> | SigNozError<"QueryRangePreviewV5500", typeof QueryRangePreviewV5500.Type>>
  /**
* Replace variables in a query
*/
readonly "ReplaceVariables": <Config extends OperationConfig>(options: { readonly payload: typeof ReplaceVariablesRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof ReplaceVariables200.Type, Config>, HttpClientError.HttpClientError | SchemaError | SigNozError<"ReplaceVariables400", typeof ReplaceVariables400.Type> | SigNozError<"ReplaceVariables401", typeof ReplaceVariables401.Type> | SigNozError<"ReplaceVariables403", typeof ReplaceVariables403.Type> | SigNozError<"ReplaceVariables500", typeof ReplaceVariables500.Type>>
}

export interface SigNozError<Tag extends string, E> {
  readonly _tag: Tag
  readonly request: HttpClientRequest.HttpClientRequest
  readonly response: HttpClientResponse.HttpClientResponse
  readonly cause: E
}

class SigNozErrorImpl extends Data.Error<{
  _tag: string
  cause: any
  request: HttpClientRequest.HttpClientRequest
  response: HttpClientResponse.HttpClientResponse
}> {}

export const SigNozError = <Tag extends string, E>(
  tag: Tag,
  cause: E,
  response: HttpClientResponse.HttpClientResponse,
): SigNozError<Tag, E> =>
  new SigNozErrorImpl({
    _tag: tag,
    cause,
    response,
    request: response.request,
  }) as any
