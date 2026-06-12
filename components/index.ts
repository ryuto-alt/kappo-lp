/* ============================================================
   割烹 沙羅雙樹 — コンポーネント バレル
   ============================================================ */

// プリミティブ
export { Button } from './Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button';
export { ArrowRightIcon } from './Button';
export { Input } from './Input';
export type { InputProps } from './Input';
export { Select } from './Select';
export type { SelectProps, SelectOption } from './Select';
export { Badge } from './Badge';
export type { BadgeProps, BadgeVariant } from './Badge';
export { Card } from './Card';
export type { CardProps, CardVariant } from './Card';

// セクション共通プリミティブ / フック
export {
  GrainOverlay,
  StageRule,
  Eyebrow,
  Spotlight,
  Reveal,
  useReveal,
  linkUnderline,
} from './primitives';
export type {
  StageRuleProps,
  EyebrowProps,
  SpotlightProps,
  RevealProps,
} from './primitives';

// セクション
export { Header } from './Header';
export type { HeaderProps, NavItem } from './Header';
export { Hero } from './Hero';
export type { HeroProps } from './Hero';
export { FeatureSection } from './FeatureSection';
export type { FeatureSectionProps, FeatureItem } from './FeatureSection';
export { CTASection } from './CTASection';
export type { CTASectionProps } from './CTASection';
export { Footer } from './Footer';
export type { FooterProps, FooterLink } from './Footer';
export { ReserveBar } from './ReserveBar';
export type { ReserveBarProps } from './ReserveBar';

// 参照実装（主要セクションの組み上げ）
export { LandingPage } from './LandingPage';
