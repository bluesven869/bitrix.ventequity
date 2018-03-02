<?php
require_once(substr(__FILE__, 0, strlen(__FILE__) - strlen("/include.php"))."/bx_root.php");
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/start.php");
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/classes/general/virtual_io.php");
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/classes/general/virtual_file.php");
$instance = \Bitrix\Main\Application::getInstance();
$instance->initializeExtendedKernel(
    array("get" => $_GET, 
        "post" => $_POST, 
        "files" => $_FILES, 
        "cookie" => $_COOKIE, 
        "server" => $_SERVER, 
        "env" => $_ENV)
);
$GLOBALS["APPLICATION"] = new CMain;
if (defined("SITE_ID")) define("LANG", SITE_ID);
if (defined("LANG")) {
    if (defined("ADMIN_SECTION") && ADMIN_SECTION === true) 
        $db_lang = CLangAdmin::GetByID(LANG);
    else 
        $db_lang = CLang::GetByID(LANG);
    $arLang = $db_lang->Fetch();
    if (!$arLang) {
        throw new \Bitrix\Main\SystemException("Incorrect site: ".LANG.".");
    }
} else {
    $arLang = $GLOBALS["APPLICATION"]->GetLang();
    define("LANG", $arLang["LID"]);
}
$_482636585 = $arLang["LID"];
if (!defined("SITE_ID")) 
    define("SITE_ID", $arLang["LID"]); 
