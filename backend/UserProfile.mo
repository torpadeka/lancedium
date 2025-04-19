import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Iter "mo:base/Iter";

actor UserProfile {
    // Define User Profile type
    type UserProfile = {
        username : Text;
        email : ?Text;
        bio : ?Text;
        createdAt : Time.Time;
        updatedAt : Time.Time;
    };

    // Stable storage for profiles (principal -> profile)
    stable var profiles : [(Principal, UserProfile)] = [];
    private var profileMap = HashMap.HashMap<Principal, UserProfile>(10, Principal.equal, Principal.hash);

    // Initialize profiles from stable storage
    system func preupgrade() {
        profiles := Iter.toArray(profileMap.entries());
    };

    system func postupgrade() {
        profileMap := HashMap.fromIter(profiles.vals(), 10, Principal.equal, Principal.hash);
    };

    // Create or update a user's profile
    public shared (msg) func updateProfile(username : Text, email : ?Text, bio : ?Text) : async Result.Result<UserProfile, Text> {
        let caller = msg.caller;
        if (Principal.isAnonymous(caller)) {
            return #err("Anonymous users cannot create profiles");
        };

        let now = Time.now();
        let profile : UserProfile = {
            username = username;
            email = email;
            bio = bio;
            createdAt = now;
            updatedAt = now;
        };

        profileMap.put(caller, profile);
        #ok(profile);
    };

    // Get a user's profile by principal
    public query func getProfile(principal : Principal) : async Result.Result<UserProfile, Text> {
        switch (profileMap.get(principal)) {
            case (null) { #err("Profile not found") };
            case (?profile) { #ok(profile) };
        };
    };

    // Get the caller's own profile
    public shared query (msg) func getOwnProfile() : async Result.Result<UserProfile, Text> {
        let caller = msg.caller;
        if (Principal.isAnonymous(caller)) {
            return #err("Anonymous users have no profile");
        };
        switch (profileMap.get(caller)) {
            case (null) { #err("Profile not found") };
            case (?profile) { #ok(profile) };
        };
    };

    // Delete the caller's profile
    public shared (msg) func deleteProfile() : async Result.Result<(), Text> {
        let caller = msg.caller;
        if (Principal.isAnonymous(caller)) {
            return #err("Anonymous users cannot delete profiles");
        };
        switch (profileMap.remove(caller)) {
            case (null) { #err("Profile not found") };
            case (?_) { #ok(()) };
        };
    };
};
