export type ColorThemes = {
  primary: PrimaryColorTheme
  secondary: SecondaryColorTheme
  danger: DangerColorTheme
  link: LinkColorTheme
  navLink: NavLinkColorTheme
  badge: BadgeColorTheme
  actionIconTextColor: ActionColorTheme
  skeleton: { textHeavy: string; textLight: string; divideLine: string; border: string }
  checkbox: { text: string; focusRing: string; border: string }
  toast: {
    success: {
      bgColor: string
      text: string
      iconColor: string
      iconBgColor: string
      hoverIconText: string
      hoverIconBg: string
    }
    danger: {
      bgColor: string
      text: string
      iconColor: string
      iconBgColor: string
      hoverIconText: string
      hoverIconBg: string
    }
  }
}

export type SizeThemes = {
  badge: BadgeSizeTheme
}

type PrimaryColorTheme = {
  bgColor: string
  hoverBgColor: string
  text: string
  focusRing: string
  iconText: string
  hoverIconText: string
  focusBorder: string
  navLinkText: string
  hoverNavLinkText: string
  navMobileLinkText: string
  hoverNavMobileLinkText: string
  border: string
  navBgLinkColor: string
}

type SecondaryColorTheme = {
  bgColor: string
  hoverBgColor: string
  text: string
  focusRing: string
  iconText: string
  hoverIconText: string
}

type DangerColorTheme = {
  bgColor: string
  hoverBgColor: string
  text: string
  focusRing: string
  iconText: string
  hoverIconText: string
}

type LinkColorTheme = {
  text: string
  hoverText: string
  iconText: string
  hoverIconText: string
}

type NavLinkColorTheme = {
  text: string
  hoverText: string
  iconText: string
  hoverIconText: string
}

type BadgeColorTheme = {
  success: string
  pending: string
  warning: string
  danger: string
}

type ActionColorTheme = {
  success: string
  pending: string
  warning: string
  danger: string
}

export type ButtonTheme = {
  primary: string
  secondary: string
  cancel: string
  danger: string
  link: string
  navLink: string
  icon: string
  text: string
}

export type FontThemes = {
  appTitle: string
  title: string
  subTitle: string
  default: string
  link: string
  inputLabel: string
  inputText: string
  placeholder: string
}

export type InputThemes = {
  normal: string
  stackedTop: string
  stackedBottom: string
  error: string
}

export type BadgeSizeTheme = {
  md: string
  lg: string
}
