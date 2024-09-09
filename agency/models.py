from django.db import models


# Must be to connect to img models these functions!
def trip_image_upload_path(instance, filename):
    # Generate file path for the trip's general image
    return f"media/trip_{instance.id}/general/{filename}"


def day_image_upload_path(instance, filename):
    # Generate file path for each day's image
    return f"media/trip_{instance.trip.id}/days/day_{instance.id}/{filename}"


class Trip(models.Model):
    title = models.CharField(max_length=255)
    category = models.ForeignKey(
        "Category", on_delete=models.SET_NULL, related_name="trips", null=True
    )
    description = models.TextField()
    destination = models.CharField(max_length=55)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    max_members = models.PositiveIntegerField()
    current_members = models.PositiveIntegerField()
    image = models.ImageField(help_text="A General big photo.", upload_to="trip/")
    includes = models.TextField()
    not_includes = models.TextField()

    def __str__(self):
        return self.title


class Category(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to="category/")

    def __str__(self):
        return self.name


class Date(models.Model):
    from_date = models.DateField()
    to_date = models.DateField()
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name="dates")

    def __str__(self):
        return f"{self.trip} from {self.from_date} to {self.to_date}."


class Day(models.Model):
    name = models.CharField(max_length=255)
    place = models.CharField(max_length=255)
    description = models.TextField()
    activity = models.CharField(max_length=600)
    image = models.ImageField(upload_to="day/")
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name="days")

    def __str__(self):
        return f"{self.name} of {self.trip}"
