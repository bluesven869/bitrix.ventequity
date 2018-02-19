CREATE TABLE B_BP_WORKFLOW_TEMPLATE (
	ID int NOT NULL,
	MODULE_ID varchar2(32 CHAR) NULL,
	ENTITY varchar2(64 CHAR) NOT NULL,
	DOCUMENT_TYPE varchar2(128 CHAR) NOT NULL,
	AUTO_EXECUTE int DEFAULT 0 NOT NULL,
	NAME varchar2(255 CHAR) NULL,
	DESCRIPTION clob NULL,
	TEMPLATE clob NULL,
	PARAMETERS clob NULL,
	VARIABLES clob NULL,
	CONSTANTS clob NULL,
	MODIFIED date NOT NULL,
	IS_MODIFIED char(1 CHAR) default 'N' NOT NULL,
	USER_ID int NULL,
	SYSTEM_CODE varchar2(50 CHAR) NULL,
	ACTIVE char(1 CHAR) default 'Y' NOT NULL,
	primary key (ID)
)
/
CREATE SEQUENCE SQ_B_BP_WORKFLOW_TEMPLATE INCREMENT BY 1 NOMAXVALUE NOCYCLE NOCACHE NOORDER
/
CREATE INDEX IX_BP_WF_TEMPLATE_MO ON B_BP_WORKFLOW_TEMPLATE(MODULE_ID, ENTITY, DOCUMENT_TYPE)
/


CREATE TABLE B_BP_WORKFLOW_STATE (
	ID varchar2(32 CHAR) NOT NULL,
	MODULE_ID varchar2(32 CHAR) NULL,
	ENTITY varchar2(64 CHAR) NOT NULL,
	DOCUMENT_ID varchar2(128 CHAR) NOT NULL,
	DOCUMENT_ID_INT int NOT NULL,
	WORKFLOW_TEMPLATE_ID int NOT NULL,
	STATE varchar2(128 CHAR) NULL,
	STATE_TITLE varchar2(255 CHAR) NULL,
	STATE_PARAMETERS clob NULL,
	MODIFIED date NOT NULL,
	STARTED date NULL,
	STARTED_BY int NULL,
	primary key (ID)
)
/
CREATE INDEX IX_BP_WS_DOCUMENT_ID ON B_BP_WORKFLOW_STATE(DOCUMENT_ID, ENTITY, MODULE_ID)
/
CREATE INDEX IX_BP_WS_DOCUMENT_ID1 ON B_BP_WORKFLOW_STATE(DOCUMENT_ID_INT, ENTITY, MODULE_ID, STATE)
/
CREATE INDEX IX_BP_WS_STARTED_BY ON B_BP_WORKFLOW_STATE(STARTED_BY)
/

CREATE TABLE B_BP_WORKFLOW_PERMISSIONS (
	ID int NOT NULL,
	WORKFLOW_ID varchar2(32 CHAR) NOT NULL,
	OBJECT_ID varchar2(64 CHAR) NOT NULL,
	PERMISSION varchar2(64 CHAR) NOT NULL,
	primary key (ID)
)
/
CREATE SEQUENCE SQ_B_BP_WORKFLOW_PERMISSIONS INCREMENT BY 1 NOMAXVALUE NOCYCLE NOCACHE NOORDER
/
CREATE INDEX IX_BP_WF_PERMISSIONS_WT ON B_BP_WORKFLOW_PERMISSIONS(WORKFLOW_ID)
/
CREATE OR REPLACE TRIGGER B_BP_WORKFLOW_PERMISSIONS_INS
BEFORE INSERT
ON B_BP_WORKFLOW_PERMISSIONS
FOR EACH ROW
BEGIN
	IF :NEW.ID IS NULL THEN
 		SELECT SQ_B_BP_WORKFLOW_PERMISSIONS.NEXTVAL INTO :NEW.ID FROM dual;
	END IF;
END;
/


