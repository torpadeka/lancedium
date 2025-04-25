import Time "mo:base/Time";
import UUID "mo:uuid/UUID";

module {
    public type UserProfile = {
        username : Text;
        email : ?Text;
        bio : ?Text;
        createdAt : Time.Time;
        updatedAt : Time.Time;
    };

    public type Message = {
        id: Text;
        sender: Principal;
        content: Text;
        timestamp: Time.Time;
    };

    public type ChatRoom = {
        id: Text;
        customer: Principal;
        freelancer: Principal;
        messages: [Text];
    }
}