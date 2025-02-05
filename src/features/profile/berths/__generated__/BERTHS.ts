/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ApplicationStatus } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: BERTHS
// ====================================================

export interface BERTHS_myProfile_berthApplications_edges_node_harborChoices_harbor_properties_availabilityLevel {
  __typename: "AvailabilityLevelType";
  id: string;
  title: string | null;
  description: string | null;
}

export interface BERTHS_myProfile_berthApplications_edges_node_harborChoices_harbor_properties {
  __typename: "HarborProperties";
  name: string | null;
  availabilityLevel: BERTHS_myProfile_berthApplications_edges_node_harborChoices_harbor_properties_availabilityLevel | null;
  electricity: boolean;
  gate: boolean;
  lighting: boolean;
  wasteCollection: boolean;
  water: boolean;
}

export interface BERTHS_myProfile_berthApplications_edges_node_harborChoices_harbor {
  __typename: "HarborNode";
  id: string;
  properties: BERTHS_myProfile_berthApplications_edges_node_harborChoices_harbor_properties | null;
}

export interface BERTHS_myProfile_berthApplications_edges_node_harborChoices {
  __typename: "HarborChoiceType";
  priority: number;
  harbor: BERTHS_myProfile_berthApplications_edges_node_harborChoices_harbor;
}

export interface BERTHS_myProfile_berthApplications_edges_node_boat {
  __typename: "BoatNode";
  id: string;
  name: string;
  registrationNumber: string;
}

export interface BERTHS_myProfile_berthApplications_edges_node {
  __typename: "BerthApplicationNode";
  id: string;
  createdAt: any;
  status: ApplicationStatus;
  harborChoices: (BERTHS_myProfile_berthApplications_edges_node_harborChoices | null)[] | null;
  boat: BERTHS_myProfile_berthApplications_edges_node_boat | null;
}

export interface BERTHS_myProfile_berthApplications_edges {
  __typename: "BerthApplicationNodeEdge";
  node: BERTHS_myProfile_berthApplications_edges_node | null;
}

export interface BERTHS_myProfile_berthApplications {
  __typename: "BerthApplicationNodeConnection";
  edges: (BERTHS_myProfile_berthApplications_edges | null)[];
}

export interface BERTHS_myProfile {
  __typename: "ProfileNode";
  id: string;
  berthApplications: BERTHS_myProfile_berthApplications | null;
}

export interface BERTHS {
  myProfile: BERTHS_myProfile | null;
}