define("SITE_DIR", $arLang["DIR"]);
define("SITE_SERVER_NAME", $arLang["SERVER_NAME"]);
define("SITE_CHARSET", $arLang["CHARSET"]);
define("FORMAT_DATE", $arLang["FORMAT_DATE"]);
define("FORMAT_DATETIME", $arLang["FORMAT_DATETIME"]);
define("LANG_DIR", $arLang["DIR"]);
define("LANG_CHARSET", $arLang["CHARSET"]);
define("LANG_ADMIN_LID", $arLang["LANGUAGE_ID"]);
define("LANGUAGE_ID", $arLang["LANGUAGE_ID"]);
$context = $instance->getContext();
$context->setLanguage(LANGUAGE_ID);
$context->setCulture(new \Bitrix\Main\Context\Culture($arLang));
$request = $context->getRequest();
if (!$request->isAdminSection()) {
    $context->setSite(SITE_ID);
}
$instance->start();
$GLOBALS["APPLICATION"]->reinitPath();
if (!defined("POST_FORM_ACTION_URI")) {
    define("POST_FORM_ACTION_URI", htmlspecialcharsbx(GetRequestUri()));
}
$GLOBALS["MESS"] = array();
$GLOBALS["ALL_LANG_FILES"] = array();
IncludeModuleLangFile($_SERVER["DOCUMENT_ROOT"].BX_ROOT."/modules/main/tools.php");
IncludeModuleLangFile($_SERVER["DOCUMENT_ROOT"].BX_ROOT."/modules/main/classes/general/database.php");
IncludeModuleLangFile($_SERVER["DOCUMENT_ROOT"].BX_ROOT."/modules/main/classes/general/main.php");
IncludeModuleLangFile(__FILE__);
error_reporting(COption::GetOptionInt("main", "error_reporting", E_COMPILE_ERROR | E_ERROR | E_CORE_ERROR | E_PARSE) & ~E_STRICT & ~E_DEPRECATED);
if (!defined("BX_COMP_MANAGED_CACHE") && COption::GetOptionString("main", "component_managed_cache_on", "Y") <> "N") {
    define("BX_COMP_MANAGED_CACHE", true);
}
require_once($_SERVER["DOCUMENT_ROOT"].BX_ROOT."/modules/main/filter_tools.php");
require_once($_SERVER["DOCUMENT_ROOT"].BX_ROOT."/modules/main/ajax_tools.php");
define("INTRANET_EDITION", "Y");
class CBXFeatures {
    private static $_1043037136 = 30;
    private static $_1590593606 = array(
        "Portal" => array("CompanyCalendar", 
            "CompanyPhoto", 
            "CompanyVideo",
            "CompanyCareer",
            "StaffChanges",
            "StaffAbsence",
            "CommonDocuments",
            "MeetingRoomBookingSystem",
            "Wiki",
            "Learning",
            "Vote",
            "WebLink",
            "Subscribe",
            "Friends",
            "PersonalFiles",
            "PersonalBlog",
            "PersonalPhoto",
            "PersonalForum",
            "Blog",
            "Forum",
            "Gallery",
            "Board",
            "MicroBlog",
            "WebMessenger",
        ), 
        "Communications" => array("Tasks",
            "Calendar",
            "Workgroups",
            "Jabber",
            "VideoConference",
            "Extranet",
            "SMTP",
            "Requests",
            "DAV",
            "intranet_sharepoint",
            "timeman",
            "Idea",
            "Meeting",
            "EventList",
            "Salary",
            "XDImport",
        ),
        "Enterprise" => array("BizProc",
            "Lists",
            "Support",
            "Analytics",
            "crm",
            "Controller",
        ), 
        "Holding" => array(
            "Cluster",
            "MultiSites",
        ),
    );
    private static $_133698707 = false;
    private static $_106113606 = false;
    private static function __1381466640() {
        if (self::$_133698707 == false) {
            self::$_133698707 = array();
            foreach(self::$_1590593606 as $_1336154661 => $_545251959) {
                foreach($_545251959 as $_252575629)
                    self::$_133698707[$_252575629] = $_1336154661;
            }
        }
        if (self::$_106113606 == false) {
            self::$_106113606 = array();
            $_1061694745 = COption::GetOptionString("main", "~cpf_map_value", "");
            if (strlen($_1061694745) > 0) {
                $_1061694745 = base64_decode($_1061694745);
                self::$_106113606 = unserialize($_1061694745);
                if (!is_array(self::$_106113606))
                    self::$_106113606 = array();
            }
            if (count(self::$_106113606) <= 0) 
                self::$_106113606 = array("e" => array(), "f" => array());
        }
    }
    public static function InitiateEditionsSettings($_419611900) {
        self::__1381466640();
        $_1320725044 = array();
        foreach(self::$_1590593606 as $_1336154661 => $_545251959) {
            $_842872935 = in_array($_1336154661, $_419611900);
            self::$_106113606["e"][$_1336154661] = ($_842872935 ? array("F") : array("X"));
            foreach($_545251959 as $_252575629) {
                self::$_106113606["f"][$_252575629] = $_842872935;
                if (!$_842872935) 
                    $_1320725044[] = array($_252575629, false);
            }
        }
        $_416897562 = serialize(self::$_106113606);
        $_416897562 = base64_encode($_416897562);
        COption::SetOptionString("main", "~cpf_map_value", $_416897562);
        foreach($_1320725044 as $_164782089)
            self::__1764067525($_164782089[0], $_164782089[1]);
    }
    public static function IsFeatureEnabled($_252575629) {
        if (strlen($_252575629) <= 0)
            return true;
        self::__1381466640();
        if (!array_key_exists($_252575629, self::$_133698707))
            return true;
        if (self::$_133698707[$_252575629] == "Portal")
            $_509214402 = array("F");
        elseif(array_key_exists(self::$_133698707[$_252575629], self::$_106113606["e"]))
            $_509214402 = self::$_106113606["e"][self::$_133698707[$_252575629]];
        else
            $_509214402 = array("X");
        if ($_509214402[0] != "F" && $_509214402[0] != "D") {
            return false;
        }
        elseif($_509214402[0] == "D") {
            if ($_509214402[1] < mktime(0, 0, 0, date("m"), date("d") - self::$_1043037136, date("Y"))) {
                if (!isset($_509214402[2]) || !$_509214402[2]) 
                    self::__1432439879(self::$_133698707[$_252575629]);
                return false;
            }
        }
        return !array_key_exists($_252575629, self::$_106113606["f"]) || self::$_106113606["f"][$_252575629];
    }
    public static function IsFeatureInstalled($_252575629) {
        if (strlen($_252575629) <= 0) return true;
        self::__1381466640();
        return (array_key_exists($_252575629, self::$_106113606["f"]) && self::$_106113606["f"][$_252575629]);
    }
    public static function IsFeatureEditable($_252575629) {
        if (strlen($_252575629) <= 0)
            return true;
        self::__1381466640();
        if (!array_key_exists($_252575629, self::$_133698707))
            return true;
        if (self::$_133698707[$_252575629] == "Portal") $_509214402 = array("F");
        elseif(array_key_exists(self::$_133698707[$_252575629], self::$_106113606["e"])) $_509214402 = self::$_106113606["e"][self::$_133698707[$_252575629]];
        else $_509214402 = array("X");
        if ($_509214402[0] != "F" && $_509214402[0] != "D") {
            return false;
        }
        elseif($_509214402[0] == "D") {
            if ($_509214402[1] < mktime(0, 0, 0, date("m"), date("d") - self::$_1043037136, date("Y"))) {
                if (!isset($_509214402[2]) || !$_509214402[2])
                    self::__1432439879(self::$_133698707[$_252575629]);
                return false;
            }
        }
        return true;
    }
    private static function __1764067525($_252575629, $_1334287812) {
        if (method_exists("CBXFeatures", "On".$_252575629.
                "SettingsChange"))
            call_user_func_array(array("CBXFeatures", "On".$_252575629. "SettingsChange"), array($_252575629, $_1334287812));
        $_1343841395 = GetModuleEvents("main", "On".$_252575629."SettingsChange");
        while ($_796304211 = $_1343841395->Fetch())
            ExecuteModuleEventEx($_796304211, array($_252575629, $_1334287812));
    }
    public static function SetFeatureEnabled($_252575629, $_1334287812 = true, $_1137232089 = true) {
        if (strlen($_252575629) <= 0)
            return;
        if (!self::IsFeatureEditable($_252575629))
            $_1334287812 = false;
        $_1334287812 = ($_1334287812 ? true : false);
        self::__1381466640();
        $_166973516 = (!array_key_exists($_252575629, self::$_106113606["f"]) && $_1334287812 || array_key_exists($_252575629, self::$_106113606["f"]) && $_1334287812 != self::$_106113606["f"][$_252575629]);
        self::$_106113606["f"][$_252575629] = $_1334287812;
        $_416897562 = serialize(self::$_106113606);
        $_416897562 = base64_encode($_416897562);
        COption::SetOptionString("main", "~cpf_map_value", $_416897562);
        if ($_166973516 && $_1137232089)
            self::__1764067525($_252575629, $_1334287812);
    }
    private static function __1432439879($_1336154661) {
        if (strlen($_1336154661) <= 0 || $_1336154661 == "Portal")
            return;
        self::__1381466640();
        if (!array_key_exists($_1336154661, self::$_106113606["e"]) || array_key_exists($_1336154661, self::$_106113606["e"]) && self::$_106113606["e"][$_1336154661][0] != "D")
            return;
        if (isset(self::$_106113606["e"][$_1336154661][2]) && self::$_106113606["e"][$_1336154661][2])
            return;
        $_1320725044 = array();
        if (array_key_exists($_1336154661, self::$_1590593606) && is_array(self::$_1590593606[$_1336154661])) {
            foreach(self::$_1590593606[$_1336154661] as $_252575629) {
                if (array_key_exists($_252575629, self::$_106113606["f"]) && self::$_106113606["f"][$_252575629]) {
                    self::$_106113606["f"][$_252575629] = false;
                    $_1320725044[] = array($_252575629, false);
                }
            }
            self::$_106113606["e"][$_1336154661][2] = true;
        }
        $_416897562 = serialize(self::$_106113606);
        $_416897562 = base64_encode($_416897562);
        COption::SetOptionString("main", "~cpf_map_value", $_416897562);
        foreach($_1320725044 as $_164782089) self::__1764067525($_164782089[0], $_164782089[1]);
    }
    public static function ModifyFeaturesSettings($_419611900, $_545251959) {
        self::__1381466640();
        foreach($_419611900 as $_1336154661 => $_1903910598)
            self::$_106113606["e"][$_1336154661] = $_1903910598;
        $_1320725044 = array();
        foreach($_545251959 as $_252575629 => $_1334287812) {
            if (!array_key_exists($_252575629, self::$_106113606["f"]) && $_1334287812 || array_key_exists($_252575629, self::$_106113606["f"]) && $_1334287812 != self::$_106113606["f"][$_252575629])
                $_1320725044[] = array($_252575629, $_1334287812);
            self::$_106113606["f"][$_252575629] = $_1334287812;
        }
        $_416897562 = serialize(self::$_106113606);
        $_416897562 = base64_encode($_416897562);
        COption::SetOptionString("main", "~cpf_map_value", $_416897562);
        self::$_106113606 = false;
        foreach($_1320725044 as $_164782089)
            self::__1764067525($_164782089[0], $_164782089[1]);
    }
    public static function SaveFeaturesSettings($_974564902, $_1932622630) {
        self::__1381466640();
        $_1241254477 = array("e" => array(), "f" => array());
        if (!is_array($_974564902))
            $_974564902 = array();
        if (!is_array($_1932622630))
            $_1932622630 = array();
        if (!in_array("Portal", $_974564902))
            $_974564902[] = "Portal";
        foreach(self::$_1590593606 as $_1336154661 => $_545251959) {
            if (array_key_exists($_1336154661, self::$_106113606["e"]))
                $_1291783738 = self::$_106113606["e"][$_1336154661];
            else
                $_1291783738 = ($_1336154661 == "Portal") ? array("F") : array("X");
            if ($_1291783738[0] == "F" || $_1291783738[0] == "D") {
                $_1241254477["e"][$_1336154661] = $_1291783738;
            } else {
                if (in_array($_1336154661, $_974564902))
                    $_1241254477["e"][$_1336154661] = array("D", mktime(0, 0, 0, date("m"), date("d"), date("Y")));
                else $_1241254477["e"][$_1336154661] = array("X");
            }
        }
        $_1320725044 = array();
        foreach(self::$_133698707 as $_252575629 => $_1336154661) {
            if ($_1241254477["e"][$_1336154661][0] != "F" && $_1241254477["e"][$_1336154661][0] != "D") {
                $_1241254477["f"][$_252575629] = false;
            } else {
                if ($_1241254477["e"][$_1336154661][0] == "D" && $_1241254477["e"][$_1336154661][1] < mktime(0, 0, 0, date("m"), date("d") - self::$_1043037136, date("Y")))
                    $_1241254477["f"][$_252575629] = false;
                else
                    $_1241254477["f"][$_252575629] = in_array($_252575629, $_1932622630);
                if (!array_key_exists($_252575629, self::$_106113606["f"]) && $_1241254477["f"][$_252575629] || array_key_exists($_252575629, self::$_106113606["f"]) && $_1241254477["f"][$_252575629] != self::$_106113606["f"][$_252575629])
                    $_1320725044[] = array($_252575629, $_1241254477["f"][$_252575629]);
            }
        }
        $_416897562 = serialize($_1241254477);
        $_416897562 = base64_encode($_416897562);
        COption::SetOptionString("main", "~cpf_map_value", $_416897562);
        self::$_106113606 = false;
        foreach($_1320725044 as $_164782089)
            self::__1764067525($_164782089[0], $_164782089[1]);
    }
    public static function GetFeaturesList() {
        self::__1381466640();
        $_412839545 = array();
        foreach(self::$_1590593606 as $_1336154661 => $_545251959) {
            if (array_key_exists($_1336154661, self::$_106113606["e"]))
                $_1291783738 = self::$_106113606["e"][$_1336154661];
            else
                $_1291783738 = ($_1336154661 == "Portal") ? array("F") : array("X");
            $_412839545[$_1336154661] = array("TYPE" => $_1291783738[0],
                "DATE" => $_1291783738[1],
                "FEATURES" => array(),
            );
            $_412839545[$_1336154661]["EXPIRED"] = false;
            if ($_412839545[$_1336154661]["TYPE"] == "D") {
                $_412839545[$_1336154661]["TRY_DAYS_COUNT"] = intval((time() - $_412839545[$_1336154661]["DATE"])/86400);
                if ($_412839545[$_1336154661]["TRY_DAYS_COUNT"] > self::$_1043037136)
                    $_412839545[$_1336154661]["EXPIRED"] = true;
            }
            foreach($_545251959 as $_252575629)
                $_412839545[$_1336154661]["FEATURES"][$_252575629] = (!array_key_exists($_252575629, self::$_106113606["f"]) || self::$_106113606["f"][$_252575629]);
        }
        return $_412839545;
    }
    private static function __169355962($_552810271, $_259786597) {
        if (IsModuleInstalled($_552810271) == $_259786597) return true;
        $_1093233191 = $_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/".$_552810271."/install/index.php";
        if (!file_exists($_1093233191)) return false;
        include_once($_1093233191);
        $_1067741049 = str_replace(".", "_", $_552810271);
        if (!class_exists($_1067741049)) return false;
        $_394211983 = new $_1067741049;
        if ($_259786597) {
            if (!$_394211983->InstallDB()) return false;
            $_394211983->InstallEvents();
            if (!$_394211983->InstallFiles()) return false;
        } else {
            if (CModule::IncludeModule("search"))
                CSearch::DeleteIndex($_552810271);
            UnRegisterModule($_552810271);
        }
        return true;
    }
    protected static function OnRequestsSettingsChange($_252575629, $_1334287812) {
        self::__169355962("form", $_1334287812);
    }
    protected static function OnLearningSettingsChange($_252575629, $_1334287812) {
        self::__169355962("learning", $_1334287812);
    }
    protected static function OnJabberSettingsChange($_252575629, $_1334287812) {
        self::__169355962("xmpp", $_1334287812);
    }
    protected static function OnVideoConferenceSettingsChange($_252575629, $_1334287812) {
        self::__169355962("video", $_1334287812);
    }
    protected static function OnBizProcSettingsChange($_252575629, $_1334287812) {
        self::__169355962("bizprocdesigner", $_1334287812);
    }
    protected static function OnListsSettingsChange($_252575629, $_1334287812) {
        self::__169355962("lists", $_1334287812);
    }
    protected static function OnWikiSettingsChange($_252575629, $_1334287812) {
        self::__169355962("wiki", $_1334287812);
    }
    protected static function OnSupportSettingsChange($_252575629, $_1334287812) {
        self::__169355962("support", $_1334287812);
    }
    protected static function OnControllerSettingsChange($_252575629, $_1334287812) {
        self::__169355962("controller", $_1334287812);
    }
    protected static function OnAnalyticsSettingsChange($_252575629, $_1334287812) {
        self::__169355962("statistic", $_1334287812);
    }
    protected static function OnVoteSettingsChange($_252575629, $_1334287812) {
        self::__169355962("vote", $_1334287812);
    }
    protected static function OnFriendsSettingsChange($_252575629, $_1334287812) {
        if ($_1334287812) $_825079753 = "Y";
        else $_825079753 = "N";
        $_1227498242 = CSite::GetList(($_842872935 = ""), ($_1154089942 = ""), array("ACTIVE" => "Y"));
        while ($_1124864495 = $_1227498242->Fetch()) {
            if (COption::GetOptionString("socialnetwork", "allow_frields", "Y", $_1124864495["ID"]) != $_825079753) {
                COption::SetOptionString("socialnetwork", "allow_frields", $_825079753, false, $_1124864495["ID"]);
                COption::SetOptionString("socialnetwork", "allow_frields", $_825079753);
            }
        }
    }
    protected static function OnMicroBlogSettingsChange($_252575629, $_1334287812) {
        if ($_1334287812) $_825079753 = "Y";
        else $_825079753 = "N";
        $_1227498242 = CSite::GetList(($_842872935 = ""), ($_1154089942 = ""), array("ACTIVE" => "Y"));
        while ($_1124864495 = $_1227498242->Fetch()) {
            if (COption::GetOptionString("socialnetwork", "allow_microblog_user", "Y", $_1124864495["ID"]) != $_825079753) {
                COption::SetOptionString("socialnetwork", "allow_microblog_user", $_825079753, false, $_1124864495["ID"]);
                COption::SetOptionString("socialnetwork", "allow_microblog_user", $_825079753);
            }
            if (COption::GetOptionString("socialnetwork", "allow_microblog_group", "Y", $_1124864495["ID"]) != $_825079753) {
                COption::SetOptionString("socialnetwork", "allow_microblog_group", $_825079753, false, $_1124864495["ID"]);
                COption::SetOptionString("socialnetwork", "allow_microblog_group", $_825079753);
            }
        }
    }
    protected static function OnPersonalFilesSettingsChange($_252575629, $_1334287812) {
        if ($_1334287812) $_825079753 = "Y";
        else $_825079753 = "N";
        $_1227498242 = CSite::GetList(($_842872935 = ""), ($_1154089942 = ""), array("ACTIVE" => "Y"));
        while ($_1124864495 = $_1227498242->Fetch()) {
            if (COption::GetOptionString("socialnetwork", "allow_files_user", "Y", $_1124864495["ID"]) != $_825079753) {
                COption::SetOptionString("socialnetwork", "allow_files_user", $_825079753, false, $_1124864495["ID"]);
                COption::SetOptionString("socialnetwork", "allow_files_user", $_825079753);
            }
        }
    }
    protected static function OnPersonalBlogSettingsChange($_252575629, $_1334287812) {
        if ($_1334287812) $_825079753 = "Y";
        else $_825079753 = "N";
        $_1227498242 = CSite::GetList(($_842872935 = ""), ($_1154089942 = ""), array("ACTIVE" => "Y"));
        while ($_1124864495 = $_1227498242->Fetch()) {
            if (COption::GetOptionString("socialnetwork", "allow_blog_user", "Y", $_1124864495["ID"]) != $_825079753) {
                COption::SetOptionString("socialnetwork", "allow_blog_user", $_825079753, false, $_1124864495["ID"]);
                COption::SetOptionString("socialnetwork", "allow_blog_user", $_825079753);
            }
        }
    }
    protected static function OnPersonalPhotoSettingsChange($_252575629, $_1334287812) {
        if ($_1334287812) $_825079753 = "Y";
        else $_825079753 = "N";
        $_1227498242 = CSite::GetList(($_842872935 = ""), ($_1154089942 = ""), array("ACTIVE" => "Y"));
        while ($_1124864495 = $_1227498242->Fetch()) {
            if (COption::GetOptionString("socialnetwork", "allow_photo_user", "Y", $_1124864495["ID"]) != $_825079753) {
                COption::SetOptionString("socialnetwork", "allow_photo_user", $_825079753, false, $_1124864495["ID"]);
                COption::SetOptionString("socialnetwork", "allow_photo_user", $_825079753);
            }
        }
    }
    protected static function OnPersonalForumSettingsChange($_252575629, $_1334287812) {
        if ($_1334287812) $_825079753 = "Y";
        else $_825079753 = "N";
        $_1227498242 = CSite::GetList(($_842872935 = ""), ($_1154089942 = ""), array("ACTIVE" => "Y"));
        while ($_1124864495 = $_1227498242->Fetch()) {
            if (COption::GetOptionString("socialnetwork", "allow_forum_user", "Y", $_1124864495["ID"]) != $_825079753) {
                COption::SetOptionString("socialnetwork", "allow_forum_user", $_825079753, false, $_1124864495["ID"]);
                COption::SetOptionString("socialnetwork", "allow_forum_user", $_825079753);
            }
        }
    }
    protected static function OnTasksSettingsChange($_252575629, $_1334287812) {
        if ($_1334287812) $_825079753 = "Y";
        else $_825079753 = "N";
        $_1227498242 = CSite::GetList(($_842872935 = ""), ($_1154089942 = ""), array("ACTIVE" => "Y"));
        while ($_1124864495 = $_1227498242->Fetch()) {
            if (COption::GetOptionString("socialnetwork", "allow_tasks_user", "Y", $_1124864495["ID"]) != $_825079753) {
                COption::SetOptionString("socialnetwork", "allow_tasks_user", $_825079753, false, $_1124864495["ID"]);
                COption::SetOptionString("socialnetwork", "allow_tasks_user", $_825079753);
            }
            if (COption::GetOptionString("socialnetwork", "allow_tasks_group", "Y", $_1124864495["ID"]) != $_825079753) {
                COption::SetOptionString("socialnetwork", "allow_tasks_group", $_825079753, false, $_1124864495["ID"]);
                COption::SetOptionString("socialnetwork", "allow_tasks_group", $_825079753);
            }
        }
        self::__169355962("tasks", $_1334287812);
    }
    protected static function OnCalendarSettingsChange($_252575629, $_1334287812) {
        if ($_1334287812) $_825079753 = "Y";
        else $_825079753 = "N";
        $_1227498242 = CSite::GetList(($_842872935 = ""), ($_1154089942 = ""), array("ACTIVE" => "Y"));
        while ($_1124864495 = $_1227498242->Fetch()) {
            if (COption::GetOptionString("socialnetwork", "allow_calendar_user", "Y", $_1124864495["ID"]) != $_825079753) {
                COption::SetOptionString("socialnetwork", "allow_calendar_user", $_825079753, false, $_1124864495["ID"]);
                COption::SetOptionString("socialnetwork", "allow_calendar_user", $_825079753);
            }
            if (COption::GetOptionString("socialnetwork", "allow_calendar_group", "Y", $_1124864495["ID"]) != $_825079753) {
                COption::SetOptionString("socialnetwork", "allow_calendar_group", $_825079753, false, $_1124864495["ID"]);
                COption::SetOptionString("socialnetwork", "allow_calendar_group", $_825079753);
            }
        }
    }
    protected static function OnSMTPSettingsChange($_252575629, $_1334287812) {
        self::__169355962("mail", $_1334287812);
    }
    protected static function OnExtranetSettingsChange($_252575629, $_1334287812) {
        $_1226071562 = COption::GetOptionString("extranet", "extranet_site", "");
        if ($_1226071562) {
            $_1063930866 = new CSite;
            $_1063930866->Update($_1226071562, array("ACTIVE" => ($_1334287812 ? "Y" : "N")));
        }
        self::__169355962("extranet", $_1334287812);
    }
    protected static function OnDAVSettingsChange($_252575629, $_1334287812) {
        self::__169355962("dav", $_1334287812);
    }
    protected static function OntimemanSettingsChange($_252575629, $_1334287812) {
        self::__169355962("timeman", $_1334287812);
    }
    protected static function Onintranet_sharepointSettingsChange($_252575629, $_1334287812) {
        if ($_1334287812) {
            RegisterModuleDependences("iblock", "OnAfterIBlockElementAdd", "intranet", "CIntranetEventHandlers", "SPRegisterUpdatedItem");
            RegisterModuleDependences("iblock", "OnAfterIBlockElementUpdate", "intranet", "CIntranetEventHandlers", "SPRegisterUpdatedItem");
            CAgent::AddAgent("CIntranetSharepoint::AgentLists();", "intranet", "N", 500);
            CAgent::AddAgent("CIntranetSharepoint::AgentQueue();", "intranet", "N", 300);
            CAgent::AddAgent("CIntranetSharepoint::AgentUpdate();", "intranet", "N", 3600);
        } else {
            UnRegisterModuleDependences("iblock", "OnAfterIBlockElementAdd", "intranet", "CIntranetEventHandlers", "SPRegisterUpdatedItem");
            UnRegisterModuleDependences("iblock", "OnAfterIBlockElementUpdate", "intranet", "CIntranetEventHandlers", "SPRegisterUpdatedItem");
            CAgent::RemoveAgent("CIntranetSharepoint::AgentLists();", "intranet");
            CAgent::RemoveAgent("CIntranetSharepoint::AgentQueue();", "intranet");
            CAgent::RemoveAgent("CIntranetSharepoint::AgentUpdate();", "intranet");
        }
    }
    protected static function OncrmSettingsChange($_252575629, $_1334287812) {
        if ($_1334287812) COption::SetOptionString("crm", "form_features", "Y");
        self::__169355962("crm", $_1334287812);
    }
    protected static function OnClusterSettingsChange($_252575629, $_1334287812) {
        self::__169355962("cluster", $_1334287812);
    }
    protected static function OnMultiSitesSettingsChange($_252575629, $_1334287812) {
        if ($_1334287812) RegisterModuleDependences("main", "OnBeforeProlog", "main", "CWizardSolPanelIntranet", "ShowPanel", 100, "/modules/intranet/panel_button.php");
        else UnRegisterModuleDependences("main", "OnBeforeProlog", "main", "CWizardSolPanelIntranet", "ShowPanel", "/modules/intranet/panel_button.php");
    }
    protected static function OnIdeaSettingsChange($_252575629, $_1334287812) {
        self::__169355962("idea", $_1334287812);
    }
    protected static function OnMeetingSettingsChange($_252575629, $_1334287812) {
        self::__169355962("meeting", $_1334287812);
    }
    protected static function OnXDImportSettingsChange($_252575629, $_1334287812) {
        self::__169355962("xdimport", $_1334287812);
    }
}
$_msg_expire = GetMessage("expire_mess2");
$days_after_trial = 14;
define("DEMO", "Y");
$_end_time = 1;
unset($_admin_pwd_h);
$_site_expire_date = sprintf( "%010s", "EEXPIR");
$_admin_pwd_h = COption::GetOptionString("main", "admin_passwordh");


