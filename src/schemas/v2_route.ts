// This file is auto-generated; do not manually edit

export interface Route {
  name?: string;
  RouteType?: RouteType;
  Users?: Users;
}

export type Users =
  | "Footpath"
  | "Cyclepath"
  | "SharedUseNoSeparation"
  | SharedUseWithSeparation;

export interface SharedUseWithSeparation {
  width_footpath?: number;
  width_cyclepath?: number;
}

export type RouteType = OnRoad | OffRoad;

export type OffRoad = "ThroughPark" | "CanalTowpath";

export interface OnRoad {
  OnRoadType?: OnRoadType;
  SourceOfSpace?: SourceOfSpace;
}

export type SourceOfSpace =
  | "ReallocateEntireLane"
  | "RoadDiet"
  | "PavementDiet"
  | "ReallocateVerge";

export type OnRoadType =
  | "FullSeparation"
  | "Stepped"
  | "PartSeparation"
  | "MandatoryLane"
  | "AdvisoryLane"
  | NoSeparation;

export type NoSeparation = "TrafficCalming" | "ModalFilters" | "LowSpeed";