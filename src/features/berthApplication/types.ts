import { List } from 'immutable';

import { BerthApplicationInput } from '../../__generated__/globalTypes';
import {
  BoatTypesBerthsQuery_harbors_edges_node,
  BoatTypesBerthsQuery_harbors_edges_node_geometry,
  BoatTypesBerthsQuery_harbors_edges_node_properties,
} from '../__generated__/BoatTypesBerthsQuery';

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
  boatDraught: string;
  boatWeight: string;
}

export type BerthFormValues = Pick<
  BerthApplicationInput,
  Exclude<keyof BerthApplicationInput, keyof ValuesToOverride>
> &
  ValuesToOverride;

export type Berths = List<BerthType>;
