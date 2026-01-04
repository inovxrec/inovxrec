from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from .models import User


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'confirm_password')
    
    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError("Passwords don't match")
        return attrs
    
    def validate_username(self, value):
        if len(value) < 3:
            raise serializers.ValidationError("Username must be at least 3 characters")
        if len(value) > 20:
            raise serializers.ValidationError("Username must be less than 20 characters")
        return value
    
    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create_user(**validated_data)
        return user


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        
        if email and password:
            user = authenticate(username=email, password=password)
            if not user:
                raise serializers.ValidationError('Invalid credentials')
            if not user.is_active:
                raise serializers.ValidationError('User account is disabled')
            attrs['user'] = user
        else:
            raise serializers.ValidationError('Must include email and password')
        
        return attrs


class UserProfileSerializer(serializers.ModelSerializer):
    acceptance_rate = serializers.ReadOnlyField()
    
    class Meta:
        model = User
        fields = (
            'id', 'username', 'email', 'total_solved', 'easy_solved', 
            'medium_solved', 'hard_solved', 'streak', 'acceptance_rate',
            'created_at'
        )
        read_only_fields = (
            'id', 'total_solved', 'easy_solved', 'medium_solved', 
            'hard_solved', 'streak', 'acceptance_rate', 'created_at'
        )


class UserStatsSerializer(serializers.ModelSerializer):
    acceptance_rate = serializers.ReadOnlyField()
    total_submissions = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = (
            'total_solved', 'easy_solved', 'medium_solved', 'hard_solved',
            'streak', 'acceptance_rate', 'total_submissions'
        )
    
    def get_total_submissions(self, obj):
        return obj.submissions.count()