while ($_admin_pwd_h) {
    $_1505049562 = "H4u67fhw87Vhytos";
    $_396573762 = base64_decode($_admin_pwd_h);
    $_1197332044 = "";
    $_1505049562 = substr("thR".$_1505049562, 0, -5)."7Hyr12Hwy0rFr";
    $_1208740567 = strlen($_1505049562);
    $_pos = 0;
    for ($_i = 0; $_i < strlen($_396573762); $_i++) {
        $_1197332044 .= chr(ord($_396573762[$_i]) ^ ord($_1505049562[$_pos]));
        if ($_pos == $_1208740567 - 1) $_pos = 0;
        else $_pos = $_pos + 1;
    }
    $_end_time = mktime(0, 0, 0, intval($_1197332044[6].$_1197332044[3]), intval($_1197332044[1].$_1197332044[14]), intval($_1197332044[10].$_1197332044[18].$_1197332044[7].$_1197332044[12]));
    unset($_1505049562);
    break;
}

$_str_biz = "T_STEAL";
$url_update = "http://bitrixsoft.com/bitrix/bs.php";
$_old_site_expire_date = "OLDSITEEXPIREDATE";

@include($_SERVER["DOCUMENT_ROOT"]."/"."bitrix/modules/main/admin/define.php");
$_expire_end_time = 2;
while (defined("TEMPORARY_CACHE")) {
    $_temporary_cache = base64_decode(constant("TEMPORARY_CACHE"));

    $_str_date_enc = "";
    //$_str_biz = strrev("ON_OD").sprintf( "%s%s", $_str_biz, "_OUR_BUS");
    $_str_biz = "DO_NOT_STEAL_OUR_BUS";
    $_str_biz_len = strlen($_str_biz);
    $_pos = 0;
    for ($_i = 0; $_i < strlen($_temporary_cache); $_i++) {
        $_str_date_enc .= chr(ord($_temporary_cache[$_i]) ^ ord($_str_biz[$_pos]));
        if ($_pos == $_str_biz_len - 1) $_pos = 0;
        else $_pos = $_pos + 1;
    }
    
    $_expire_end_time = mktime(0, 0, 0, intval($_str_date_enc[6].$_str_date_enc[16]), intval($_str_date_enc[9].$_str_date_enc[2]), intval($_str_date_enc[12].$_str_date_enc[7].$_str_date_enc[14].$_str_date_enc[3]));
    unset($_str_biz);
    break;
}


