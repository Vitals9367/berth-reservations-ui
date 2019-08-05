import { BerthReservationInput } from '../__generated__/globalTypes';
import {
  BoatTypesBerthsQuery_harbors_edges_node,
  BoatTypesBerthsQuery_harbors_edges_node_geometry,
  BoatTypesBerthsQuery_harbors_edges_node_properties
} from '../utils/__generated__/BoatTypesBerthsQuery';

export type BerthType = Pick<
  BoatTypesBerthsQuery_harbors_edges_node_properties,
  Exclude<keyof BoatTypesBerthsQuery_harbors_edges_node_properties, '__typename'>
> & {
  geometry: Pick<
    BoatTypesBerthsQuery_harbors_edges_node_geometry,
    Exclude<keyof BoatTypesBerthsQuery_harbors_edges_node_geometry, '__typename'>
  >;
} & Pick<BoatTypesBerthsQuery_harbors_edges_node, 'id'> &
  Pick<BoatTypesBerthsQuery_harbors_edges_node, '__typename'>;

interface ValuesToOverride {
  boatLength: string;
  boatWidth: string;
  boatDraught?: string | null;
  boatWeight?: string | null;
}

export type BerthFormValues = Pick<
  BerthReservationInput,
  Exclude<keyof BerthReservationInput, keyof ValuesToOverride>
> &
  ValuesToOverride;
