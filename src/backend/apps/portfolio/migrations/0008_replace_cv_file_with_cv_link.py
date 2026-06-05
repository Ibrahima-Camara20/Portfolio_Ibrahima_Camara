from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0007_alter_skill_category'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='personalinfo',
            name='cv_file',
        ),
        migrations.AddField(
            model_name='personalinfo',
            name='cv_link',
            field=models.URLField(blank=True, help_text='Lien direct vers le CV (Google Drive, Dropbox...)', null=True),
        ),
    ]