$_site_expire_date = "SITEEXPIEDATE";
while (!defined("DEMO")) {
    function __f($_1379103819) {
        return $_1379103819 + __f($_1379103819);
    }
    __f(1);
};
if (file_exists($_SERVER["DOCUMENT_ROOT"]."/bitrix/"."config.php")) {

    $bxProductConfig = array();
    include($_SERVER["DOCUMENT_ROOT"]."/bitrix/"."config.php");
    if (isset($bxProductConfig["saas"]["days_after_trial"])) {
        $_days_after_trial = intval($bxProductConfig["saas"]["days_after_trial"]);

        if ($_days_after_trial >= 0 && $_days_after_trial < 14)
            $days_after_trial = $_days_after_trial;
    }
    if ($bxProductConfig["saas"]["trial_stopped"] <>"")
        $_msg_expire = $bxProductConfig["saas"]["trial_stopped"];
}
/*
for ($_i = 0, $_569456661 = (time() < mktime(0, 0, 0, 5, 1, 2010) || $_end_time <= 10), $_424981453 = ($_end_time < mktime(0, 0, 0, date("m"), date("d") - $days_after_trial, date("Y"))); $_i < 10, $_569456661 || $_424981453 || $_end_time != $_expire_end_time; $_i++, WriteFinalMessage($_msg_expire));
*/
define($_old_site_expire_date, $_expire_end_time);
define("SITEEXPIREDATE", $_expire_end_time);
$GLOBALS["SiteExpireDate"] = OLDSITEEXPIREDATE;
$GLOBALS["arCustomTemplateEngines"] = array();
require_once($_SERVER["DOCUMENT_ROOT"].BX_ROOT."/modules/main/classes/general/urlrewriter.php");
\Bitrix\Main\Loader::registerAutoLoadClasses("main", 
    array("CSiteTemplate" => "classes/general/site_template.php",
        "CBitrixComponent" => "classes/general/component.php",
        "CComponentEngine" => "classes/general/component_engine.php",
        "CComponentAjax" => "classes/general/component_ajax.php",
        "CBitrixComponentTemplate" => "classes/general/component_template.php",
        "CComponentUtil" => "classes/general/component_util.php",
        "CControllerClient" => "classes/general/controller_member.php",
        "PHPParser" => "classes/general/php_parser.php",
        "CDiskQuota" => "classes/".$DBType."/quota.php",
        "CEventLog" => "classes/general/event_log.php",
        "CEventMain" => "classes/general/event_log.php",
        "CAdminFileDialog" => "classes/general/file_dialog.php",
        "WLL_User" => "classes/general/liveid.php",
        "WLL_ConsentToken" => "classes/general/liveid.php",
        "WindowsLiveLogin" => "classes/general/liveid.php",
        "CAllFile" => "classes/general/file.php",
        "CFile" => "classes/".$DBType."/file.php",
        "CTempFile" => "classes/general/file_temp.php",
        "CFavorites" => "classes/".$DBType."/favorites.php",
        "CUserOptions" => "classes/general/user_options.php",
        "CGridOptions" => "classes/general/grids.php",
        "CUndo" => "/classes/general/undo.php",
        "CAutoSave" => "/classes/general/undo.php",
        "CRatings" => "classes/".$DBType."/ratings.php",
        "CRatingsComponentsMain" => "classes/".$DBType."/ratings_components.php",
        "CRatingRule" => "classes/general/rating_rule.php",
        "CRatingRulesMain" => "classes/".$DBType."/rating_rules.php",
        "CTopPanel" => "public/top_panel.php",
        "CEditArea" => "public/edit_area.php",
        "CComponentPanel" => "public/edit_area.php",
        "CTextParser" => "classes/general/textparser.php",
        "CPHPCacheFiles" => "classes/general/cache_files.php",
        "CDataXML" => "classes/general/xml.php",
        "CXMLFileStream" => "classes/general/xml.php",
        "CRsaProvider" => "classes/general/rsasecurity.php",
        "CRsaSecurity" => "classes/general/rsasecurity.php",
        "CRsaBcmathProvider" => "classes/general/rsabcmath.php",
        "CRsaOpensslProvider" => "classes/general/rsaopenssl.php",
        "CASNReader" => "classes/general/asn.php",
        "CBXShortUri" => "classes/".$DBType."/short_uri.php",
        "CFinder" => "classes/general/finder.php",
        "CAccess" => "classes/general/access.php",
        "CAuthProvider" => "classes/general/authproviders.php",
        "IProviderInterface" => "classes/general/authproviders.php",
        "CGroupAuthProvider" => "classes/general/authproviders.php",
        "CUserAuthProvider" => "classes/general/authproviders.php",
        "CTableSchema" => "classes/general/table_schema.php",
        "CCSVData" => "classes/general/csv_data.php",
        "CSmile" => "classes/general/smile.php",
        "CSmileGallery" => "classes/general/smile.php",
        "CSmileSet" => "classes/general/smile.php",
        "CGlobalCounter" => "classes/general/global_counter.php",
        "CUserCounter" => "classes/".$DBType."/user_counter.php",
        "CUserCounterPage" => "classes/".$DBType."/user_counter.php",
        "CHotKeys" => "classes/general/hot_keys.php",
        "CHotKeysCode" => "classes/general/hot_keys.php",
        "CBXSanitizer" => "classes/general/sanitizer.php",
        "CBXArchive" => "classes/general/archive.php",
        "CAdminNotify" => "classes/general/admin_notify.php",
        "CBXFavAdmMenu" => "classes/general/favorites.php",
        "CAdminInformer" => "classes/general/admin_informer.php",
        "CSiteCheckerTest" => "classes/general/site_checker.php",
        "CSqlUtil" => "classes/general/sql_util.php",
        "CFileUploader" => "classes/general/uploader.php",
        "LPA" => "classes/general/lpa.php",
        "CAdminFilter" => "interface/admin_filter.php",
        "CAdminList" => "interface/admin_list.php",
        "CAdminUiList" => "interface/admin_ui_list.php",
        "CAdminUiResult" => "interface/admin_ui_list.php",
        "CAdminUiContextMenu" => "interface/admin_ui_list.php",
        "CAdminListRow" => "interface/admin_list.php",
        "CAdminTabControl" => "interface/admin_tabcontrol.php",
        "CAdminForm" => "interface/admin_form.php",
        "CAdminFormSettings" => "interface/admin_form.php",
        "CAdminTabControlDrag" => "interface/admin_tabcontrol_drag.php",
        "CAdminDraggableBlockEngine" => "interface/admin_tabcontrol_drag.php",
        "CJSPopup" => "interface/jspopup.php",
        "CJSPopupOnPage" => "interface/jspopup.php",
        "CAdminCalendar" => "interface/admin_calendar.php",
        "CAdminViewTabControl" => "interface/admin_viewtabcontrol.php",
        "CAdminTabEngine" => "interface/admin_tabengine.php",
        "CHTMLPagesCache" => "lib/composite/helper.php",
        "StaticHtmlMemcachedResponse" => "lib/composite/responder.php",
        "StaticHtmlFileResponse" => "lib/composite/responder.php",
        "Bitrix\Main\Page\Frame" => "lib/composite/engine.php",
        "Bitrix\Main\Page\FrameStatic" => "lib/composite/staticarea.php",
        "Bitrix\Main\Page\FrameBuffered" => "lib/composite/bufferarea.php",
        "Bitrix\Main\Page\FrameHelper" => "lib/composite/bufferarea.php",
        "Bitrix\Main\Data\StaticHtmlCache" => "lib/composite/page.php",
        "Bitrix\Main\Data\StaticHtmlStorage" => "lib/composite/data/abstractstorage.php",
        "Bitrix\Main\Data\StaticHtmlFileStorage" => "lib/composite/data/filestorage.php",
        "Bitrix\Main\Data\StaticHtmlMemcachedStorage" => "lib/composite/data/memcachedstorage.php",
        "Bitrix\Main\Data\StaticCacheProvider" => "lib/composite/data/cacheprovider.php",
        "Bitrix\Main\Data\AppCacheManifest" => "lib/composite/appcache.php",
    )
);
require_once($_SERVER["DOCUMENT_ROOT"].BX_ROOT."/modules/main/classes/".$DBType."/agent.php");
require_once($_SERVER["DOCUMENT_ROOT"].BX_ROOT."/modules/main/classes/".$DBType."/user.php");
require_once($_SERVER["DOCUMENT_ROOT"].BX_ROOT."/modules/main/classes/".$DBType."/event.php");
require_once($_SERVER["DOCUMENT_ROOT"].BX_ROOT."/modules/main/classes/general/menu.php");
AddEventHandler("main", "OnAfterEpilog", array("\Bitrix\Main\Data\ManagedCache", "finalize"));
require_once($_SERVER["DOCUMENT_ROOT"].BX_ROOT."/modules/main/classes/".$DBType."/usertype.php");
if (file_exists(($_update_db_updater = $_SERVER["DOCUMENT_ROOT"].BX_ROOT."/modules/main/classes/general/update_db_updater.php"))) {
    $US_HOST_PROCESS_MAIN = False;
    include($_update_db_updater);
}
if (file_exists(($_update_db_updater = $_SERVER["DOCUMENT_ROOT"]."/bitrix/init.php")))
    include_once($_update_db_updater);
