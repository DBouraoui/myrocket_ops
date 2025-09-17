# myrocket_ops

send dev mode :
    python main.py

alembic:
    create migration : 
        alembic revision --autogenerate -m "motif"
    apply migration:
        alembic upgrade head
    see migration:
        alembic history
    roll-back last migration:
        alembic downgrade -1
    roll-back specify migration:
        alembic downgrade migrationId