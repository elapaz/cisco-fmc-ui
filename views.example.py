import requests
import urllib3
from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions, status

urllib3.disable_warnings()


@api_view(['GET', 'POST'])
@permission_classes([permissions.AllowAny, ])
def auth(request):
    if request.method == 'POST':
        server = "https://<firepower_ip>"

        username = request.data.get('username')
        password = request.data.get('password')

        r = None
        headers = {'Content-Type': 'application/json'}
        api_auth_path = "/api/fmc_platform/v1/auth/generatetoken"
        auth_url = server + api_auth_path
        try:
            r = requests.post(auth_url, headers=headers, auth=requests.auth.HTTPBasicAuth(username, password),
                              verify=False)
            auth_headers = r.headers
            auth_token = auth_headers.get('X-auth-access-token', default=None)
            refresh_token = auth_headers.get('X-auth-refresh-token', default=None)
            if not auth_token:
                print("auth_token not found. Exiting...")
        except Exception as err:
            print("Error in generating auth token --> " + str(err))
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        headers['X-auth-access-token'] = auth_token
        headers['X-auth-refresh-token'] = refresh_token
        return Response(headers)
    return Response({"message": "You should use POST with username / password"})



@api_view(['GET', 'POST'])
@permission_classes([permissions.AllowAny, ])
def refresh(request):
    if request.method == 'POST':
        server = "https://<firepower_ip>"

        token = request.data.get('token')
        refresh_token = request.data.get('refreshToken')

        r = None
        headers = {'Content-Type': 'application/json'}
        headers['X-auth-access-token'] = token
        headers['X-auth-refresh-token'] = refresh_token
        api_auth_path = "/api/fmc_platform/v1/auth/refreshtoken"
        auth_url = server + api_auth_path
        try:
            r = requests.post(auth_url, headers=headers, verify=False)
            auth_headers = r.headers
            auth_token = auth_headers.get('X-auth-access-token', default=None)
            refresh_token = auth_headers.get('X-auth-refresh-token', default=None)
            if not auth_token:
                print("auth_token not found. Exiting...")
        except Exception as err:
            print("Error in generating auth token --> " + str(err))
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        headers['X-auth-access-token'] = auth_token
        headers['X-auth-refresh-token'] = refresh_token
        return Response(headers)
    return Response({"message": "You should use POST with username / password"})

@api_view(['GET'])
@permission_classes([permissions.AllowAny, ])
def api(request):
    url = request.get_full_path().replace('/firepower', 'https://<firepower_ip>')
    token = request.META.get('HTTP_X_AUTH_ACCESS_TOKEN')
    rtoken = request.META.get('HTTP_X_AUTH_REFRESH_TOKEN')
    headers = {'Content-Type': 'application/json'}
    headers['x-auth-access-token'] = token
    headers['x-auth-refresh-token'] = rtoken
    r = requests.get(url, headers=headers, verify=False)
    return HttpResponse(r.content, status=r.status_code)