if (($_update_db_updater = getLocalPath("php_interface/init.php", BX_PERSONAL_ROOT)) !== false)
    include_once($_SERVER["DOCUMENT_ROOT"].$_update_db_updater);
if (($_update_db_updater = getLocalPath("php_interface/".SITE_ID."/init.php", BX_PERSONAL_ROOT)) !== false)
    include_once($_SERVER["DOCUMENT_ROOT"].$_update_db_updater);
if (!defined("BX_FILE_PERMISSIONS")) define("BX_FILE_PERMISSIONS", 420);
if (!defined("BX_DIR_PERMISSIONS")) define("BX_DIR_PERMISSIONS", 493);

$GLOBALS["sDocPath"] = $GLOBALS["APPLICATION"]->GetCurPage();
if ((!(defined("STATISTIC_ONLY") && STATISTIC_ONLY && substr($GLOBALS["APPLICATION"]->GetCurPage(), 0, strlen(BX_ROOT."/admin/")) != BX_ROOT."/admin/")) && COption::GetOptionString("main", "include_charset", "Y") == "Y" && strlen(LANG_CHARSET) > 0)
    header("Content-Type: text/html; charset=".LANG_CHARSET);

if (COption::GetOptionString("main", "set_p3p_header", "Y") == "Y")
    header('P3P: policyref="/bitrix/p3p.xml", CP = "NON DSP COR CUR ADM DEV PSA PSD OUR UNR BUS UNI COM NAV INT DEM STA"');