CREATE TABLE B_BP_WORKFLOW_INSTANCE (
	ID varchar2(32 CHAR) NOT NULL,
	WORKFLOW clob NULL,
	STATUS int NULL,
	MODIFIED date NOT NULL,
	OWNER_ID varchar2(32 CHAR) NULL,
	OWNED_UNTIL date NULL,
	primary key (ID)
)
/

CREATE TABLE B_BP_TRACKING (
	ID int NOT NULL,
	WORKFLOW_ID varchar2(32 CHAR) NOT NULL,
	TYPE int NOT NULL,
	MODIFIED date NOT NULL,
	ACTION_NAME varchar2(128 CHAR) NOT NULL,
	ACTION_TITLE varchar2(255 CHAR) NULL,
	EXECUTION_STATUS int default 0 NOT NULL,
	EXECUTION_RESULT int default 0 NOT NULL,
	ACTION_NOTE clob NULL,
	MODIFIED_BY int NULL,
	primary key (ID)
)
/
CREATE SEQUENCE SQ_B_BP_TRACKING INCREMENT BY 1 NOMAXVALUE NOCYCLE NOCACHE NOORDER
/
CREATE INDEX IX_BP_TRACKING_WF ON B_BP_TRACKING(WORKFLOW_ID)
/
CREATE OR REPLACE TRIGGER B_BP_TRACKING_INSERT
BEFORE INSERT
ON B_BP_TRACKING
FOR EACH ROW
BEGIN
	IF :NEW.ID IS NULL THEN
 		SELECT SQ_B_BP_TRACKING.NEXTVAL INTO :NEW.ID FROM dual;
	END IF;
END;
/



CREATE TABLE B_BP_TASK (
	ID int NOT NULL,
	WORKFLOW_ID varchar2(32 CHAR) NOT NULL,
	ACTIVITY varchar2(128 CHAR) NOT NULL,
	ACTIVITY_NAME varchar2(128 CHAR) NOT NULL,
	MODIFIED date NOT NULL,
	OVERDUE_DATE date NULL,
	NAME varchar2(128 CHAR) NOT NULL,
	DESCRIPTION clob NULL,
	PARAMETERS clob NULL,
	STATUS int default 0 NOT NULL,
	IS_INLINE char(1 CHAR) default 'N' NOT NULL,
	DOCUMENT_NAME varchar2(255 CHAR) NULL,
	primary key (ID)
)
/
CREATE SEQUENCE SQ_B_BP_TASK INCREMENT BY 1 NOMAXVALUE NOCYCLE NOCACHE NOORDER
/
CREATE INDEX IX_BP_TASKS_SORT ON B_BP_TASK(OVERDUE_DATE, MODIFIED)
/
CREATE INDEX IX_BP_TASKS_WF ON B_BP_TASK(WORKFLOW_ID)
/


CREATE TABLE B_BP_TASK_USER (
	ID int NOT NULL,
	USER_ID int NOT NULL,
	TASK_ID int NOT NULL,
	STATUS int default 0 NOT NULL,
	DATE_UPDATE date NULL,
	ORIGINAL_USER_ID int default 0 NOT NULL,
	primary key (ID)
)
/
CREATE SEQUENCE SQ_B_BP_TASK_USER INCREMENT BY 1 NOMAXVALUE NOCYCLE NOCACHE NOORDER
/
CREATE UNIQUE INDEX IX_BP_TASK_USER ON B_BP_TASK_USER(USER_ID, TASK_ID)
/
CREATE INDEX IX_BP_TASK_USER_2 ON B_BP_TASK_USER(TASK_ID)
/
CREATE OR REPLACE TRIGGER B_BP_TASK_USER_INSERT
BEFORE INSERT
ON B_BP_TASK_USER
FOR EACH ROW
BEGIN
	IF :NEW.ID IS NULL THEN
 		SELECT SQ_B_BP_TASK_USER.NEXTVAL INTO :NEW.ID FROM dual;
	END IF;
END;
/

