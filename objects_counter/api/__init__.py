from objects_counter.api.common import api
from objects_counter.api.default.views import api as default
from objects_counter.api.results.views import api as results
from objects_counter.api.users.views import api as users
from objects_counter.api.datasets.views import api as datasets

api.add_namespace(default, '/')
api.add_namespace(results, '/results')
api.add_namespace(users, '/users')
api.add_namespace(datasets, '/datasets')
