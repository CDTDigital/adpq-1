defmodule Adpq.Order do
  use Adpq.Web, :model

  @moduledoc """
    An individual user order
  """

  schema "orders" do
    belongs_to :user, Adpq.User
    field :status, :string
    has_many :order_items, Adpq.OrderItem

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:user_id, :status])
    |> validate_required([:user_id, :status])
  end

  def status_update_changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:status])
    |> validate_required([:status])
  end

  defmodule Status do
    @moduledoc "valid order status values"
    def submitted, do: "SUBMITTED"
    def cancelled, do: "CANCELLED"
    def list, do: [submitted(), cancelled()]
  end
end
