import { IActionPayload } from "../../actions";

// Sidebar

export const SET_SIDEBAR_SHADOW = 'THEME_OPTIONS/SET_SIDEBAR_SHADOW';
export const SET_SIDEBAR_TOGGLE_MOBILE = 'THEME_OPTIONS/SET_SIDEBAR_TOGGLE_MOBILE';
export const SET_SIDEBAR_FIXED = 'THEME_OPTIONS/SET_SIDEBAR_FIXED';
export const SET_SIDEBAR_FOOTER = 'THEME_OPTIONS/SET_SIDEBAR_FOOTER';
export const SET_SIDEBAR_TOGGLE = 'THEME_OPTIONS/SET_SIDEBAR_TOGGLE';
export const SET_SIDEBAR_USERBOX = 'THEME_OPTIONS/SET_SIDEBAR_USERBOX';
export const SET_SIDEBAR_HOVER = 'THEME_OPTIONS/SET_SIDEBAR_HOVER';

export const setSidebarShadow = (sidebarShadow: boolean)
: IActionPayload => ({
  type: SET_SIDEBAR_SHADOW,
  payload: { sidebarShadow }
});
export const setSidebarFixed = (sidebarFixed: boolean)
: IActionPayload => ({
  type: SET_SIDEBAR_FIXED,
  payload: { sidebarFixed }
});
export const setSidebarToggleMobile = (sidebarToggleMobile: boolean)
: IActionPayload => ({
  type: SET_SIDEBAR_TOGGLE_MOBILE,
  payload: { sidebarToggleMobile }
});
export const setSidebarFooter = (sidebarFooter: boolean)
: IActionPayload => ({
  type: SET_SIDEBAR_FOOTER,
  payload: { sidebarFooter }
});
export const setSidebarToggle = (sidebarToggle: boolean)
: IActionPayload => ({
  type: SET_SIDEBAR_TOGGLE,
  payload: { sidebarToggle }
});
export const setSidebarHover = (sidebarHover: boolean)
: IActionPayload => ({
  type: SET_SIDEBAR_HOVER,
  payload: { sidebarHover }
});
export const setSidebarUserbox = (sidebarUserbox: boolean)
: IActionPayload => ({
  type: SET_SIDEBAR_USERBOX,
  payload: { sidebarUserbox }
});
// Header

export const SET_HEADER_FIXED = 'THEME_OPTIONS/SET_HEADER_FIXED';
export const SET_HEADER_SHADOW = 'THEME_OPTIONS/SET_HEADER_SHADOW';
export const SET_HEADER_SEARCH_HOVER = 'THEME_OPTIONS/SET_HEADER_SEARCH_HOVER';

export const setHeaderFixed = (headerFixed: boolean)
: IActionPayload => ({
  type: SET_HEADER_FIXED,
  payload: { headerFixed },
});
export const setHeaderShadow = (headerShadow: boolean)
: IActionPayload => ({
  type: SET_HEADER_SHADOW,
  payload: { headerShadow },
});
export const setHeaderSearchHover = (headerSearchHover: boolean)
: IActionPayload => ({
  type: SET_HEADER_SEARCH_HOVER,
  payload: { headerSearchHover },
});

// Main content

export const SET_CONTENT_BACKGROUND = 'THEME_OPTIONS/SET_CONTENT_BACKGROUND';
export const SET_THEME_CONFIGURATOR_TOGGLE =
  'THEME_OPTIONS/SET_THEME_CONFIGURATOR_TOGGLE';

export const setContentBackground = (contentBackground: string)
: IActionPayload => ({
  type: SET_CONTENT_BACKGROUND,
  payload: { contentBackground }
});
export const setThemeConfiguratorToggle = (themeConfiguratorToggle: boolean)
: IActionPayload => ({
  type: SET_THEME_CONFIGURATOR_TOGGLE,
  payload: { themeConfiguratorToggle },
});
// Footer

export const SET_FOOTER_FIXED = 'THEME_OPTIONS/SET_FOOTER_FIXED';
export const SET_FOOTER_SHADOW = 'THEME_OPTIONS/SET_FOOTER_SHADOW';
export const setFooterFixed = (footerFixed: boolean)
: IActionPayload => ({
  type: SET_FOOTER_FIXED,
  payload: { footerFixed },
});
export const setFooterShadow = (footerShadow: boolean)
: IActionPayload => ({
  type: SET_FOOTER_SHADOW,
  payload: { footerShadow },
});

// Page title

export const SET_PAGE_TITLE_STYLE = 'THEME_OPTIONS/SET_PAGE_TITLE_STYLE';
export const SET_PAGE_TITLE_BACKGROUND =
  'THEME_OPTIONS/SET_PAGE_TITLE_BACKGROUND';
export const SET_PAGE_TITLE_SHADOW = 'THEME_OPTIONS/SET_PAGE_TITLE_SHADOW';
export const SET_PAGE_TITLE_BREADCRUMB =
  'THEME_OPTIONS/SET_PAGE_TITLE_BREADCRUMB';
export const SET_PAGE_TITLE_ICON_BOX = 'THEME_OPTIONS/SET_PAGE_TITLE_ICON_BOX';
export const SET_PAGE_TITLE_DESCRIPTION =
  'THEME_OPTIONS/SET_PAGE_TITLE_DESCRIPTION';

