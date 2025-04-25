import Time "mo:base/Time";

module {
    public type UserProfile = {
        username : Text;
        email : ?Text;
        bio : ?Text;
        createdAt : Time.Time;
        updatedAt : Time.Time;
    };
}