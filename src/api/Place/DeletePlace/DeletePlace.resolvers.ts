import privateResolver from "../../../utils/privateResolver";
import { Resolvers } from "../../../types/resolvers";
import { DeletePlaceMutationArgs, DeletePlaceResponse } from "../../../types/graph";
import Place from "../../../entities/Place";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    DeletePlace: privateResolver(
      async (
        _,
        args: DeletePlaceMutationArgs,
        { query }
      ): Promise<DeletePlaceResponse> => {
        const user: User = query.user;
        try {
          const place = await Place.findOne({ id: args.placeId });
          if (place) {
            if (place.userId === user.id) {
              place.remove();
              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "Not Authorised"
              };
            }
          } else {
            return {
              ok: false,
              error: "Place not found"
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message
          }
        }
      }
    )
  }
}

export default resolvers;