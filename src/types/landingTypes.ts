import  { type ComponentType } from 'react';
import * as React from "react";

export type featureProps = {
  name: string,
  description: string,
  icon: ComponentType,
  backgroundColor: string,
}

export type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
  color?: string;
  title?: string;
  backgroundColor?: string;
};