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
    email = serializers.CharField()
    password = serializers.CharField()
    
    def validate(self, attrs):
        email_or_username = attrs.get('email')
        password = attrs.get('password')
        
        if email_or_username and password:
            # Try to authenticate with the provided input (as email or username)
            user = authenticate(username=email_or_username, password=password)
            
            # If not found, try to find user by username and then authenticate with email
            if not user:
                from django.db.models import Q
                user_obj = User.objects.filter(Q(username=email_or_username) | Q(email=email_or_username)).first()
                if user_obj:
                    # If found, try authenticating with their email (since USERNAME_FIELD is email)
                    user = authenticate(username=user_obj.email, password=password)
            
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
    total_solved = serializers.IntegerField(source='stats.total_solved', read_only=True)
    easy_solved = serializers.IntegerField(source='stats.easy_solved', read_only=True)
    medium_solved = serializers.IntegerField(source='stats.medium_solved', read_only=True)
    hard_solved = serializers.IntegerField(source='stats.hard_solved', read_only=True)
    streak = serializers.IntegerField(source='stats.streak', read_only=True)
    
    class Meta:
        model = User
        fields = (
            'id', 'username', 'email', 'total_solved', 'easy_solved', 
            'medium_solved', 'hard_solved', 'streak', 'acceptance_rate',
            'created_at'
        )
        read_only_fields = fields


class UserStatsSerializer(serializers.ModelSerializer):
    acceptance_rate = serializers.ReadOnlyField()
    total_submissions = serializers.SerializerMethodField()
    total_solved = serializers.IntegerField(source='stats.total_solved', read_only=True)
    easy_solved = serializers.IntegerField(source='stats.easy_solved', read_only=True)
    medium_solved = serializers.IntegerField(source='stats.medium_solved', read_only=True)
    hard_solved = serializers.IntegerField(source='stats.hard_solved', read_only=True)
    streak = serializers.IntegerField(source='stats.streak', read_only=True)
    
    class Meta:
        model = User
        fields = (
            'total_solved', 'easy_solved', 'medium_solved', 'hard_solved',
            'streak', 'acceptance_rate', 'total_submissions'
        )
    
    def get_total_submissions(self, obj):
        return obj.submissions.count()