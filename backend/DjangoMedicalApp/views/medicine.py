from rest_framework import viewsets, status
from DjangoMedicalApp.models import Medicine, MedicalDetails
from DjangoMedicalApp.serializers import MedicineSerializer, MedicalDetailsSerializerSimple
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

class MedicineViewSet(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def list(self, request):
        medicine=Medicine.objects.all()
        serializer=MedicineSerializer(medicine, many=True, context={"request": request})

        #? Include medicine details in medicine JSON
        medicine_data=serializer.data
        serialzed=[]
        for medicine in medicine_data:
            medicine_details=MedicalDetails.objects.filter(medical_id=medicine['id'])
            medicine_details_serializer=MedicalDetailsSerializerSimple(medicine_details, many=True)
            medicine['medicine_details']=medicine_details_serializer.data
            serialzed.append(medicine)

        response_dict={
            "error": False,
            "message": "All medicine list data",
            "data": serialzed,
        }
        return Response(response_dict)

    def create(self, request):
        try:
            serializer=MedicineSerializer(data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()

            #? Medicine details creations
            medicine_id=serializer.data['id']
            medicine_details_list=[]
            for medicine_detail in request.data['medicine_details']:
                medicine_detail['medical_id']=medicine_id
                medicine_details_list.append(medicine_detail)
            serializer_detail=MedicalDetailsSerializer(data=medicine_details_list, many=True, context={"request": request})
            serializer_detail.is_valid()
            serializer_detail.save()

            dict_response={
                "error": False,
                "message": "Medicine data created",
            }
        except Exception as e:
            print('Medicine create', e)
            dict_response={
                "error": True,
                "message": "Medicine data creation error",
            }
        return Response(dict_response, status=status.HTTP_201_CREATED)
    
    def retrieve(self, request, pk=None):
        queryset=Medicine.objects.all()
        medicine=get_object_or_404(queryset, pk=pk)
        serializer=MedicineSerializer(medicine, context={"request": request})

        #? Include medicine details in medicine JSON
        medicine_data=serializer.data
        medicine_details=MedicalDetails.objects.filter(medical_id=medicine_data['id'])
        medicine_details_serializer=MedicalDetailsSerializerSimple(medicine_details, many=True)
        medicine_data['medicine_details']=medicine_details_serializer.data

        return Response({
            "error": False,
            "message": "Single medicine data fetched",
            "data": medicine_data,
        })

    def update(self, request, pk=None):
        try:
            queryset=Medicine.objects.all()
            medicine=get_object_or_404(queryset, pk=pk)
            serializer=MedicineSerializer(medicine, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response={
                "error": False,
                "message": "Medicine data updated",
            }
        except Exception as e:
            print('Medicine update', e)
            dict_response={
                "error": True,
                "message": "Medicine data updation error",
            }
        return Response(dict_response)