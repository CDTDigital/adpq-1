defmodule Adpq.PageControllerTest do
  use Adpq.ConnCase

  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert html_response(conn, 200) =~ "CDT Tech Shop"
  end
end