header("X-Powered-CMS: Bitrix Site Manager(".(LICENSE_KEY == "DEMO" ? "DEMO" : md5(BITRIX.LICENSE_KEY.LICENCE)).")");
if (COption::GetOptionString("main", "update_devsrv", "") == "Y") header("X-DevSrv-CMS: Bitrix");
define("BX_CRONTAB_SUPPORT", defined("BX_CRONTAB"));
if (COption::GetOptionString("main", "check_agents", "Y") == "Y") {
    define("START_EXEC_AGENTS_1", microtime());
    $GLOBALS["BX_STATE"] = "AG";
    $GLOBALS["DB"]->StartUsingMasterOnly();
    CAgent::CheckAgents();
    $GLOBALS["DB"]->StopUsingMasterOnly();
    define("START_EXEC_AGENTS_2", microtime());
    $GLOBALS["BX_STATE"] = "PB";
}
ini_set("session.cookie_httponly", 1);
if ($_1725823741 = $GLOBALS["APPLICATION"]->GetCookieDomain())
    ini_set("session.cookie_domain", $_1725823741);

if (COption::GetOptionString("security", "session", "N") === "Y" && 
    CModule::IncludeModule("security")){
    CSecuritySession::Init();
}



session_start();
foreach(GetModuleEvents("main", "OnPageStart", true) as $_796304211)
    ExecuteModuleEventEx($_796304211);
