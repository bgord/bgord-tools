import type { SmsBodyType } from "./sms-body.vo";
import type { TelephoneNumberType } from "./telephone-number.vo";

export class SmsMessage {
  constructor(
    readonly to: TelephoneNumberType,
    readonly body: SmsBodyType,
    readonly from?: TelephoneNumberType,
  ) {}

  toJSON(): { to: TelephoneNumberType; body: SmsBodyType; from?: TelephoneNumberType } {
    return { to: this.to, body: this.body, from: this.from };
  }
}
