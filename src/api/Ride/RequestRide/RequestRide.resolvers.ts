import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { RequestRideResponse, RequestRideMutationArgs } from "../../../types/graph";
import User from "../../../entities/User";
import Ride from "../../../entities/Ride";

const resolvers: Resolvers = {
  Mutation: {
    RequestRide: privateResolver(
      async (
        _,
        args: RequestRideMutationArgs,
        { req, pubSub }
      ): Promise<RequestRideResponse> => {
        const user: User = req.user;
        user.isRiding = false;
        user.save();
        if (!user.isRiding && !user.isDriving) {
          try {
            const ride = await Ride.create({ ...args, passenger: user }).save();
            pubSub.publish("rideRequest", { NearbyRideSubscription: ride });
            user.isRiding = true;
            user.save();
            return {
              ok: true,
              error: null,
              ride
            };
          } catch (error) {
            return {
              ok: false,
              error,
              ride: null
            };
          }
        } else {
          return {
            ok: false,
            error: "You can't request two rides or drive and request",
            ride: null
          }
        }
      }
    )
  }
}
export default resolvers;