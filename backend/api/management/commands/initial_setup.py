"""
One-time setup command for initial deployment.
Runs migrations and creates sample data.
"""
from django.core.management import call_command
from django.core.management.base import BaseCommand
from django.db import connection


class Command(BaseCommand):
    help = 'Run initial setup: migrations and sample data'

    def handle(self, *args, **options):
        self.stdout.write('Starting initial setup...')
        
        # Check if setup has already been run
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT EXISTS (
                    SELECT FROM information_schema.tables 
                    WHERE table_name = 'api_userprofile'
                )
            """)
            tables_exist = cursor.fetchone()[0]
        
        if tables_exist:
            self.stdout.write(self.style.WARNING('Setup already completed. Skipping.'))
            return
        
        # Run migrations
        self.stdout.write('Running migrations...')
        call_command('migrate', '--no-input')
        
        # Create sample users
        self.stdout.write('Creating sample users...')
        call_command('add_sample_users')
        
        # Setup categories
        self.stdout.write('Setting up categories...')
        call_command('setup_categories')
        
        # Add sample inventory
        self.stdout.write('Adding sample inventory...')
        call_command('add_sample_inventory')
        
        self.stdout.write(self.style.SUCCESS('Initial setup completed successfully!'))
