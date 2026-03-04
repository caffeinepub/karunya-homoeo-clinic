import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Nat "mo:core/Nat";
import Int "mo:core/Int";

actor {
  type Branch = {
    #puthur;
    #yakkara;
    #koduvayur;
  };

  module Branch {
    public func toText(branch : Branch) : Text {
      switch (branch) {
        case (#puthur) { "Puthur" };
        case (#yakkara) { "Yakkara" };
        case (#koduvayur) { "Koduvayur" };
      };
    };

    public func compare(branch1 : Branch, branch2 : Branch) : Order.Order {
      func branchOrder(branch : Branch) : Nat {
        switch (branch) {
          case (#puthur) { 0 };
          case (#yakkara) { 1 };
          case (#koduvayur) { 2 };
        };
      };
      let order1 = branchOrder(branch1);
      let order2 = branchOrder(branch2);
      Nat.compare(order1, order2);
    };
  };

  type TimePreference = {
    #morning; // 9AM - 12PM
    #afternoon; // 12PM - 3PM
    #evening; // 3PM - 6PM
    #noPreference;
  };

  module TimePreference {
    public func toText(timePref : TimePreference) : Text {
      switch (timePref) {
        case (#morning) { "Morning (9AM-12PM)" };
        case (#afternoon) { "Afternoon (12PM-3PM)" };
        case (#evening) { "Evening (3PM-6PM)" };
        case (#noPreference) { "No Preference" };
      };
    };

    public func compare(timePref1 : TimePreference, timePref2 : TimePreference) : Order.Order {
      func timePreferenceOrder(timePref : TimePreference) : Nat {
        switch (timePref) {
          case (#morning) { 0 };
          case (#afternoon) { 1 };
          case (#evening) { 2 };
          case (#noPreference) { 3 };
        };
      };
      let order1 = timePreferenceOrder(timePref1);
      let order2 = timePreferenceOrder(timePref2);
      Nat.compare(order1, order2);
    };
  };

  type AppointmentRequest = {
    id : Nat;
    patientName : Text;
    phoneNumber : Text;
    branch : Branch;
    preferredDate : Text;
    preferredTime : TimePreference;
    message : ?Text;
    timestamp : Int;
  };

  module AppointmentRequest {
    public func compare(request1 : AppointmentRequest, request2 : AppointmentRequest) : Order.Order {
      Int.compare(request1.timestamp, request2.timestamp);
    };
  };

  let appointmentRequests = Map.empty<Nat, AppointmentRequest>();
  var nextAppointmentId = 0;

  public shared ({ caller }) func submitAppointmentRequest(
    patientName : Text,
    phoneNumber : Text,
    branch : Branch,
    preferredDate : Text,
    preferredTime : TimePreference,
    message : ?Text,
  ) : async () {
    let appointmentId = nextAppointmentId;
    let timestamp = Time.now();

    let appointment : AppointmentRequest = {
      id = appointmentId;
      patientName;
      phoneNumber;
      branch;
      preferredDate;
      preferredTime;
      message;
      timestamp;
    };

    appointmentRequests.add(appointmentId, appointment);
    nextAppointmentId += 1;
  };

  public query ({ caller }) func getAllAppointmentRequests() : async [AppointmentRequest] {
    appointmentRequests.values().toArray().sort().reverse();
  };

  public func convertBranchToText(branch : Branch) : async Text {
    Branch.toText(branch);
  };

  public func convertTimePrefToText(timePref : TimePreference) : async Text {
    TimePreference.toText(timePref);
  };
};
