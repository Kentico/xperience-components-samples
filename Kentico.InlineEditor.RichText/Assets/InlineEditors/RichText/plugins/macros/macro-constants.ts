export const MACROS_PLUGIN_NAME = "kenticoMacroPlugin";

export const INSERT_MACRO_COMMAND_NAME = "insertMacro";
export const REMOVE_MACRO_COMMAND_NAME = "removeMacro";
export const UPDATE_URL_MACRO_COMMAND_NAME = "updateUrlParameterMacro";
export const UPDATE_CONTEXT_MACRO_COMMAND_NAME = "updateContextMacro";
export const CONFIGURE_MACRO_COMMAND_NAME = "configureMacro";
export const OPEN_INSERT_MACRO_POPUP_COMMAND_NAME = "openInsertMacroPopup";
export const CLOSE_CONFIGURE_POPUP_COMMAND_NAME = "popupConfigureClose";
export const SWITCH_MACRO_TAB_COMMAND_NAME = "openMacroTab";
export const SWITCH_URL_TAB_COMMAND_NAME = "openQueryTab";

export const INSERT_URL_MACRO_COMMAND_NAME = "insertUrlMacro";
export const INSERT_CONTEXT_MACRO_COMMAND_NAME = "insertContextMacro";

export const MACRO_CLASS = "ktc-macro";
export const MACRO_ACTIVE_CLASS = `${MACRO_CLASS}-active`;


// Pop-ups

export const ACTIONS_POPUP_NAME = `${MACROS_PLUGIN_NAME}.popup`;

export const CONFIGURATION_POPUP_NAME = `${MACROS_PLUGIN_NAME}.popupConfigure`;
export const CONFIGURE_URL_MACRO_POPUP_NAME = `${MACROS_PLUGIN_NAME}.popupUrl`;
export const CONFIGURE_CONTEXT_MACRO_POPUP_NAME = `${MACROS_PLUGIN_NAME}.popupContext`;

// Icons

export const ICON_MACRO = "m 9.0917547,4.2362812 h -3.05486 a 1.9439999,1.9439999 0 0 0 -1.944,1.944 v 2.6900104 a 1.3885713,1.3885713 0 0 1 -0.40685,0.98207 l -1.57186,1.5697804 a 0.8331428,0.8331428 0 0 0 0,1.18028 l 1.57047,1.57048 a 1.3885713,1.3885713 0 0 1 0.40824,0.98172 v 2.68966 a 1.9439999,1.9439999 0 0 0 1.944,1.944 h 3.05486 a 0.55542853,0.55542853 0 0 0 0.55543,-0.55543 v -0.55543 a 0.55542853,0.55542853 0 0 0 -0.55543,-0.55543 h -3.05486 a 0.27771427,0.27771427 0 0 1 -0.27771,-0.27771 v -2.68966 a 3.0569398,3.0569398 0 0 0 -0.89494,-2.16062 l -0.98207,-0.98172 0.98207,-0.98172 a 3.0569398,3.0569398 0 0 0 0.89494,-2.1606204 V 6.1802812 a 0.27771427,0.27771427 0 0 1 0.27771,-0.27771 h 3.05486 a 0.55542853,0.55542853 0 0 0 0.55543,-0.55543 v -0.55543 a 0.55542853,0.55542853 0 0 0 -0.55543,-0.55543 z M 21.623605,11.422142 20.052785,9.8516616 a 1.3910013,1.3910013 0 0 1 -0.40789,-0.98172 V 6.1802812 a 1.9439999,1.9439999 0 0 0 -1.944,-1.944 h -3.05486 a 0.55542853,0.55542853 0 0 0 -0.55543,0.55543 v 0.55543 a 0.55542853,0.55542853 0 0 0 0.55543,0.55543 h 3.05486 a 0.27771427,0.27771427 0 0 1 0.27771,0.27771 v 2.6896604 a 3.0548569,3.0548569 0 0 0 0.89494,2.1606204 l 0.98172,0.98172 -0.98172,0.98172 a 3.0548569,3.0548569 0 0 0 -0.89494,2.16062 v 2.68966 a 0.27771427,0.27771427 0 0 1 -0.27771,0.27771 h -3.05486 a 0.55542853,0.55542853 0 0 0 -0.55543,0.55543 v 0.55543 a 0.55542853,0.55542853 0 0 0 0.55543,0.55543 h 3.05486 a 1.9439999,1.9439999 0 0 0 1.944,-1.944 v -2.69001 a 1.3885713,1.3885713 0 0 1 0.40685,-0.98207 l 1.57186,-1.56978 a 0.8331428,0.8331428 0 0 0 0,-1.18028 z";
export const ICON_URL_PARAM = "M16.456941 4.788366C14.346076 4.788366 12.619002 6.6581714 12.619002 8.943489C12.619002 8.943489 14.537971 8.943489 14.537971 8.943489C14.537971 7.8008302 15.401507 6.8659275 16.456941 6.8659275C17.512374 6.8659275 18.375911 7.8008302 18.375911 8.943489C18.375911 11.021051 15.497455 10.709418 15.497455 14.137394C15.497455 14.137394 15.497455 15.176174 15.497455 15.176174C15.497455 15.176174 17.416426 15.176174 17.416426 15.176174C17.416426 15.176174 17.416426 14.137394 17.416426 14.137394C17.416426 11.852075 20.294881 11.540442 20.294881 8.943489C20.294881 6.6581714 18.567807 4.788366 16.456941 4.788366C16.456941 4.788366 16.456941 4.788366 16.456941 4.788366M15.497455 17.253737C15.497455 17.253737 17.416426 17.253737 17.416426 17.253737C17.416426 17.253737 17.416426 19.331299 17.416426 19.331299C17.416426 19.331299 15.497455 19.331299 15.497455 19.331299C15.497455 19.331299 15.497455 17.253737 15.497455 17.253737M10.170443 4.7001474C10.170443 4.7001474 3.8418003 19.29756 3.8418003 19.29756C3.8418003 19.29756 5.8253586 19.28441 5.8253586 19.28441C5.8253586 19.28441 12.164521 4.7137829 12.164521 4.7137829";