CREATE TABLE B_BP_HISTORY (
	ID int NOT NULL,
	MODULE_ID varchar2(32 CHAR) NULL,
	ENTITY varchar2(64 CHAR) NOT NULL,
	DOCUMENT_ID varchar2(128 CHAR) NOT NULL,
	NAME varchar2(255 CHAR) NOT NULL,
	DOCUMENT clob NULL,
	MODIFIED date NOT NULL,
	USER_ID int NULL,
	primary key (ID)
)
/
CREATE SEQUENCE SQ_B_BP_HISTORY INCREMENT BY 1 NOMAXVALUE NOCYCLE NOCACHE NOORDER
/
CREATE INDEX IX_BP_HISTORY_DOC ON B_BP_HISTORY(DOCUMENT_ID, ENTITY, MODULE_ID)
/

CREATE TABLE B_BP_WORKFLOW_STATE_IDENTIFY (
	ID int NOT NULL,
	WORKFLOW_ID varchar2(32 CHAR) NOT NULL,
	primary key (ID)
)
/
CREATE SEQUENCE S_B_BP_WORKFLOW_STATE_IDENTIFY INCREMENT BY 1 NOMAXVALUE NOCYCLE NOCACHE NOORDER
/
CREATE UNIQUE INDEX IX_BP_WSI_WF ON B_BP_WORKFLOW_STATE_IDENTIFY(WORKFLOW_ID)
/
CREATE OR REPLACE TRIGGER T_B_BP_WORKFLOW_STATE_IDENTIFY
BEFORE INSERT
ON B_BP_WORKFLOW_STATE_IDENTIFY
FOR EACH ROW
BEGIN
	IF :NEW.ID IS NULL THEN
 		SELECT S_B_BP_WORKFLOW_STATE_IDENTIFY.NEXTVAL INTO :NEW.ID FROM dual;
	END IF;
END;
/

CREATE TABLE B_BP_REST_ACTIVITY (
	ID int NOT NULL,
	APP_ID varchar2(128 CHAR) NOT NULL,
	APP_NAME clob NULL,
	CODE varchar2(128 CHAR) NOT NULL,
	INTERNAL_CODE varchar2(32 CHAR) NOT NULL,
	HANDLER varchar2(1000 CHAR) NOT NULL,
	AUTH_USER_ID int default 0 NOT NULL,
	USE_SUBSCRIPTION char(1 CHAR) default '' NOT NULL,
	NAME clob NULL,
	DESCRIPTION clob NULL,
	PROPERTIES clob NULL,
	RETURN_PROPERTIES clob NULL,
	DOCUMENT_TYPE clob NULL,
	FILTER clob NULL
)
/
CREATE SEQUENCE SQ_B_BP_REST_ACTIVITY INCREMENT BY 1 NOMAXVALUE NOCYCLE NOCACHE NOORDER
/
CREATE UNIQUE INDEX IX_BP_RA_IC ON B_BP_REST_ACTIVITY(INTERNAL_CODE)
/

CREATE TABLE B_BP_SCHEDULER_EVENT (
	ID int NOT NULL,
	WORKFLOW_ID varchar2(32 CHAR) NOT NULL,
	HANDLER varchar2(128 CHAR) NOT NULL,
	EVENT_MODULE varchar2(50 CHAR) NOT NULL,
	EVENT_TYPE varchar2(255 CHAR) NOT NULL,
	ENTITY_ID varchar2(255 CHAR) NOT NULL,
	PRIMARY KEY (ID)
)
/
CREATE SEQUENCE SQ_B_BP_SCHEDULER_EVENT INCREMENT BY 1 NOMAXVALUE NOCYCLE NOCACHE NOORDER
/
CREATE INDEX IX_B_BP_SE_1 ON B_BP_SCHEDULER_EVENT(EVENT_MODULE, EVENT_TYPE)
/
CREATE INDEX IX_B_BP_SE_2 ON B_BP_SCHEDULER_EVENT(EVENT_MODULE, EVENT_TYPE, ENTITY_ID)
/
CREATE INDEX IX_B_BP_SE_3 ON B_BP_SCHEDULER_EVENT(WORKFLOW_ID)
/