export const setPageTitleStyle = (pageTitleStyle: string)
: IActionPayload => ({
  type: SET_PAGE_TITLE_STYLE,
  payload: { pageTitleStyle },
});
export const setPageTitleBackground = (pageTitleBackground: string)
: IActionPayload => ({
  type: SET_PAGE_TITLE_BACKGROUND,
  payload: { pageTitleBackground },
});
export const setPageTitleShadow = (pageTitleShadow: boolean)
: IActionPayload => ({
  type: SET_PAGE_TITLE_SHADOW,
  payload: { pageTitleShadow },
});
export const setPageTitleBreadcrumb = (pageTitleBreadcrumb: boolean)
: IActionPayload => ({
  type: SET_PAGE_TITLE_BREADCRUMB,
  payload: { pageTitleBreadcrumb },
});
export const setPageTitleIconBox = (pageTitleIconBox: boolean)
: IActionPayload => ({
  type: SET_PAGE_TITLE_ICON_BOX,
  payload: { pageTitleIconBox },
});
export const setPageTitleDescription = (pageTitleDescription: boolean)
: IActionPayload => ({
  type: SET_PAGE_TITLE_DESCRIPTION,
  payload: { pageTitleDescription },
});
// ACTIONS

export interface IThemeOptionState {
    sidebarShadow: boolean;
    sidebarFixed: boolean;
    sidebarToggleMobile: boolean;    
    sidebarFooter: boolean;
    sidebarUserbox: boolean;
    sidebarToggle: boolean;
    sidebarHover: boolean;
    // Header

    headerFixed: boolean;
    headerShadow: boolean;
    headerSearchHover: boolean;

    // Main content

    contentBackground: string;
    themeConfiguratorToggle: boolean;
    // Footer

    footerFixed: boolean;
    footerShadow: boolean;
    // Page title

    pageTitleStyle: string;
    pageTitleBackground: string;
    pageTitleShadow: boolean;
    pageTitleBreadcrumb: boolean;
    pageTitleIconBox: boolean;
    pageTitleDescription: boolean;
}

const INIT_OPTIONS_STATE: IThemeOptionState = {
    // Sidebar

    sidebarShadow: false,
    sidebarFixed: true,
    sidebarToggleMobile: false,
    sidebarFooter: true,
    sidebarUserbox: true,
    sidebarToggle: false,
    sidebarHover: false,
    // Header

    headerFixed: true,
    headerShadow: true,
    headerSearchHover: false,

    // Main content

    contentBackground: '',
    themeConfiguratorToggle: false,
    // Footer

    footerFixed: false,
    footerShadow: false,
    // Page title

    pageTitleStyle: '',
    pageTitleBackground: '',
    pageTitleShadow: false,
    pageTitleBreadcrumb: false,
    pageTitleIconBox: true,
    pageTitleDescription: true
}

const optionsReducer = (state = INIT_OPTIONS_STATE, action: IActionPayload
): IThemeOptionState => {
  switch (action.type) {
    // Sidebar

    case SET_SIDEBAR_SHADOW:
      return {
        ...state,
        sidebarShadow: action.payload.sidebarShadow
      };
    case SET_SIDEBAR_FIXED:
      return {
        ...state,
        sidebarFixed: action.payload.sidebarFixed
      };
    case SET_SIDEBAR_TOGGLE_MOBILE:
      return {
        ...state,
        sidebarToggleMobile: action.payload.sidebarToggleMobile
      };
    case SET_SIDEBAR_FOOTER:
      return {
        ...state,
        sidebarFooter: action.payload.sidebarFooter
      };
    case SET_SIDEBAR_TOGGLE:
      return {
        ...state,
        sidebarToggle: action.payload.sidebarToggle
      };
    case SET_SIDEBAR_HOVER:
      return {
        ...state,
        sidebarHover: action.payload.sidebarHover
      };
    case SET_SIDEBAR_USERBOX:
      return {
        ...state,
        sidebarUserbox: action.payload.sidebarUserbox
      };
    // Header

    case SET_HEADER_FIXED:
      return {
        ...state,
        headerFixed: action.payload.headerFixed
      };
    case SET_HEADER_SHADOW:
      return {
        ...state,
        headerShadow: action.payload.headerShadow
      };
    case SET_HEADER_SEARCH_HOVER:
      return {
        ...state,
        headerSearchHover: action.payload.headerSearchHover
      };

    // Main content

    case SET_CONTENT_BACKGROUND:
      return {
        ...state,
        contentBackground: action.payload.contentBackground
      };
    case SET_THEME_CONFIGURATOR_TOGGLE:
      return {
        ...state,
        themeConfiguratorToggle: action.payload.themeConfiguratorToggle
      };
    // Footer

    case SET_FOOTER_FIXED:
      return {
        ...state,
        footerFixed: action.payload.footerFixed
      };
    case SET_FOOTER_SHADOW:
      return {
        ...state,
        footerShadow: action.payload.footerShadow
      };

    // Page title

    case SET_PAGE_TITLE_STYLE:
      return {
        ...state,
        pageTitleStyle: action.payload.pageTitleStyle
      };
    case SET_PAGE_TITLE_BACKGROUND:
      return {
        ...state,
        pageTitleBackground: action.payload.pageTitleBackground
      };
    case SET_PAGE_TITLE_SHADOW:
      return {
        ...state,
        pageTitleShadow: action.payload.pageTitleShadow
      };
    case SET_PAGE_TITLE_BREADCRUMB:
      return {
        ...state,
        pageTitleBreadcrumb: action.payload.pageTitleBreadcrumb
      };
    case SET_PAGE_TITLE_ICON_BOX:
      return {
        ...state,
        pageTitleIconBox: action.payload.pageTitleIconBox
      };
    case SET_PAGE_TITLE_DESCRIPTION:
      return {
        ...state,
        pageTitleDescription: action.payload.pageTitleDescription
      };
    default:
      break;
  }
  return state;
}

export default optionsReducer;