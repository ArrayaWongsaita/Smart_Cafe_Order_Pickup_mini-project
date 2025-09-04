import React from 'react';
import { Clock, Package, CheckCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { OrderStatus } from '../interfaces/order.interface';

interface OrderProgressStepsProps {
  status: OrderStatus | string;
}

export const OrderProgressSteps: React.FC<OrderProgressStepsProps> = ({
  status,
}) => {
  if (status === OrderStatus.CANCELLED) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>ขั้นตอนการดำเนินการ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="h-16 w-16 rounded-full bg-red-500 text-white flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold text-red-600 mb-2">
              คำสั่งซื้อถูกยกเลิก
            </h3>
            <p className="text-gray-600">คำสั่งซื้อของคุณได้ถูกยกเลิกแล้ว</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const steps = [
    {
      id: OrderStatus.PENDING,
      label: 'รอดำเนินการ',
      icon: Clock,
    },
    {
      id: OrderStatus.PREPARING,
      label: 'กำลังเตรียม',
      icon: Clock,
    },
    {
      id: OrderStatus.READY,
      label: 'พร้อมรับ',
      icon: Package,
    },
    {
      id: OrderStatus.COMPLETED,
      label: 'เสร็จสิ้น',
      icon: CheckCircle,
    },
  ];

  const getStepStatus = (
    stepId: OrderStatus,
    currentStatus: OrderStatus | string
  ) => {
    const stepOrder = [
      OrderStatus.PENDING,
      OrderStatus.PREPARING,
      OrderStatus.READY,
      OrderStatus.COMPLETED,
    ];
    const currentIndex = stepOrder.indexOf(currentStatus as OrderStatus);
    const stepIndex = stepOrder.indexOf(stepId);

    return stepIndex <= currentIndex;
  };

  const getConnectionStatus = (
    fromStep: OrderStatus,
    toStep: OrderStatus,
    currentStatus: OrderStatus | string
  ) => {
    const stepOrder = [
      OrderStatus.PENDING,
      OrderStatus.PREPARING,
      OrderStatus.READY,
      OrderStatus.COMPLETED,
    ];
    const currentIndex = stepOrder.indexOf(currentStatus as OrderStatus);
    const toStepIndex = stepOrder.indexOf(toStep);

    return toStepIndex <= currentIndex;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>ขั้นตอนการดำเนินการ</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = getStepStatus(step.id, status);
            const isNextConnectionActive =
              index < steps.length - 1
                ? getConnectionStatus(step.id, steps[index + 1].id, status)
                : false;

            return (
              <React.Fragment key={step.id}>
                {/* Step */}
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      isActive ? 'bg-green-500 text-white' : 'bg-gray-300'
                    }`}
                  >
                    <StepIcon className="h-5 w-5" />
                  </div>
                  <span className="text-xs mt-2">{step.label}</span>
                </div>

                {/* Connection line (not for last step) */}
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      isNextConnectionActive ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  ></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
