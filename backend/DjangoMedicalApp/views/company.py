from rest_framework import viewsets, status
from DjangoMedicalApp.models import Company
from DjangoMedicalApp.serializers import CompanySerializer
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

class CompanyViewSet(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def list(self, request):
        company=Company.objects.all()
        serializer=CompanySerializer(company, many=True, context={"request": request})
        response_dict={
            "error": False,
            "message": "All company list data",
            "data": serializer.data
        }
        return Response(response_dict)

    def create(self, request):
        try:
            serializer=CompanySerializer(data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response={
                "error": False,
                "message": "Company data created",
            }
        except Exception as e:
            print('Company create', e)
            dict_response={
                "error": True,
                "message": "Company data creation error",
            }
        return Response(dict_response, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        try:
            queryset=Company.objects.all()
            company=get_object_or_404(queryset, pk=pk)
            serializer=CompanySerializer(company, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response={
                "error": False,
                "message": "Company data updated",
            }
        except Exception as e:
            print('Company update', e)
            dict_response={
                "error": True,
                "message": "Company data updation error",
            }
        return Response(dict_response)

company_list=CompanyViewSet.as_view({"get": "list"})
company_create=CompanyViewSet.as_view({"post": "list"})
company_update=CompanyViewSet.as_view({"put": "update"})