import gql from 'graphql-tag';

export const BOAT_TYPES_BERTHS_QUERY = gql`
  query BoatTypesBerthsQuery {
    boatTypes {
      id
      name
    }
    harbors {
      edges {
        node {
          id
          geometry {
            coordinates
          }
          properties {
            name
            servicemapId
            streetAddress
            zipCode
            municipality
            phone
            email
            wwwUrl
            imageFile
            mooring
            electricity
            water
            wasteCollection
            gate
            lighting
            suitableBoatTypes {
              id
            }
            availabilityLevel {
              id
              title
              description
            }
            numberOfPlaces
            maximumWidth
            maximumLength
            maximumDepth
          }
        }
      }
    }
  }
`;

export const WINTER_AREAS_QUERY = gql`
  query WinterAreasQuery {
    boatTypes {
      id
      name
    }
    winterStorageAreas {
      edges {
        node {
          id
          geometry {
            coordinates
          }
          properties {
            name
            streetAddress
            zipCode
            imageFile
            numberOfMarkedPlaces
            maximumWidth: maxWidth
            maximumLength: maxLength
            numberOfSectionSpaces
            maxLengthOfSectionSpaces
            numberOfUnmarkedSpaces
            electricity
            water
            gate
            repairArea
            summerStorageForDockingEquipment
            summerStorageForTrailers
            summerStorageForBoats
            municipality
            wwwUrl
            availabilityLevel {
              id
              title
              description
            }
          }
        }
      }
    }
  }
`;

export const CREATE_RESERVATION = gql`
  mutation SubmitBerth($reservation: BerthReservationInput!, $berthSwitch: BerthSwitchInput) {
    createBerthReservation(berthReservation: $reservation, berthSwitch: $berthSwitch) {
      ok
    }
  }
`;

export const CREATE_WINTER_STORAGE_RESERVATION = gql`
  mutation SubmitWinterStorage($reservation: WinterStorageReservationInput!) {
    createWinterStorageReservation(winterStorageReservation: $reservation) {
      ok
    }
  }
`;

export const GET_HARBOR_NAME = (harborId: string) => gql`
  query HarborNameQuery{
    harbor(id: "${harborId}") {
      properties {
        name
      }
    }
  }
`;
