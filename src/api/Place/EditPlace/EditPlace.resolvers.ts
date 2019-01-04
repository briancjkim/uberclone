import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { EditPlaceResponse, EditPlaceMutationArgs } from "../../../types/graph";
import Place from "../../../entities/Place";
import cleanNullArgs from "../../../utils/cleanNullArgs";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    EditPlace: privateResolver(
      async (
        _,
        args: EditPlaceMutationArgs,
        { req }
      ): Promise<EditPlaceResponse> => {
        const user: User = req.user;
        try {
          const palce = await Place.findOne({ id: args.placeId });
          if (palce) {
            if (palce.userId === user.id) {
              const notNull = cleanNullArgs(args);
              await Place.update({ id: args.placeId }, { ...notNull });
              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "Not Authorised"
              }
            }
          } else {
            return {
              ok: false,
              error: "Place Not Found"
            }
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message
          };
        }

      }
    )
  }
}
export default resolvers;