$GLOBALS["USER"] = new CUser;
$_196419014 = $GLOBALS["USER"]->GetSecurityPolicy();
$_463161576 = time();
if (($_SESSION["SESS_IP"] && strlen($_196419014["SESSION_IP_MASK"]) > 0 && ((ip2long($_196419014["SESSION_IP_MASK"]) & ip2long($_SESSION["SESS_IP"])) != (ip2long($_196419014["SESSION_IP_MASK"]) & ip2long($_SERVER["REMOTE_ADDR"])))) || ($_196419014["SESSION_TIMEOUT"] > 0 && $_SESSION["SESS_TIME"] > 0 && $_463161576 - $_196419014["SESSION_TIMEOUT"] * 60 > $_SESSION["SESS_TIME"]) || (isset($_SESSION["BX_SESSION_TERMINATE_TIME"]) && $_SESSION["BX_SESSION_TERMINATE_TIME"] > 0 && $_463161576 > $_SESSION["BX_SESSION_TERMINATE_TIME"]) || (isset($_SESSION["BX_SESSION_SIGN"]) && $_SESSION["BX_SESSION_SIGN"] <> bitrix_sess_sign()) || (isSessionExpired())) {
    $_SESSION = array();
    @session_destroy();
    if (COption::GetOptionString("security", "session", "N") === "Y" && CModule::IncludeModule("security")) CSecuritySession::Init();
    session_id(md5(uniqid(rand(), true)));
    session_start();
    $GLOBALS["USER"] = new CUser;
}
$_SESSION["SESS_IP"] = $_SERVER["REMOTE_ADDR"];
$_SESSION["SESS_TIME"] = time();
if (!isset($_SESSION["BX_SESSION_SIGN"]))
    $_SESSION["BX_SESSION_SIGN"] = bitrix_sess_sign();
if ((COption::GetOptionString("main", "use_session_id_ttl", "N") == "Y") && (COption::GetOptionInt("main", "session_id_ttl", 0) > 0) && !defined("BX_SESSION_ID_CHANGE")) {
    if (!array_key_exists("SESS_ID_TIME", $_SESSION)) {
        $_SESSION["SESS_ID_TIME"] = $_SESSION["SESS_TIME"];
    } else if(($_SESSION["SESS_ID_TIME"] + COption::GetOptionInt("main", "session_id_ttl")) < $_SESSION["SESS_TIME"]) {
        if (COption::GetOptionString("security", "session", "N") === "Y" && CModule::IncludeModule("security")) {
            CSecuritySession::UpdateSessID();
        } else {
            session_regenerate_id();
        }
        $_SESSION["SESS_ID_TIME"] = $_SESSION["SESS_TIME"];
    }
}
define("BX_STARTED", true);
if (isset($_SESSION["BX_ADMIN_LOAD_AUTH"])) {
    define("ADMIN_SECTION_LOAD_AUTH", 1);
    unset($_SESSION["BX_ADMIN_LOAD_AUTH"]);
}
if (!defined("NOT_CHECK_PERMISSIONS") || NOT_CHECK_PERMISSIONS !== true) {
    $_506279819 = isset($_REQUEST["logout"]) && (strtolower($_REQUEST["logout"]) == yes);
    if ($_506279819 && $GLOBALS["USER"]->IsAuthorized()) {
        $GLOBALS["USER"]->Logout();
        LocalRedirect($GLOBALS["APPLICATION"]->GetCurPageParam("", array("logout")));
    }
    if (!$GLOBALS["USER"]->IsAuthorized()) {
        $GLOBALS["USER"]->LoginByCookies();
    }
    $_1107190681 = false;
    if (($_639097204 = $GLOBALS["USER"]->LoginByHttpAuth()) !== null) {
        $_1107190681 = $_639097204;
        $GLOBALS["APPLICATION"]->SetAuthResult($_1107190681);
    }
    if (isset($_REQUEST["AUTH_FORM"]) && $_REQUEST["AUTH_FORM"] <> "") {
        $_1463970877 = false;
        if (COption::GetOptionString("main", "use_encrypted_auth", "N") == "Y") {
            $_1428565930 = new CRsaSecurity();
            if (($_676583725 = $_1428565930->LoadKeys())) {
                $_1428565930->SetKeys($_676583725);
                $_957245708 = $_1428565930->AcceptFromForm(array("USER_PASSWORD", "USER_CONFIRM_PASSWORD"));
                if ($_957245708 == CRsaSecurity::ERROR_SESS_CHECK)
                    $_1107190681 = array("MESSAGE" => GetMessage("main_include_decode_pass_sess"), "TYPE" => "ERROR");
                else if($_957245708 < 0)
                    $_1107190681 = array("MESSAGE" => GetMessage("main_include_decode_pass_err", array("#ERRCODE#" => $_957245708)), "TYPE" => "ERROR");
                if ($_957245708 < 0) $_1463970877 = true;
            }
        }
        if ($_1463970877 == false) {
            if (!defined("ADMIN_SECTION") || ADMIN_SECTION !== true) $_725812785 = LANG;
            else $_725812785 = false;
            if ($_REQUEST["TYPE"] == "AUTH") {
                $_1107190681 = $GLOBALS["USER"]->Login($_REQUEST["USER_LOGIN"], $_REQUEST["USER_PASSWORD"], $_REQUEST["USER_REMEMBER"]);
            }
            elseif($_REQUEST["TYPE"] == "OTP") {
                $_1107190681 = $GLOBALS["USER"]->LoginByOtp($_REQUEST["USER_OTP"], $_REQUEST["OTP_REMEMBER"], $_REQUEST["captcha_word"], $_REQUEST["captcha_sid"]);
            }
            elseif($_REQUEST["TYPE"] == "SEND_PWD") {
                $_1107190681 = CUser::SendPassword($_REQUEST["USER_LOGIN"], $_REQUEST["USER_EMAIL"], $_725812785, $_REQUEST["captcha_word"], $_REQUEST["captcha_sid"]);
            }
            elseif($_SERVER["REQUEST_METHOD"] == "POST" && $_REQUEST["TYPE"] == "CHANGE_PWD") {
                $_1107190681 = $GLOBALS["USER"]->ChangePassword($_REQUEST["USER_LOGIN"], $_REQUEST["USER_CHECKWORD"], $_REQUEST["USER_PASSWORD"], $_REQUEST["USER_CONFIRM_PASSWORD"], $_725812785, $_REQUEST["captcha_word"], $_REQUEST["captcha_sid"]);
            }
            elseif(COption::GetOptionString("main", "new_user_registration", "N") == "Y" && $_SERVER["REQUEST_METHOD"] == "POST" && $_REQUEST["TYPE"] == "REGISTRATION" && (!defined("ADMIN_SECTION") || ADMIN_SECTION !== true)) {
                $_1107190681 = $GLOBALS["USER"]->Register($_REQUEST["USER_LOGIN"], $_REQUEST["USER_NAME"], $_REQUEST["USER_LAST_NAME"], $_REQUEST["USER_PASSWORD"], $_REQUEST["USER_CONFIRM_PASSWORD"], $_REQUEST["USER_EMAIL"], $_725812785, $_REQUEST["captcha_word"], $_REQUEST["captcha_sid"]);
            }
            if ($_REQUEST["TYPE"] == "AUTH" || $_REQUEST["TYPE"] == "OTP") {
                if ($_1107190681 === true && defined("ADMIN_SECTION") && ADMIN_SECTION === true) {
                    $GLOBALS["APPLICATION"]->StoreCookies();
                    $_SESSION["BX_ADMIN_LOAD_AUTH"] = true;
                    echo "<script type='text/javascript'> window.onload = function() {
                                            top.BX.AUTHAGENT.setAuthResult(false);
                                        }; </script>";
                    die();
                }
            }
        }
        $GLOBALS["APPLICATION"]->SetAuthResult($_1107190681);
    }
    elseif(!$GLOBALS["USER"]->IsAuthorized()) {
        $GLOBALS["USER"]->LoginHitByHash();
    }
}
$GLOBALS["USER"]->CheckAuthActions();
if (($_539947405 = $GLOBALS["USER"]->GetParam("APPLICATION_ID")) !== null) {
    $_23761435 = \Bitrix\Main\Authentication\ApplicationManager::getInstance();
    if ($_23761435->checkScope($_539947405) !== true) {
        $_1074981544 = new\Bitrix\Main\Event("main", "onApplicationScopeError", Array("APPLICATION_ID" => $_539947405));
        $_1074981544->send();
        CHTTP::SetStatus("403 Forbidden");
        die();
    }
}
if (!defined("ADMIN_SECTION") || ADMIN_SECTION !== true) {
    $_248086242 = "";
    if (is_string($_REQUEST["bitrix_preview_site_template"]) && $_REQUEST["bitrix_preview_site_template"] <> ""&& $GLOBALS["USER"]->CanDoOperation("view_other_settings")) {
        $_319081945 = new Bitrix\Main\Security\Sign\Signer();
        try {
            $_1072567021 = $_319081945->unsign($_REQUEST["bitrix_preview_site_template"], "template_preview".bitrix_sessid());
            $_1222077316 = CSiteTemplate::GetByID($_1072567021);
            if ($_2072535194 = $_1222077316->Fetch()) {
                $_248086242 = $_2072535194["ID"];
                if (isset($_GET["bx_template_preview_mode"]) && $_GET["bx_template_preview_mode"] == "Y" && $GLOBALS["USER"]->CanDoOperation("edit_other_settings")) {
                    define("SITE_TEMPLATE_PREVIEW_MODE", true);
                }
            }
        } catch (\Bitrix\Main\Security\Sign\BadSignatureException $_544998809) {}
    }
    if ($_248086242 == "") {
        $_248086242 = CSite::GetCurTemplate();
    }
    define("SITE_TEMPLATE_ID", $_248086242);
    define("SITE_TEMPLATE_PATH", getLocalPath("templates/".SITE_TEMPLATE_ID, BX_PERSONAL_ROOT));
}
if (isset($_GET["show_page_exec_time"])) {
    if ($_GET["show_page_exec_time"] == "Y" || $_GET["show_page_exec_time"] == "N") $_SESSION["SESS_SHOW_TIME_EXEC"] = $_GET["show_page_exec_time"];
}
if (isset($_GET["show_include_exec_time"])) {
    if ($_GET["show_include_exec_time"] == "Y" || $_GET["show_include_exec_time"] == "N") $_SESSION["SESS_SHOW_INCLUDE_TIME_EXEC"] = $_GET["show_include_exec_time"];
}
if (isset($_GET["bitrix_include_areas"]) && $_GET["bitrix_include_areas"] <> "") $GLOBALS["APPLICATION"]->SetShowIncludeAreas($_GET["bitrix_include_areas"] == "Y");
if ($GLOBALS["USER"]->IsAuthorized()) {
    $_199052949 = COption::GetOptionString("main", "cookie_name", BITRIX_SM);
    if (!isset($_COOKIE[$_199052949."_SOUND_LOGIN_PLAYED"])) $GLOBALS["APPLICATION"]->set_cookie("SOUND_LOGIN_PLAYED", "Y", 0);
}
\Bitrix\Main\Composite\Engine::shouldBeEnabled();
if (defined("BX_CHECK_SHORT_URI") && BX_CHECK_SHORT_URI && CBXShortUri::CheckUri()) {
    die();
}
foreach(GetModuleEvents("main", "OnBeforeProlog", true) as $_796304211)
    ExecuteModuleEventEx($_796304211);
