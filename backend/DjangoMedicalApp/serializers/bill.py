from rest_framework import serializers
from DjangoMedicalApp.models import Bill
from .customer import CustomerSerializer

class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model=Bill
        fields="__all__"

    def to_representation(self, instance):
        response=super().to_representation(instance)
        response['customer']=CustomerSerializer(instance.customer_id).data
        return response