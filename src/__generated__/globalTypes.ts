/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * An enumeration.
 */
export enum WinterStorageMethod {
  ON_TRAILER = "ON_TRAILER",
  ON_TRESTLES = "ON_TRESTLES",
  UNDER_TARP = "UNDER_TARP",
}

export interface BerthReservationInput {
  language: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  zipCode: string;
  municipality: string;
  companyName?: string | null;
  businessId?: string | null;
  boatType: string;
  boatRegistrationNumber?: string | null;
  boatName?: string | null;
  boatModel?: string | null;
  boatLength: number;
  boatWidth: number;
  applicationCode?: string | null;
  acceptBoatingNewsletter: boolean;
  acceptFitnessNews: boolean;
  acceptLibraryNews: boolean;
  acceptOtherCultureNews: boolean;
  informationAccuracyConfirmed: boolean;
  boatDraught?: number | null;
  boatWeight?: number | null;
  accessibilityRequired?: boolean | null;
  boatPropulsion?: string | null;
  boatHullMaterial?: string | null;
  boatIntendedUse?: string | null;
  rentingPeriod?: string | null;
  rentFrom?: string | null;
  rentTill?: string | null;
  boatIsInspected?: boolean | null;
  boatIsInsured?: boolean | null;
  agreeToTerms?: boolean | null;
  choices: HarborChoiceInput[];
}

export interface BerthSwitchInput {
  harborId: string;
  pier?: string | null;
  berthNumber: string;
}

export interface HarborChoiceInput {
  harborId: string;
  priority: number;
}

export interface WinterStorageAreaChoiceInput {
  winterAreaId: string;
  priority: number;
}

export interface WinterStorageReservationInput {
  language: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  zipCode: string;
  municipality: string;
  companyName?: string | null;
  businessId?: string | null;
  boatType: string;
  boatRegistrationNumber?: string | null;
  boatName?: string | null;
  boatModel?: string | null;
  boatLength: number;
  boatWidth: number;
  applicationCode?: string | null;
  acceptBoatingNewsletter: boolean;
  acceptFitnessNews: boolean;
  acceptLibraryNews: boolean;
  acceptOtherCultureNews: boolean;
  informationAccuracyConfirmed: boolean;
  storageMethod: WinterStorageMethod;
  trailerRegistrationNumber?: string | null;
  chosenAreas: WinterStorageAreaChoiceInput[];
}

//==============================================================
// END Enums and Input Objects
//==============================================================