if ((!defined("NOT_CHECK_PERMISSIONS") || NOT_CHECK_PERMISSIONS !== true) && (!defined("NOT_CHECK_FILE_PERMISSIONS") || NOT_CHECK_FILE_PERMISSIONS !== true)) {
    $_1996776951 = $request->getScriptFile();
    if (!$GLOBALS["USER"]->CanDoFileOperation("fm_view_file", array(SITE_ID, $_1996776951)) || (defined("NEED_AUTH") && NEED_AUTH && !$GLOBALS["USER"]->IsAuthorized())) {
        if ($GLOBALS["USER"]->IsAuthorized() && $_1107190681["MESSAGE"] == "")
            $_1107190681 = array("MESSAGE" => GetMessage("ACCESS_DENIED")."".GetMessage("ACCESS_DENIED_FILE", array("#FILE#" => $_1996776951)), "TYPE" => "ERROR");
        if (defined("ADMIN_SECTION") && ADMIN_SECTION == true) {
            if ($_REQUEST["mode"] == "list" || $_REQUEST["mode"] == "settings") {
                echo '<script> top.location = '.$GLOBALS["APPLICATION"]->GetCurPage()."?".DeleteParam(array("mode")).'; </script>';
                die();
            }
            elseif($_REQUEST["mode"] == "frame") {
                echo '<script type="text/javascript">
                        var w = (opener ? opener.window : parent.window);
                        w.location.href = '.$GLOBALS["APPLICATION"]->GetCurPage()."?".DeleteParam(array("mode")).';
                      </script>';
                die();
            }
            elseif(defined("MOBILE_APP_ADMIN") && MOBILE_APP_ADMIN == true) {
                echo json_encode(Array("status" => "failed"));
                die();
            }
        }
        $GLOBALS["APPLICATION"]->AuthForm($_1107190681);
    }
}
if (mt_rand(1, 20) == 7) {
    $_358629808 = $GLOBALS["DB"]->Query("SELECT VALUE FROM b_option WHERE NAME = '~PARAM_MAX_USERS'
            AND MODULE_ID = 'main'
            AND SITE_ID IS NULL", true);
    if ($_839221763 = $_358629808->Fetch()) {
        $_492130968 = $_839221763["VALUE"];
        list($_914457219, $_55699405) = explode(".", $_492130968);
        $_1787515856 = pack("H*", $_914457219);
        $_1299698399 = "bitrix".md5(constant(LICENSE_KEY));
        $_1755160751 = hash_hmac("sha256", $_55699405, $_1299698399, true);
        if (strcmp($_1755160751, $_1787515856) !== 0) {
            if (isset($GLOBALS["USER"]) && is_object($GLOBALS["USER"]) && call_user_func(array($GLOBALS["USER"], "IsAuthorized")) && !call_user_func(array($GLOBALS["USER"], "IsAdmin"))) {
                call_user_func(array($GLOBALS["APPLICATION"], "RestartBuffer"));
                call_user_func("LocalRedirect", "/licence_restriction.php", true);
            }
        }
    } else {
        call_user_func("\Bitrix\Main\Config\Option::set", "main", "PARAM_MAX_USERS", 12);
    }
}

while (!defined("OLDSITEEXPIREDATE") || strlen(OLDSITEEXPIREDATE) <= 0 || OLDSITEEXPIREDATE != SITEEXPIREDATE)
    die(GetMessage("expire_mess2"));
if (isset($_1881802773) && $_1881802773 == 404) {
    if (COption::GetOptionString("main", "header_200", "N") == "Y") CHTTP::SetStatus("200 OK");
} 
?>