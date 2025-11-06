// CHANGE: Payment gateway selector component for EaaS checkout

"use client"
import { paymentPartners } from "@/lib/payment-partners"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/app/language-provider"

interface PaymentSelectorProps {
  onSelect: (partnerId: string) => void
  selectedId?: string
}

export function PaymentSelector({ onSelect, selectedId }: PaymentSelectorProps) {
  const { language } = useLanguage()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">
          {language === "en" ? "Select Payment Method" : "ငွေပေးချေမှုနည်းလမ်းရွေးချယ်ပါ"}
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {paymentPartners.map((partner) => (
          <button
            key={partner.id}
            onClick={() => onSelect(partner.id)}
            className={`p-4 rounded-lg border-2 transition-all glass ${
              selectedId === partner.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
            }`}
          >
            <div className="aspect-square flex items-center justify-center mb-2">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: partner.color }}
              >
                {partner.name.substring(0, 2).toUpperCase()}
              </div>
            </div>
            <p className="text-xs font-medium text-center text-foreground">{partner.displayName}</p>
          </button>
        ))}
      </div>

      {selectedId && (
        <div className="mt-6 p-4 rounded-lg glass border-border">
          <p className="text-sm text-muted-foreground mb-4">
            {language === "en"
              ? "Payment method selected. Click continue to proceed."
              : "ငွေပေးချေမှုနည်းလမ်း ရွေးချယ်ခဲ့သည်။ ဆက်လက်ရန် ကလစ်ပါ။"}
          </p>
          <Button className="w-full">{language === "en" ? "Continue to Payment" : "ငွေပေးချေမှုသို့ ဆက်လက်ပါ"}</Button>
        </div>
      )}
    </div>
  )
}
